import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import ExpensesDisplay from "../components/Expenses/ExpensesDisplay";
import ExpensesDateDisplay from "../components/Expenses/ExpensesDateDisplay";

const HomeScreen = () => {
  const { colors } = useTheme();

  return (
    <>
      <ExpensesDateDisplay />
      <ExpensesDisplay />
    </>
  );
};

export default HomeScreen;
