import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import IconButton from "../UI/IconButton";
import Input from "../UI/Input";
import { AppStyle } from "../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";

const AddExpenseForm = () => {
  const { colors } = useTheme();

  const [enteredPrice, setEnteredPrice] = useState({
    value: null,
    isValid: true,
  });
  const [enteredTitle, setEnteredTitle] = useState({
    value: "",
    isValid: true,
  });

  const submitHandler = () => {
    if (!enteredPrice.value) {
      setEnteredPrice({ value: null, isValid: false });
    }
    if (enteredTitle.value.trim().length === 0) {
      setEnteredTitle({ value: "", isValid: false });
    }
    let priceOK = true;
    let titleOK = true;

    let formOK = priceOK && titleOK;
  };

  return (
    <>
      <View style={{ marginHorizontal: 12, marginBottom: 32 }}>
        <Input
          label="Koszt wydatku"
          keyboardType="number-pad"
          style={[
            styles.priceInput,
            !enteredPrice.isValid && {
              borderColor: colors.wrong,
              color: colors.wrong,
            },
          ]}
          placeholder="0.00..."
          placeholderTextColor={!enteredPrice.isValid && colors.wrong}
          onChangeText={(enteredText) =>
            setEnteredPrice({ value: enteredText, isValid: true })
          }
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
