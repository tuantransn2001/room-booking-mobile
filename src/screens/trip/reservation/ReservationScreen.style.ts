import { COLORS } from "@shared-constants";
import { StyleSheet, ViewStyle } from "react-native";
interface Style {
  container: ViewStyle;
  buttonStick: ViewStyle;
  buttonStickWrapper: ViewStyle;
}
export default () => {
  return StyleSheet.create<Style>({
    container: { flex: 1 },
    buttonStick: {
      width: "auto",
      height: "auto",
      backgroundColor: COLORS.WHITE,
      borderRadius: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: COLORS.DISABLE,
    },
    buttonStickWrapper: {
      position: "absolute",
      zIndex: 9999,

      top: 12,
    },
  });
};
