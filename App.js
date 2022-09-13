import { StatusBar } from "expo-status-bar";
import MyApp from "./MyApp";
import ExpensesContextProvider from "./store/expensesContext";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <MyApp />
      </ExpensesContextProvider>
    </>
  );
}
