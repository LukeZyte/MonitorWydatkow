import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
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
