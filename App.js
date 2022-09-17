import { StatusBar } from "expo-status-bar";
import MyApp from "./MyApp";
import ExpensesContextProvider from "./store/expensesContext";
import ThemeContextProvider from "./store/themeContext";

export default function App() {
  return (
    <>
      <ThemeContextProvider>
        <ExpensesContextProvider>
          <MyApp />
        </ExpensesContextProvider>
      </ThemeContextProvider>
    </>
  );
}
