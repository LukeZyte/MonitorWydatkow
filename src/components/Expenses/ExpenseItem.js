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
        { borderColor: colors.accent, backgroundColor: colors.bgPrimary },
      ]}
    >
      <TextUI>{title}</TextUI>
      <TextUI style={[styles.value, { color: colors.accent }]}>
        {`${value} zł`}
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
  },
});
