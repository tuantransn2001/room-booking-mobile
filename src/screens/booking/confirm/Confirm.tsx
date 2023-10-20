/* eslint-disable import/extensions */
/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import FooterWithContentWrapper from "@shared-components/footer-with-content-wrapper/FooterWithContentWrapper";
import { Direction } from "@shared-components/footer-with-content-wrapper/enums/enum";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { useMutation } from "@apollo/client";
import { useUserStore, userIdSelector } from "stores/userStore";
import { RESERVATION } from "graphql/mutations/Reservation";
import { ReservationResponse } from "gql/graphql";
import { handleNavigate } from "utils";
import { SCREENS } from "@shared-constants";
import { useToastWrapper } from "hooks/useToastWrapper";
import { IToastWrapper } from "hooks/shared/useToastWrapper.interface";
import {
  Placement,
  Status,
  Variant,
} from "@shared-components/toast-wrapper/enum/enum";
interface ConfirmProps {
  room: number;
  people: number;
  checkIn: Date;
  checkOut: Date;
}

const Confirm = ({ room, people, checkIn, checkOut }: ConfirmProps) => {
  const userId = useUserStore(userIdSelector);
  const [reservation, { loading }] =
    useMutation<ReservationResponse>(RESERVATION);
  const { showToast } = useToastWrapper();
  const shouldPreventUserConfirm = () =>
    !room || !people || !checkIn || !checkOut;

  const handleReservation = () => {
    console.log("handle reservation is working");
    reservation({
      variables: {
        userId,
        roomId: room,
        startDate: checkIn,
        endDate: checkOut,
        discountPercent: 0,
      },
      onCompleted: () => {
        const successShowData: IToastWrapper = {
          variant: Variant.solid,
          placement: Placement.top,
          status: Status.success,
          title: "Reservation success!",
          description: "Moving to your list",
          isClosable: true,
        };
        showToast(successShowData);

        setTimeout(() => {
          handleNavigate(SCREENS.TRIP);
        }, 3000);
      },
    }).catch((err) => {
      console.log("fail:::", err.message);
      const errorShowData: IToastWrapper = {
        variant: Variant.solid,
        placement: Placement.top,
        status: Status.warning,
        title: "Wrong input",
        description: err.message,
        isClosable: true,
      };

      showToast(errorShowData);
      // ? Show Toast
    });
  };

  return (
    <FooterWithContentWrapper direction={Direction.column}>
      <TextWrapper h6 left>
        By selecting the button below, I agree to the
        <TextWrapper bold> Host's House Rules</TextWrapper>, Ground rules for
        guests, Airbnb's Re-booking and Refund Policy, and that Airbnb can
        charge my payment method if I’m responsible for damage.
      </TextWrapper>
      <ButtonWrapper
        primary
        loading={loading}
        disabled={shouldPreventUserConfirm()}
        onPress={handleReservation}
      >
        Confirm and pay
      </ButtonWrapper>
    </FooterWithContentWrapper>
  );
};
export default Confirm;
