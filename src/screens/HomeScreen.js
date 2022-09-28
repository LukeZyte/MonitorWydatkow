import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import ExpensesDisplay from "../components/Expenses/ExpensesDisplay";
import ExpensesDateDisplay from "../components/Expenses/ExpensesDateDisplay";
import ExpensesList from "../components/Expenses/ExpensesList";
import MenuLabel from "../components/UI/MenuLabel";
import IconButton from "../components/UI/IconButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import AddExpenseModal from "../components/Expenses/AddExpenseModal";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  return (
    <>
      <ExpensesDisplay />
      <View style={styles.actionButtons}>
        <ExpensesDateDisplay />
        <IconButton
          onPress={() => {
            // navigation.navigate("ManageExpenseScreen");
            setShowAddExpenseModal(true);
          }}
        >
          <FontAwesome5 name="cart-plus" size={24} color={colors.background} />
        </IconButton>
      </View>
      <MenuLabel style={styles.label}>Ostatnie wydatki</MenuLabel>
      <View style={styles.listContainer}>
        <View style={{ flex: 1 }}>
          <ExpensesList />
        </View>

        {showAddExpenseModal && (
          <AddExpenseModal
            showAddExpenseModal={showAddExpenseModal}
            setShowAddExpenseModal={setShowAddExpenseModal}
          />
        )}
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    // textAlign: "center",
    left: 16,
    marginBottom: 4,
  },
  listContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});
