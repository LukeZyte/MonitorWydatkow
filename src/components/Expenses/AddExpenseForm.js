import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../UI/IconButton";
import Input from "../UI/Input";
import { AppStyle } from "../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { ExpensesContext } from "../../../store/expensesContext";
import TextUI from "../UI/TextUI";
import { getSimpleDate } from "../../constants/date";
import { CategoriesContext } from "../../../store/categoriesContext";
import DatePickerDisplay from "./DatePickerDisplay";

const CategoryItem = ({
  name,
  color,
  selectCategoryHandler,
  selectedCategory,
}) => {
  const { categories } = useContext(CategoriesContext);
  const { colors } = useTheme();
  const iconSize = 24;
  let icon = <Ionicons name="fast-food" size={iconSize} color="white" />;

  switch (name) {
    case "Spożywcze":
      icon = <Ionicons name="fast-food" size={iconSize} color="white" />;
      break;
    case "Używki":
      icon = <Ionicons name="beer" size={iconSize} color="white" />;
      break;
    case "Osobiste":
      icon = <Ionicons name="game-controller" size={iconSize} color="white" />;
      break;
    case "Transport":
      icon = <Ionicons name="car" size={iconSize} color="white" />;
      break;
    case "Odzież":
      icon = <Ionicons name="shirt" size={iconSize} color="white" />;
      break;
    case "Inne":
      icon = <Ionicons name="shapes" size={iconSize} color="white" />;
      break;
  }

  const index = categories.findIndex((item) => item.name === name);

  const choosenCategory = selectedCategory.name === name;

  return (
    <Pressable
      onPress={() => {
        selectCategoryHandler(index);
      }}
    >
      <View
        style={[
          {
            flexDirection: "row",
            paddingVertical: 12,
            paddingHorizontal: 12,
            marginHorizontal: 2,
            borderRadius: AppStyle.border.round,
            backgroundColor: color,
            borderWidth: 2,
            borderColor: colors.bgPrimary,
          },
          choosenCategory && {
            borderColor: colors.primary,
            borderRadius: AppStyle.border.radius,
          },
        ]}
      >
        {icon}
      </View>
    </Pressable>
  );
};

const CategoryPicker = ({ selectCategoryHandler, selectedCategory }) => {
  const { categories } = useContext(CategoriesContext);
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 8,
        // marginBottom: 32,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <TextUI>Kategoria:</TextUI>
        <TextUI
          style={{
            fontWeight: AppStyle.fontWeight.bold,
            color: colors.accent,
          }}
        >
          {selectedCategory.name}
        </TextUI>
      </View>
      <View>
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
    </View>
  );
};

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

  const selectCategoryHandler = (index) => {
    setSelectedCategory(categories[index]);
  };

  const submitHandler = () => {
    let titleOK = true;
    let priceOK = true;

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

    if (formOK) {
      expensesCtx.addExpense({
        id: new Date().toLocaleString() + Math.random().toString(),
        title: enteredTitle.value.trim(),
        value: enteredPrice.value,
        date: pickedDate,
        category: selectedCategory.name,
      });

      onSetModalVisible(false);
    }
  };

  const [pickedDate, setPickedDate] = useState(new Date());

  return (
    <>
      <View style={{ marginHorizontal: 12 }}>
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
          // onChangeText={(enteredText) =>
          //   setEnteredPrice({
          //     value: checkIsNumberCorrect(enteredText),
          //     isValid: true,
          //   })
          // }
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

      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 16,
        }}
      >
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
            style={{ padding: 16 }}
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
});
