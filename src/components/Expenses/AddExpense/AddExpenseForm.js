import { FlatList, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../UI/IconButton";
import Input from "../../UI/Input";
import { AppStyle } from "../../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { ExpensesContext } from "../../../../store/expensesContext";
import { CategoriesContext } from "../../../../store/categoriesContext";
import DatePickerDisplay from "../DatePickerDisplay";
import TextUI from "../../UI/TextUI";
import CategoryItem from "./CategoryItem";
import { ThemeContext } from "../../../../store/themeContext";

const AddExpenseForm = ({ onSetModalVisible }) => {
  const { colors } = useTheme();
  const expensesCtx = useContext(ExpensesContext);
  const { categories } = useContext(CategoriesContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const [navStage, setNavStage] = useState(1);

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

  const nextHandler = () => {
    let priceNotValid = true;
    let titleNotValid = true;
    let formOK = false;
    let pickedOtherDate = true;

    if (navStage === 1) {
      priceNotValid =
        !enteredPrice.value ||
        enteredPrice.value === "0" ||
        enteredPrice.value === ".";
      if (priceNotValid) {
        setEnteredPrice({ value: null, isValid: false });
        return;
      }

      setNavStage(2);
    }

    if (navStage === 2) {
      titleNotValid = enteredTitle.value.trim().length === 0;
      if (titleNotValid) {
        setEnteredTitle({ value: "", isValid: false });
        return;
      }

      setNavStage(3);
    }

    if (navStage === 3) {
      if (!priceNotValid || !titleNotValid) {
        // TODO Handle error + show user what was wrong
        console.log(`FALSE ${priceNotValid}, ${titleNotValid}`);
        return;
      }

      if (
        new Date().toLocaleDateString() ===
        new Date(pickedDate).toLocaleDateString()
      ) {
        pickedOtherDate = false;
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
    }
  };

  const stagePrice = (
    <View style={styles.cardContent}>
      <View style={styles.priceContainer}>
        <View style={styles.priceCurrencyText} />
        <Input
          label="Koszt wydatku"
          keyboardType="number-pad"
          maxLength={8}
          style={[
            styles.priceInput,
            isDarkTheme && {
              backgroundColor: colors.background,
              // borderColor: colors.background,
            },
            !enteredPrice.isValid && {
              borderColor: colors.wrong,
              color: colors.wrong,
            },
          ]}
          styleLabel={styles.centerLabel}
          placeholder="Koszt"
          placeholderTextColor={!enteredPrice.isValid && colors.wrong}
          onChangeText={(enteredText) => {
            let newText = "";
            let numbers = "0123456789.,";
            let numberOfDots = 0;

            for (var i = 0; i < enteredText.length; i++) {
              if (numbers.indexOf(enteredText[i]) > -1) {
                if (numberOfDots < 1 && enteredText[i] === ",") {
                  newText = newText + ".";
                  break;
                }
                if (enteredText[i] === "." || enteredText[i] === ",") {
                  numberOfDots++;
                }
                if (numberOfDots > 1) {
                  break;
                }
                if (numberOfDots === 1 && enteredText.length - i > 3) {
                  return;
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
        <TextUI style={styles.priceCurrencyText}>zł</TextUI>
      </View>
    </View>
  );

  const stageTitle = (
    <View style={styles.cardContent}>
      <Input
        label="Tytuł wydatku"
        keyboardType="default"
        style={[
          styles.titleInput,
          isDarkTheme && { backgroundColor: colors.background },
          !enteredTitle.isValid && {
            borderColor: colors.wrong,
            color: colors.wrong,
          },
        ]}
        styleLabel={styles.centerLabel}
        placeholder="Nowy wydatek..."
        placeholderTextColor={!enteredTitle.isValid && colors.wrong}
        onChangeText={(enteredText) =>
          setEnteredTitle({ value: enteredText, isValid: true })
        }
        value={enteredTitle.value}
      />
    </View>
  );

  const stageCategory = (
    <View style={styles.cardContent}>
      <TextUI style={styles.categoriesLabel}>Kategoria zakupów</TextUI>
      <TextUI
        style={[
          {
            fontWeight: AppStyle.fontWeight.bold,
            color: colors.accent,
          },
          styles.categoryName,
        ]}
      >
        {selectedCategory.name}
      </TextUI>
      <FlatList
        columnWrapperStyle={{
          justifyContent: "center",
          margin: 2,
        }}
        data={categories}
        numColumns={3}
        renderItem={({ item }) => (
          <CategoryItem
            key={item.name}
            name={item.name}
            color={item.color}
            selectCategoryHandler={selectCategoryHandler}
            selectedCategory={selectedCategory}
          />
        )}
      />
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      {navStage === 1 && stagePrice}
      {navStage === 2 && stageTitle}
      {navStage === 3 && stageCategory}
      <View style={styles.bottomButtons}>
        <View style={{ marginHorizontal: 12 }}>
          <DatePickerDisplay
            selectedDate={pickedDate}
            setSelectedDate={setPickedDate}
            fullDate
            style={{ backgroundColor: colors.modal }}
          />
        </View>
        <IconButton onPress={nextHandler} style={styles.submitButton}>
          {(navStage === 1 || navStage === 2) && (
            <Ionicons
              name="md-arrow-forward"
              size={32}
              color={colors.background}
              style={styles.submitIcon}
            />
          )}
          {navStage === 3 && (
            <Ionicons
              name="checkmark"
              size={32}
              color={colors.background}
              style={styles.submitIcon}
            />
          )}
        </IconButton>
      </View>
    </View>
  );
};

export default AddExpenseForm;

const styles = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 8,
    height: 300,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  priceInput: {
    alignSelf: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: AppStyle.border.round,
    textAlign: "center",
    fontWeight: AppStyle.fontWeight.bold,
    fontSize: AppStyle.fontSize.huge,
  },
  priceCurrencyText: {
    width: 24,
    marginLeft: 8,
    fontSize: AppStyle.fontSize.large,
    fontWeight: AppStyle.fontWeight.bold,
  },
  centerLabel: { textAlign: "center" },
  titleInput: {
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  categoriesLabel: { textAlign: "center" },
  categoryName: {
    textAlign: "center",
    marginVertical: 4,
  },
  bottomButtons: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  submitIcon: {
    padding: 16,
  },
  submitButton: {},
});
