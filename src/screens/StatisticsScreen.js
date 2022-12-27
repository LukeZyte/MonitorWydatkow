import { StyleSheet, Dimensions } from "react-native";
import TextUI from "../components/UI/TextUI";
import { PieChart } from "react-native-svg-charts";
import { useContext } from "react";
import { CategoriesContext } from "../../store/categoriesContext";
import { ExpensesContext } from "../../store/expensesContext";
import CategoriesStats from "../components/Stats/CategoriesStats";

const StatisticsScreen = () => {
  const { categories } = useContext(CategoriesContext);
  const { expenses } = useContext(ExpensesContext);

  const sumArrBy = (arr = [], category = "") =>
    arr.reduce(
      (prev, { value, category: cat }) =>
        cat === category ? prev + parseFloat(value) : prev,
      0
    );

  let dataa = [
    {
      key: 1,
      amount: 50,
      svg: { fill: "#600080" },
    },
    {
      key: 2,
      amount: 50,
      svg: { fill: "#9900cc" },
    },
    {
      key: 3,
      amount: 40,
      svg: { fill: "#c61aff" },
    },
    {
      key: 4,
      amount: 95,
      svg: { fill: "#d966ff" },
    },
    {
      key: 5,
      amount: 35,
      svg: { fill: "#ecb3ff" },
    },
  ];

  // TODO limit couting for given month / week, give %

  let categoriesSums = [];
  categories.forEach((category, index) => {
    categoriesSums.push({
      key: index,
      amount: sumArrBy(expenses, category.name),
      category: category,
      svg: { fill: category.color },
    });
  });

  categoriesSums = categoriesSums.filter((element) => element.amount > 0);

  const sortedCategoriesSums = categoriesSums.sort(
    (a, b) => b.amount - a.amount
  );

  console.log(sortedCategoriesSums);
  return (
    <>
      <TextUI>Statystyka</TextUI>
      <PieChart
        style={{ height: 250 }}
        valueAccessor={({ item }) => item.amount}
        data={categoriesSums}
        // spacing={0}
        outerRadius={"100%"}
        innerRadius={"70%"}
      />
      <CategoriesStats categoriesSums={sortedCategoriesSums} />
    </>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({});
