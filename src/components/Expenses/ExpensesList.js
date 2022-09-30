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
    <View
      style={[
        styles.container,
        { borderTopColor: colors.border, borderBottomColor: colors.border },
      ]}
    >
      {/* <FlatList
        data={expensesCtx.expenses}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return <ExpenseItem {...itemData.item} />;
        }}
      /> */}

      {expensesCtx.expenses
        .filter((item, index) => index < 8)
        .map((item) => (
          <ExpenseItem key={item.id} {...item} />
        ))}
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginVertical: 8,
    // marginHorizontal: 8,
    // padding: 8,
    justifyContent: "center",
    borderWidth: 0.1,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: AppStyle.border.radius,
  },
});
