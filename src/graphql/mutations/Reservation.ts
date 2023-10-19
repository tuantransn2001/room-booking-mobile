import { gql } from "@apollo/client";

export const RESERVATION = gql`
  mutation Reservations(
    $roomId: Float!
    $userId: Float!
    $startDate: String!
    $endDate: String!
    $discountPercent: Float!
  ) {
    reservations(
      reservationsInput: {
        roomId: $roomId
        userId: $userId
        startDate: $startDate
        endDate: $endDate
        discountPercent: $discountPercent
      }
    ) {
      checkin_date
      checkout_date
      room_type
      guest_name
      guest_email
      additional_requests
    }
  }
`;
