import { useTheme } from "@react-navigation/native";
import { useLayoutEffect, useContext, Alert } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ExpensesContext } from "../../store/expensesContext";
import ExpenseItem from "../components/Expenses/ExpenseItem";

const AllExpensesScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { expenses } = useContext(ExpensesContext);

  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ExpenseItem {...item} itemIndex={index} withDatesSeparators={true} />
        )}
      />
    </View>
  );
};

export default AllExpensesScreen;

const styles = StyleSheet.create({});
