import { gql } from "@apollo/client";

export const GET_HOTEL_BY_ID = gql`
  query GetHotelById($id: Float!) {
    getHotelById(getHotelByIdInput: { id: $id }) {
      id
      hotelName
      description
      rooms {
        id
        roomName
        currentPrice
        roomType {
          id
          typeName
          description
        }
      }
    }
  }
`;
