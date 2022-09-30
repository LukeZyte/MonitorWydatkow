import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import ExpensesDisplay from "../components/Expenses/ExpensesDisplay";
import ExpensesDateDisplay from "../components/Expenses/ExpensesDateDisplay";
import ExpensesList from "../components/Expenses/ExpensesList";
import MenuLabel from "../components/UI/MenuLabel";
import IconButton from "../components/UI/IconButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext, useState } from "react";
import AddExpenseModal from "../components/Expenses/AddExpenseModal";
import IoniconTextButton from "../components/UI/IoniconTextButton";
import { AppStyle } from "../constants/style";
import { ExpensesContext } from "../../store/expensesContext";
import TextUI from "../components/UI/TextUI";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { expenses } = useContext(ExpensesContext);

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const iconSize = AppStyle.fontSize.large;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ExpensesDisplay />
        <View style={styles.actionButtons}>
          <ExpensesDateDisplay />
          <IconButton
            onPress={() => {
              // navigation.navigate("ManageExpenseScreen");
              setShowAddExpenseModal(true);
            }}
          >
            <FontAwesome5
              name="cart-plus"
              size={iconSize}
              color={colors.background}
            />
          </IconButton>
          {showAddExpenseModal && (
            <AddExpenseModal
              showAddExpenseModal={showAddExpenseModal}
              setShowAddExpenseModal={setShowAddExpenseModal}
            />
          )}
        </View>
        {expenses.length > 0 && (
          <>
            <MenuLabel style={styles.label}>Ostatnie wydatki</MenuLabel>
            <View style={styles.listContainer}>
              <ExpensesList />
            </View>
            <IoniconTextButton
              icon="list"
              size={iconSize}
              color={colors.accent}
              textStyle={{ color: colors.accent }}
            >
              Pokaż wszystkie
            </IoniconTextButton>
          </>
        )}
        {expenses.length === 0 && (
          <TextUI
            style={{
              textAlign: "center",
              marginVertical: 32,
              color: "gray",
            }}
          >
            {`Brak zarejestrowanych wydatków\nKliknij w koszyk, aby dodać pierwszy zakup`}
          </TextUI>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { paddingVertical: 16 },
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
