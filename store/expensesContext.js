import { createContext, useState } from "react";

const initial_values = [
  {
    id: "e1",
    title: "Testowy 1",
    value: "2.00",
    date: new Date(),
  },
  {
    id: "e2",
    title: "Testowy 2",
    value: "44.20",
    date: new Date(),
  },
  {
    id: "e3",
    title: "Testowy 3",
    value: "14.80",
    date: new Date(),
  },
  {
    id: "e4",
    title: "Testowy 4",
    value: "21.50",
    date: new Date(),
  },
  {
    id: "e1",
    title: "Testowy 1",
    value: "2.00",
    date: new Date(),
  },
  {
    id: "e2",
    title: "Testowy 2",
    value: "44.20",
    date: new Date(),
  },
  {
    id: "e3",
    title: "Testowy 3",
    value: "14.80",
    date: new Date(),
  },
  {
    id: "e4",
    title: "Testowy 4",
    value: "21.50",
    date: new Date(),
  },
  {
    id: "e1",
    title: "Testowy 1",
    value: "2.00",
    date: new Date(),
  },
  {
    id: "e2",
    title: "Testowy 2",
    value: "44.20",
    date: new Date(),
  },
  {
    id: "e3",
    title: "Testowy 3",
    value: "14.80",
    date: new Date(),
  },
  {
    id: "e4",
    title: "Testowy 4",
    value: "21.50",
    date: new Date(),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
});

const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(initial_values);

  const value = {
    expenses: expenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
