import { gql } from "@apollo/client";

export const GET_HOTELS = gql`
  query GetHotels {
    getHotels {
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
