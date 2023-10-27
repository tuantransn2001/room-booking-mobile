import { StyleSheet, ViewStyle } from "react-native";
interface Style {
  container: ViewStyle;
  row: ViewStyle;
}
export default () => {
  return StyleSheet.create<Style>({
    container: { flex: 1 },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
};
