import { gql } from "@apollo/client";

export const GET_USER_RESERVATIONS_BY_ID = gql`
  query GetUserReservations($userId: Float!) {
    getUserReservations(getUserReservationsInput: { userId: $userId }) {
      checkin_date
      checkout_date
      room_type
      guest_name
      guest_email
      additional_requests
    }
  }
`;
