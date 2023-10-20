/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import React, { useMemo } from "react";
import RootLayout from "layouts/rootLayout";
import createStyles from "./ExploreScreen.style";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faSliders,
  faRestroom,
  faUmbrellaBeach,
  faHouse,
  faGolfBallTee,
  faCompass,
  faTree,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { COLORS, SCREENS } from "@shared-constants";
import CardWrapper from "@shared-components/card-wrapper/CardWrapper";
import { cards } from "./mocks/data";
import { handleNavigate } from "utils";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "graphql/query/GetCategories";
import { GET_HOTELS } from "graphql/query/GetHotels";
import { ICardWrapper } from "@shared-components/card-wrapper/shared/CardWrapper.interface";

/**
 * ? Local Imports
 */

interface ExploreScreenProps {}

const renderScrollViewNavigation = (
  categories: { [key: string]: string | number }[],
) => {
  const navigations = [
    faRestroom,
    faUmbrellaBeach,
    faHouse,
    faGolfBallTee,
    faCompass,
    faTree,
    faDumbbell,
  ];
  return (
    <ScrollView
      style={{
        borderBottomWidth: 1,
        borderColor: COLORS.DISABLE,
        paddingBottom: 14,
      }}
      horizontal
    >
      {categories.map(({ id, categoryName }, index: number) => {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "center",
              marginRight: 24,
            }}
            key={id}
          >
            <FontAwesomeIcon
              size={20}
              icon={navigations[id as number]}
              color={COLORS.BLACK}
            />
            <TextWrapper
              h6
              h5={index === 0}
              bold={index === 0}
              color={COLORS.BLACK}
            >
              {categoryName}
            </TextWrapper>
          </View>
        );
      })}
    </ScrollView>
  );
};

const Hotels = () => {
  const { loading, data } = useQuery(GET_HOTELS);
  if (loading || !data) return <TextWrapper>Loading</TextWrapper>;

  const cardData: ICardWrapper[] = data.getHotels.map(
    ({ id, hotelName }: { [key: string]: string | number }) => ({
      id,
      loading,
      sliders: cards[0].sliders,
      rateNumber: 4,
      body: {
        title: hotelName,
        contents: cards[0].body.contents,
      },
    }),
  );

  return (
    <ScrollView>
      {cardData.map((card, i) => (
        <Pressable
          onPress={() =>
            handleNavigate(SCREENS.EXPLORE_DETAIL, { id: card.id })
          }
          key={i}
        >
          <CardWrapper {...card} />
        </Pressable>
      ))}
    </ScrollView>
  );
};

const ExploreScreen: React.FC<ExploreScreenProps> = () => {
  const styles = useMemo(() => createStyles(), []);
  const { loading, data } = useQuery(GET_CATEGORIES);

  if (loading || !data) return <TextWrapper>Loading</TextWrapper>;

  return (
    <RootLayout>
      <SafeAreaView style={styles.container}>
        {/* Top search */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: COLORS.DISABLE,
            backgroundColor: COLORS.WHITE,
            borderRadius: 50,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
            <View>
              <TextWrapper>Where to?</TextWrapper>
              <TextWrapper h6 bold>
                Anywhere - Any week - Add guests
              </TextWrapper>
            </View>
          </View>
          <ButtonWrapper
            style={{
              borderWidth: 1,
              borderRadius: 50,
              borderColor: COLORS.DISABLE,
              width: 30,
              height: 30,
            }}
            ghost
            tertiary
            StartIcon={faSliders}
          />
        </View>
        {/* Navigation */}
        <View>{renderScrollViewNavigation(data.getCategories)}</View>

        <ScrollView>
          <Hotels />
        </ScrollView>
      </SafeAreaView>
    </RootLayout>
  );
};

export default ExploreScreen;
