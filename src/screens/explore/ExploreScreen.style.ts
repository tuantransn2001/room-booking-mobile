import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet } from "react-native";

interface Style {
  container: ViewStyle;
}

export default (theme?: ExtendedTheme) => {
  return StyleSheet.create<Style>({
    container: {
      marginTop: 60,
      marginHorizontal: 20,
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
  });
};
