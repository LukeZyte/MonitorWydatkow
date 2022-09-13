import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AppStyle } from "../../constants/style";

const MenuLabel = ({ children, style }) => {
  const { colors } = useTheme();
  return (
    <Text style={[styles.text, { color: colors.accent }, style]}>
      {children}
    </Text>
  );
};

export default MenuLabel;

const styles = StyleSheet.create({
  text: {
    fontSize: AppStyle.fontSize.medium,
    fontWeight: AppStyle.fontWeight.bold,
  },
});
