import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AppStyle } from "../../constants/style";
import TextUI from "./TextUI";

const MenuLabel = ({ children, style }) => {
  const { colors } = useTheme();
  return (
    <TextUI style={[styles.text, { color: colors.primary }, style]}>
      {children}
    </TextUI>
  );
};

export default MenuLabel;

const styles = StyleSheet.create({
  text: {
    fontWeight: AppStyle.fontWeight.bold,
  },
});
