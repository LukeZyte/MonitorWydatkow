import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { AppStyle } from "../../constants/style";

const TextUI = ({ children, style }) => {
  const { colors } = useTheme();

  return (
    <Text style={[styles.text, { color: colors.text }, style]}>{children}</Text>
  );
};

export default TextUI;

const styles = StyleSheet.create({
  text: {
    fontSize: AppStyle.fontSize.medium,
  },
});
