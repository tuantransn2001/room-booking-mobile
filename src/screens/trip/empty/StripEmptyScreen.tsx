/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { View } from "react-native";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import SectionWrapper from "@shared-components/section-wrapper/SectionWrapper";
const StripWithNoReservation = () => {
  return (
    <View
      style={{
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: "column",
        gap: 20,
      }}
    >
      <SectionWrapper title="No Trip book... yet!">
        <TextWrapper>
          Time to dust off your bag and start planning...
        </TextWrapper>

        <ButtonWrapper tertiary>Start Searching</ButtonWrapper>
      </SectionWrapper>

      <SectionWrapper title="Can't find your reservation ?">
        <ButtonWrapper link>Visit the help centre</ButtonWrapper>
      </SectionWrapper>
    </View>
  );
};
export default StripWithNoReservation;
