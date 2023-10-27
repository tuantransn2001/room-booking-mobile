/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/extensions */
import React from "react";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { SafeAreaView } from "react-native";
import RequiredYourTrip from "@screens/booking/requiredYourTrip/RequiredYourTrip";

const PlaygroundScreen = () => {
  return (
    <SafeAreaView>
      <TextWrapper>Playground</TextWrapper>
      <RequiredYourTrip />
    </SafeAreaView>
  );
};
export default PlaygroundScreen;
