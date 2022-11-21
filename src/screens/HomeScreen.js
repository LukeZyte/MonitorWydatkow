import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import ExpensesDisplay from "../components/Expenses/ExpensesDisplay";
import DatePickerDisplay from "../components/Expenses/DatePickerDisplay";
import ExpensesList from "../components/Expenses/ExpensesList";
import MenuLabel from "../components/UI/MenuLabel";
import IconButton from "../components/UI/IconButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import AddExpenseModal from "../components/Expenses/AddExpense/AddExpenseModal";
import IoniconTextButton from "../components/UI/IoniconTextButton";
import { AppStyle } from "../constants/style";
import { ExpensesContext } from "../../store/expensesContext";
import TextUI from "../components/UI/TextUI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteExpenseModal from "../components/UI/DeleteExpenseModal";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { expenses } = useContext(ExpensesContext);

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const iconSize = AppStyle.fontSize.large;

  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);

  // AsyncStorage
  const getSelectedDateFromStore = async () => {
    try {
      const result = await AsyncStorage.getItem("selectedDateKey");
      if (result) {
        setSelectedDate(new Date(JSON.parse(result)));
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const setSelectedDateStore = async (data) => {
    try {
      await AsyncStorage.setItem("selectedDateKey", JSON.stringify(data));
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    setSelectedDateStore(selectedDate);
  }, [selectedDate]);

  useLayoutEffect(() => {
    getSelectedDateFromStore();
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.container}>
          <ExpensesDisplay
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <View style={styles.actionButtons}>
            <DatePickerDisplay
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <IconButton
              onPress={() => {
                setShowAddExpenseModal(true);
              }}
            >
              <FontAwesome5
                name="cart-plus"
                size={iconSize}
                color={colors.background}
                style={{ padding: 24 }}
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
                onPress={() => navigation.navigate("AllExpensesScreen")}
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
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    left: 16,
  },
  listContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});
