import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";

const ExpenseItem = ({ id, title, value, date }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: colors.accent,
          backgroundColor: colors.bgPrimary,
        },
      ]}
    >
      <TextUI style={{ flex: 3 }}>{title}</TextUI>
      <TextUI style={[styles.value, { color: colors.accent }]}>
        {`${parseFloat(value).toFixed(2)} zł`}
      </TextUI>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 2,
    // borderWidth: 1,
    borderRadius: AppStyle.border.radius,
  },
  value: {
    fontWeight: AppStyle.fontWeight.bold,
    flex: 1,
    textAlign: "right",
  },
});
