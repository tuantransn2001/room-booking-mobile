/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { View } from "react-native";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
const StripWithNoReservation = () => {
  return (
    <View>
      <View>
        <TextWrapper>No Trip book... yet!</TextWrapper>
        <TextWrapper>
          Time to dust off your bag and start planning...
        </TextWrapper>
      </View>

      <View>
        <ButtonWrapper tertiary>Start Searching</ButtonWrapper>
      </View>

      <View>
        <TextWrapper>
          Can't find your reservation ?
          <ButtonWrapper link>Visit the help centre</ButtonWrapper>
        </TextWrapper>
      </View>
    </View>
  );
};
export default StripWithNoReservation;
