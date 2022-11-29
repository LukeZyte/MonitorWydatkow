import MyApp from "./MyApp";
import CategoriesContextProvider from "./store/categoriesContext";
import ExpensesContextProvider from "./store/expensesContext";
import PlannedAmountContextProvider from "./store/plannedAmountContext";
import ThemeContextProvider from "./store/themeContext";

export default function App() {
  return (
    <ThemeContextProvider>
      <ExpensesContextProvider>
        <CategoriesContextProvider>
          <PlannedAmountContextProvider>
            <MyApp />
          </PlannedAmountContextProvider>
        </CategoriesContextProvider>
      </ExpensesContextProvider>
    </ThemeContextProvider>
  );
}
