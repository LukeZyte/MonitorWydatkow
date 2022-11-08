import { Alert, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../UI/IconButton";
import Input from "../../UI/Input";
import { AppStyle } from "../../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { ExpensesContext } from "../../../../store/expensesContext";
import { CategoriesContext } from "../../../../store/categoriesContext";
import DatePickerDisplay from "../DatePickerDisplay";
import CategoryPicker from "./CategoryPicker";

const AddExpenseForm = ({ onSetModalVisible }) => {
  const { colors } = useTheme();
  const expensesCtx = useContext(ExpensesContext);
  const { categories } = useContext(CategoriesContext);

  const [enteredPrice, setEnteredPrice] = useState({
    value: null,
    isValid: true,
  });
  const [enteredTitle, setEnteredTitle] = useState({
    value: "",
    isValid: true,
  });
  const [selectedCategory, setSelectedCategory] = useState(
    categories[categories.length - 1]
  );

  const [pickedDate, setPickedDate] = useState(new Date());

  const selectCategoryHandler = (index) => {
    setSelectedCategory(categories[index]);
  };

  const submitHandler = () => {
    let titleOK = true;
    let priceOK = true;
    let pickedOtherDate = true;

    if (
      !enteredPrice.value ||
      enteredPrice.value === "0" ||
      enteredPrice.value === "."
    ) {
      setEnteredPrice({ value: null, isValid: false });
      priceOK = false;
    }
    if (enteredTitle.value.trim().length === 0) {
      setEnteredTitle({ value: "", isValid: false });
      titleOK = false;
    }

    let formOK = priceOK && titleOK;

    if (
      new Date().toLocaleDateString() ===
      new Date(pickedDate).toLocaleDateString()
    ) {
      pickedOtherDate = false;
    }

    if (!formOK) {
      return;
    }

    if (!pickedOtherDate) {
      expensesCtx.addExpense({
        id: new Date().toLocaleString() + Math.random().toString(),
        title: enteredTitle.value.trim(),
        value: enteredPrice.value,
        date: pickedDate,
        category: selectedCategory.name,
      });
      onSetModalVisible(false);
    }

    if (pickedOtherDate) {
      expensesCtx.addExpenseAndSort({
        id: new Date().toLocaleString() + Math.random().toString(),
        title: enteredTitle.value.trim(),
        value: enteredPrice.value,
        date: pickedDate,
        category: selectedCategory.name,
      });
      onSetModalVisible(false);
    }
  };

  return (
    <>
      <View>
        <Input
          label="Koszt wydatku"
          keyboardType="number-pad"
          maxLength={8}
          style={[
            styles.priceInput,
            !enteredPrice.isValid && {
              borderColor: colors.wrong,
              color: colors.wrong,
            },
          ]}
          placeholder="Koszt"
          placeholderTextColor={!enteredPrice.isValid && colors.wrong}
          onChangeText={(enteredText) => {
            let newText = "";
            let numbers = "0123456789.";
            let numberOfDots = 0;

            for (var i = 0; i < enteredText.length; i++) {
              if (numbers.indexOf(enteredText[i]) > -1) {
                if (enteredText[i] === ".") {
                  numberOfDots++;
                }
                if (numberOfDots > 1) {
                  break;
                }
                newText = newText + enteredText[i];
              }
            }
            setEnteredPrice({
              value: newText,
              isValid: true,
            });
          }}
          value={enteredPrice.value}
        />
        <Input
          label="Tytuł wydatku"
          keyboardType="default"
          style={[
            styles.titleInput,
            !enteredTitle.isValid && {
              borderColor: colors.wrong,
              color: colors.wrong,
            },
          ]}
          placeholder="Nowy wydatek..."
          placeholderTextColor={!enteredPrice.isValid && colors.wrong}
          onChangeText={(enteredText) =>
            setEnteredTitle({ value: enteredText, isValid: true })
          }
          value={enteredTitle.value}
        />
      </View>

      <CategoryPicker
        selectCategoryHandler={selectCategoryHandler}
        selectedCategory={selectedCategory}
      />

      <View style={styles.bottomButtons}>
        <DatePickerDisplay
          selectedDate={pickedDate}
          setSelectedDate={setPickedDate}
          fullDate
        />

        <IconButton onPress={submitHandler}>
          <Ionicons
            name="checkmark-sharp"
            size={32}
            color={colors.background}
            style={styles.submitButton}
          />
        </IconButton>
      </View>
    </>
  );
};

export default AddExpenseForm;

const styles = StyleSheet.create({
  priceInput: {
    marginBottom: 16,
    textAlign: "center",
    fontWeight: AppStyle.fontWeight.bold,
    fontSize: AppStyle.fontSize.huge,
  },
  titleInput: {
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  bottomButtons: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  submitButton: { padding: 16 },
});