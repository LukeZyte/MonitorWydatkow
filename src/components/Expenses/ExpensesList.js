import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import { useContext } from "react";
import { ExpensesContext } from "../../../store/expensesContext";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = () => {
  const { colors } = useTheme();
  const expensesCtx = useContext(ExpensesContext);

  return (
    <View style={[styles.container]}>
      {expensesCtx.expenses
        .filter((item, index) => index < 5)
        .map((item, index) => (
          <ExpenseItem key={item.id} {...item} itemIndex={index} />
        ))}
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginVertical: 8,
    justifyContent: "center",
    borderRadius: AppStyle.border.radius,
  },
});
