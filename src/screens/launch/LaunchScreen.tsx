/* eslint-disable import/extensions */
import React from "react";
import Logo from "assets/logo/logo";
import { View } from "react-native";
interface LaunchScreenProps {}

const LaunchScreen: React.FC<LaunchScreenProps> = () => {
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
