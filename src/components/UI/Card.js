import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";

const Card = ({ children, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.bgPrimary }, style]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: AppStyle.border.radius,
    padding: 4,
  },
});
