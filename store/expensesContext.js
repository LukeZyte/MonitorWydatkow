import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  addExpenseAndSort: (expense) => {},
  deleteExpense: (id) => {},
});

const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const getExpensesFromStore = async () => {
    try {
      const result = await AsyncStorage.getItem("expensesKey");
      if (result) {
        setExpenses([...JSON.parse(result)]);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const setExpensesStore = async (data) => {
    try {
      await AsyncStorage.setItem("expensesKey", JSON.stringify(data));
    } catch (error) {
      Alert.alert(error);
    }
  };

  useLayoutEffect(() => {
    getExpensesFromStore();
  }, []);

  const addExpense = (expense) => {
    const newExpenses = [expense, ...expenses];

    setExpenses(newExpenses);
    setExpensesStore(newExpenses);
  };

  const addExpenseAndSort = (expense) => {
    const newExpenses = [expense, ...expenses].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setExpenses(newExpenses);
    setExpensesStore(newExpenses);
  };

  const deleteExpense = (id) => {
    const changedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(changedExpenses);
    setExpensesStore(changedExpenses);
  };

  const value = {
    expenses: expenses,
    addExpense: addExpense,
    addExpenseAndSort: addExpenseAndSort,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
