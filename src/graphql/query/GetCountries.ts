import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountry($page_size: Float!, $page_number: Float!, $search: String!) {
    getCountry(
      paginationInput: {
        page_size: $page_size
        page_number: $page_number
        search: $search
      }
    ) {
      id
      countryName
    }
  }
`;
