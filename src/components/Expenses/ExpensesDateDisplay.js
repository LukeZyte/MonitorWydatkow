import { StyleSheet, View, Text, Button } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";

const ExpensesDateDisplay = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.display,
          { borderColor: colors.border, backgroundColor: colors.bgPrimary },
        ]}
      >
        <View></View>
        <TextUI style={[styles.text, { color: colors.accent }]}>
          Październik
        </TextUI>
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
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: AppStyle.border.radius,
  },
  text: {
    fontWeight: AppStyle.fontWeight.normal,
  },
});
