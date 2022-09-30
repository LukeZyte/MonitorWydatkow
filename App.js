import MyApp from "./MyApp";
import CategoriesContextProvider from "./store/categoriesContext";
import ExpensesContextProvider from "./store/expensesContext";
import ThemeContextProvider from "./store/themeContext";

export default function App() {
  return (
    <ThemeContextProvider>
      <ExpensesContextProvider>
        <CategoriesContextProvider>
          <MyApp />
        </CategoriesContextProvider>
      </ExpensesContextProvider>
    </ThemeContextProvider>
  );
}
