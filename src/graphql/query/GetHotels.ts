import { gql } from "@apollo/client";

export const GET_HOTELS = gql`
  query GetHotels($page_number: Float!, $page_size: Float!, $search: String!) {
    getHotels(
      paginationInput: {
        page_number: $page_number
        page_size: $page_size
        search: $search
        #   search: $search
      }
    ) {
      id
      hotelName
      description
      rooms {
        roomName
        currentPrice
      }
    }
  }
`;
