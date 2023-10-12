import { gql } from "@apollo/client";

export const GET_ROOM_TYPES = gql`
  query GetRoomTypes($page_number: Float!, $page_size: Float!) {
    getRoomTypes(
      paginationInput: { page_number: $page_number, page_size: $page_size }
    ) {
      id
      typeName
      description
    }
  }
`;
