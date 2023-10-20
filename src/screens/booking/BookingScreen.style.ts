import { COLORS } from "@shared-constants";
import { StyleSheet, ViewStyle } from "react-native";
interface Style {
  container: ViewStyle;
  section: ViewStyle;
  row: ViewStyle;
}
export default () => {
  return StyleSheet.create<Style>({
    container: { flex: 1 },
    section: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: COLORS.DISABLE,
      flexDirection: "column",
      gap: 16,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
};
