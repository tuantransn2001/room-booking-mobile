/* eslint-disable import/extensions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from "react";
import RootLayout from "layouts/rootLayout";
import { SafeAreaView, View } from "react-native";
import createStyles from "./ExploreRoomDetailScreen.style";
import CardWrapper from "@shared-components/card-wrapper/CardWrapper";
import { cards } from "../mocks/data";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { COLORS, SCREENS } from "@shared-constants";
import Svg, { Path } from "react-native-svg";
import { NavigationRouteProps } from "shared/type/common";
import { useQuery } from "@apollo/client";
import { GET_HOTEL_BY_ID } from "graphql/query/GetHotelbyId";
import { ICardWrapper } from "@shared-components/card-wrapper/shared/CardWrapper.interface";
import { handleNavigate } from "utils";
import FooterWithContentWrapper from "@shared-components/footer-with-content-wrapper/FooterWithContentWrapper";
import { Direction } from "@shared-components/footer-with-content-wrapper/enums/enum";
interface ExploreRoomDetailDetailScreenProps
  extends NavigationRouteProps<ExploreRoomDetailDetailScreenProps> {
  id?: number;
}

const ExploreRoomDetailDetailScreen = (
  props: ExploreRoomDetailDetailScreenProps,
) => {
  const { data, loading } = useQuery(GET_HOTEL_BY_ID, {
    variables: { id: props.route && props.route.params.id },
  });

  const styles = React.useMemo(() => createStyles(), []);
  const handleBookRoom = () =>
    handleNavigate(SCREENS.BOOKING, {
      id: props.route && props.route.params.id,
    });

  if (loading) return <TextWrapper>Loading</TextWrapper>;

  const hotelData: ICardWrapper = {
    loading,
    sliders: cards[0].sliders,
    rateNumber: 4,
    body: {
      title: data.getHotelById.hotelName,
      contents: cards[0].body.contents,
    },
  };
  return (
    <RootLayout>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
          }}
        >
          <CardWrapper {...hotelData} />
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "99%",
              gap: 10,
              borderColor: COLORS.DISABLE,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            <TextWrapper>
              <TextWrapper bold>This is a rare find.</TextWrapper> Lee's place
              on Airbnb is usually fully booked.
            </TextWrapper>
            <Svg
              viewBox="0 0 48 48"
              aria-hidden={true}
              style={{
                height: 36,
                width: 36,
              }}
              fill="#e31c5f"
              stroke="currentcolor"
            >
              <Path
                d="M32.62 6l9.526 11.114L24 41.035 5.853 17.114 15.379 6z"
                fillOpacity={0.2}
              />
              <Path d="M34.46 2l12.824 14.962L24 47.655.716 16.962 13.54 2zM16.543 18H4.015l18.259 24.069zm27.44 0H31.457l-5.73 24.069zm-14.582 0H18.599L24 40.684zM13.48 5.14L4.173 16h11.894zm19.253-1.141H15.266L18.123 16h11.754zm1.784 1.141L31.932 16h11.894z" />
            </Svg>
          </View>
        </View>

        <FooterWithContentWrapper direction={Direction.row}>
          <View>
            <TextWrapper>$ 45 night</TextWrapper>
            <TextWrapper>Feb 10-12</TextWrapper>
          </View>
          <ButtonWrapper onPress={handleBookRoom} primary>
            Reserve
          </ButtonWrapper>
        </FooterWithContentWrapper>
      </SafeAreaView>
    </RootLayout>
  );
};

export default ExploreRoomDetailDetailScreen;
