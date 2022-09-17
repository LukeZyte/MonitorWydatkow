import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";
import { useContext } from "react";
import { ExpensesContext } from "../../../store/expensesContext";

const ExpensesDisplay = () => {
  const { colors } = useTheme();
  const expensesCtx = useContext(ExpensesContext);

  const summary = expensesCtx.expenses.reduce(
    (sum, { value }) => sum + +value,
    0
  );

  return (
    <View style={[styles.container]}>
      <TextUI style={styles.text}>{`${summary.toFixed(2)} zł`}</TextUI>
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
