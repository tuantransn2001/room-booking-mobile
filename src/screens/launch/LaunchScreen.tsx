/* eslint-disable import/extensions */
import React from "react";
import Logo from "assets/logo/logo";
import { View } from "react-native";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "@shared-constants";
interface LaunchScreenProps {}

const autoSwitchToAuthDelay = setTimeout(() => {
  NavigationService.push(SCREENS.ON_BOARD);
}, 5000);

const LaunchScreen: React.FC<LaunchScreenProps> = () => {
  React.useEffect(() => {
    autoSwitchToAuthDelay;
    () => clearTimeout(autoSwitchToAuthDelay);
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo />
    </View>
  );
};

export default LaunchScreen;
