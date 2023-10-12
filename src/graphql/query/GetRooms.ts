import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query GetRoom($page_number: Float!, $page_size: Float!) {
    getRooms(
      paginationInput: { page_number: $page_number, page_size: $page_size }
    ) {
      id
      roomName
      description
      currentPrice
      hotel {
        id
        hotelName
        description
      }
    }
  }
`;
