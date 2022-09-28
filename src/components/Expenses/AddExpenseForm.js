import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import IconButton from "../UI/IconButton";
import Input from "../UI/Input";
import { AppStyle } from "../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { ExpensesContext } from "../../../store/expensesContext";

const AddExpenseForm = ({ onSetModalVisible }) => {
  const { colors } = useTheme();
  const expensesCtx = useContext(ExpensesContext);

  const [enteredPrice, setEnteredPrice] = useState({
    value: null,
    isValid: true,
  });
  const [enteredTitle, setEnteredTitle] = useState({
    value: "",
    isValid: true,
  });

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
        title: enteredTitle.value,
        value: enteredPrice.value,
        date: new Date(),
      });

      onSetModalVisible(false);
    }
  };

  return (
    <>
      <View style={{ marginHorizontal: 12, marginBottom: 32 }}>
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
          placeholder="0.00..."
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
      <IconButton onPress={submitHandler}>
        <Ionicons name="checkmark-sharp" size={32} color={colors.background} />
      </IconButton>
    </>
  );
};

export default AddExpenseForm;

const styles = StyleSheet.create({
  priceInput: {
    textAlign: "center",
    fontWeight: AppStyle.fontWeight.bold,
    fontSize: AppStyle.fontSize.huge,
  },
  titleInput: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
