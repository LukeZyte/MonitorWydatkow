import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import ExpensesDisplay from "../components/Expenses/ExpensesDisplay";
import ExpensesDateDisplay from "../components/Expenses/ExpensesDateDisplay";
import ExpensesList from "../components/Expenses/ExpensesList";
import MenuLabel from "../components/UI/MenuLabel";
import IconButton from "../components/UI/IconButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { AppStyle } from "../constants/style";

const HomeScreen = () => {
  const { colors } = useTheme();

  return (
    <>
      <ExpensesDateDisplay />
      <ExpensesDisplay />
      <MenuLabel style={styles.label}>Ostatnie wydatki</MenuLabel>
      <View style={styles.listContainer}>
        <View style={{ flex: 1 }}>
          <ExpensesList />
        </View>
        <IconButton onPress={() => {}}>
          <FontAwesome5 name="cart-plus" size={24} color={colors.text} />
        </IconButton>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    marginBottom: 4,
  },
  listContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});
