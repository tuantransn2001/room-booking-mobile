/* eslint-disable import/no-extraneous-dependencies */
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  Observable,
  ApolloLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { GraphQLErrors } from "@apollo/client/errors";
import { getMainDefinition } from "@apollo/client/utilities";
import { useUserStore } from "stores/userStore";
import CookieManager from "@react-native-cookies/cookies";
import { env } from "constants/env";
let accessToken = "";

CookieManager.getAll().then((cookies) => {
  accessToken = cookies.access_token.value;
});

loadErrorMessages();
loadDevMessages();

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation RefreshToken {
          refreshToken
        }
      `,
    });
    const newAccessToken = data?.refreshToken;
    if (!newAccessToken) {
      throw new Error("New access token not received.");
    }
    return "Bearer " + newAccessToken;
  } catch (err) {
    throw new Error("Error getting new access token.");
  }
}
let retryCount = 0;
const maxRetry = 3;

const uploadLink = createUploadLink({
  uri: env.API_URL,
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

const wsLink = new WebSocketLink({
  uri: env.WS_URL,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: "Bearer " + accessToken,
    },
  },
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors)
    for (const err of graphQLErrors as GraphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
        retryCount++;
        return new Observable((observer) => {
          refreshToken(client)
            .then((token) => {
              console.log("token", token);
              operation.setContext((previousContext: any) => ({
                headers: {
                  ...previousContext.headers,
                  authorization: token,
                },
              }));
              const forward$ = forward(operation);
              forward$.subscribe(observer);
            })
            .catch((error) => observer.error(error));
        });
      }

      if (err.message === "Refresh token not found") {
        console.log("refresh token not found!");
        useUserStore.setState({
          id: undefined,
          fullname: "",
          email: "",
        });
      }
    }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  ApolloLink.from([errorLink, uploadLink]),
);

export const client = new ApolloClient({
  uri: env.API_URL,
  cache: new InMemoryCache({}),
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  link: link,
});
