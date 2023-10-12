import { StyleSheet, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  toggle: ViewStyle;
}

export default () => {
  return StyleSheet.create<Style>({
    container: {
      marginHorizontal: 30,
      flexDirection: "column",
      height: "100%",
      gap: 30,
      justifyContent: "center",
    },
    toggle: {
      margin: 2,
    },
  });
};
