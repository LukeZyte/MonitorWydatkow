import { createContext, useState } from "react";
import { AppStyle } from "../src/constants/style";

export const CategoriesContext = createContext({
  categories: [],
});

const INITIAL_CATEGORIES = [
  {
    name: "Spożywcze",
    color: AppStyle.categoriesColor.food,
  },
  {
    name: "Używki",
    color: AppStyle.categoriesColor.drugs,
  },
  {
    name: "Osobiste",
    color: AppStyle.categoriesColor.personal,
  },
  {
    name: "Transport",
    color: AppStyle.categoriesColor.transport,
  },
  {
    name: "Odzież",
    color: AppStyle.categoriesColor.clothes,
  },
  {
    name: "Rachunki",
    color: AppStyle.categoriesColor.bills,
  },
  {
    name: "Inne",
    color: AppStyle.categoriesColor.other,
  },
];

const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  const value = {
    categories: categories,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContextProvider;
