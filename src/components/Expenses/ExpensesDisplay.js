import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";

const ExpensesDisplay = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, { color: colors.text }]}>327.75 zł</Text>
    </View>
  );
};

export default ExpensesDisplay;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 32,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: AppStyle.fontSize.huge,
    fontWeight: AppStyle.fontWeight.bold,
  },
});
