/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import React, { useMemo } from "react";
import RootLayout from "layouts/rootLayout";
import createStyles from "./ExploreScreen.style";
import { SafeAreaView, ScrollView, View } from "react-native";
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
import { COLORS } from "@shared-constants";
import CardWrapper from "@shared-components/card-wrapper/CardWrapper";
import { cards } from "./mocks/data";

/**
 * ? Local Imports
 */

interface ExploreScreenProps {}

const renderScrollViewNavigation = () => {
  const navigations = [
    {
      icon: faRestroom,
      content: "Room",
    },
    {
      icon: faUmbrellaBeach,
      content: "Beaches",
    },
    {
      icon: faHouse,
      content: "Tiny Home",
    },
    {
      icon: faGolfBallTee,
      content: "Goft",
    },
    {
      icon: faCompass,
      content: "Amazing",
    },
    {
      icon: faTree,
      content: "Pen house",
    },
    {
      icon: faDumbbell,
      content: "Gym",
    },
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
      {navigations.map(({ icon, content }, index) => {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "center",
              marginRight: 24,
            }}
            key={index}
          >
            <FontAwesomeIcon size={20} icon={icon} color={COLORS.BLACK} />
            <TextWrapper
              h6
              h5={index === 0}
              bold={index === 0}
              color={COLORS.BLACK}
            >
              {content}
            </TextWrapper>
          </View>
        );
      })}
    </ScrollView>
  );
};

const ExploreScreen: React.FC<ExploreScreenProps> = () => {
  const styles = useMemo(() => createStyles(), []);

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
        <View>{renderScrollViewNavigation()}</View>

        <ScrollView>
          {cards.map((card, i) => (
            <CardWrapper {...card} key={i} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </RootLayout>
  );
};

export default ExploreScreen;
