import { StyleSheet, View, Text, Button } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";

const ExpensesDateDisplay = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.display,
          { borderColor: colors.border, backgroundColor: colors.darkPrimary },
        ]}
      >
        <View></View>
        <Text style={[styles.text, { color: colors.accent }]}>Październik</Text>
        <View></View>
      </View>
    </View>
  );
};

export default ExpensesDateDisplay;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  display: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: AppStyle.border.radius,
  },
  text: {
    fontSize: AppStyle.fontSize.medium,
    fontWeight: AppStyle.fontWeight.normal,
  },
});
