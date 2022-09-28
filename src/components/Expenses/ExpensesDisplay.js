import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";
import { useContext } from "react";
import { ExpensesContext } from "../../../store/expensesContext";

const ExpensesDisplay = () => {
  const { colors } = useTheme();
  const expensesCtx = useContext(ExpensesContext);

  const summary = expensesCtx.expenses.reduce(
    (sum, { value }) => sum + parseFloat(value),
    0
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <TextUI style={styles.text}>{`${summary.toFixed(2)} zł`}</TextUI>
    </View>
  );
};

export default ExpensesDisplay;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: AppStyle.border.round,
    marginTop: 32,
    marginBottom: 32,
    padding: 24,
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
