import MyApp from "./MyApp";
import CategoriesContextProvider from "./store/categoriesContext";
import ExpensesContextProvider from "./store/expensesContext";
import PlannedAmountContextProvider from "./store/plannedAmountContext";
import ThemeContextProvider from "./store/themeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <ThemeContextProvider>
      <ExpensesContextProvider>
        <CategoriesContextProvider>
          <PlannedAmountContextProvider>
            <SafeAreaProvider>
              <MyApp />
            </SafeAreaProvider>
          </PlannedAmountContextProvider>
        </CategoriesContextProvider>
      </ExpensesContextProvider>
    </ThemeContextProvider>
  );
}
