/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { isEmpty } from "commons/common";
import * as React from "react";
import { SafeAreaView, View } from "react-native";
import StripWithNoReservation from "./empty/StripEmptyScreen";
import { useQuery } from "@apollo/client";
import { GET_USER_RESERVATIONS_BY_ID } from "graphql/query/GetReservations";
import { ReservationResponse } from "gql/graphql";
import CardWrapper from "@shared-components/card-wrapper/CardWrapper";
import { ICardWrapper } from "@shared-components/card-wrapper/shared/CardWrapper.interface";
import { cards } from "@screens/explore/mocks/data";
import createStyle from "./StripScreen.style";
import { handleCalcRangeBetweenTwoDate, handleNavigate } from "utils";
import { SCREENS } from "@shared-constants";

const StripScreen = () => {
  const styles = React.useMemo(() => createStyle(), []);
  const { data, loading, error } = useQuery(GET_USER_RESERVATIONS_BY_ID, {
    variables: {
      userId: 5,
    },
  });

  if (loading) return <TextWrapper>Loading</TextWrapper>;

  if (error) handleNavigate(SCREENS.ERROR);

  const renderUserReservations = () => {
    const reservations: ReservationResponse[] = data?.getUserReservations;

    if (!reservations) {
      return <TextWrapper>Error</TextWrapper>;
    }

    return reservations?.map((reservation, i) => {
      const rangeDay = handleCalcRangeBetweenTwoDate(
        reservation.checkin_date.toString(),
        reservation.checkout_date.toString(),
      );

      const cardData: ICardWrapper = {
        id: i,
        loading: false,
        sliders: cards[0].sliders,
        rateNumber: 4.7,
        body: {
          title: cards[0].body.title,
          contents: cards[0].body.contents,
        },
        badge: `In ${rangeDay} months`,
        ternary: true,
      };

      return (
        <View key={i}>
          <CardWrapper {...cardData} />
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: 20 }}>
        <TextWrapper h1 bold>
          Trips
        </TextWrapper>
      </View>
      {isEmpty(data.getUserReservations) ? (
        <StripWithNoReservation />
      ) : (
        <View>
          {renderUserReservations()}
          <View>
            <TextWrapper>Explore things to do near Manchester</TextWrapper>

            <TextWrapper>List here</TextWrapper>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default StripScreen;
