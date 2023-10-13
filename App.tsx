/* eslint-disable import/no-extraneous-dependencies */
import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme, LogBox } from "react-native";
import SplashScreen from "react-native-splash-screen";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { NativeBaseProvider } from "native-base";

/**
 * ? Local Imports
 */
import Navigation from "./src/navigation";
import { isAndroid } from "@freakycoder/react-native-helpers";
import { ModalService } from "@ui-kitten/components";
import { ApolloProvider } from "@apollo/client";
import { client } from "apis/apolloClient";

LogBox.ignoreAllLogs();

ModalService.setShouldUseTopInsets = true;

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, [scheme, isDarkMode]);

  return (
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </ApplicationProvider>
    </ApolloProvider>
  );
};

export default App;
