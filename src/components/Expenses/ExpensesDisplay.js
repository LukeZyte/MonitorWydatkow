import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";
import { useContext } from "react";
import { ExpensesContext } from "../../../store/expensesContext";

const ExpensesDisplay = ({ selectedDate, setSelectedDate }) => {
  const { colors } = useTheme();
  const { expenses } = useContext(ExpensesContext);

  let summaryValue = 0;

  for (let index = 0; index < expenses.length; index++) {
    if (
      new Date(expenses[index].date).getFullYear() ===
        new Date(selectedDate).getFullYear() &&
      new Date(expenses[index].date).getMonth() ===
        new Date(selectedDate).getMonth()
    ) {
      summaryValue += parseFloat(expenses[index].value);
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgPrimary,
          borderColor: colors.bgPrimary,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <TextUI style={styles.text}>{`${summaryValue.toFixed(2)} zł`}</TextUI>
    </View>
  );
};

export default ExpensesDisplay;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: AppStyle.border.round,
    borderLeftWidth: 0.1,
    borderRightWidth: 0.1,
    borderTopWidth: 0,
    borderBottomWidth: 4,
    marginBottom: 4,
    minWidth: 240,
    minHeight: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: AppStyle.fontSize.huge,
    fontWeight: AppStyle.fontWeight.bold,
  },
});
