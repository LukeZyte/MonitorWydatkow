import ModalWindow from "../../UI/ModalWindow";
import { Dimensions, StyleSheet, View } from "react-native";
import TextUI from "../../UI/TextUI";
import Input from "../../UI/Input";
import { useContext, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../../../../store/themeContext";
import { AppStyle } from "../../../constants/style";
import IconButton from "../../UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { PlannedAmountContext } from "../../../../store/plannedAmountContext";

const PlannedAmountModal = ({ onModalVisible, onSetModalVisible }) => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const { colors } = useTheme();
  const { isDarkTheme } = useContext(ThemeContext);
  const { setPlannedAmount, plannedAmount } = useContext(PlannedAmountContext);

  const [enteredPrice, setEnteredPrice] = useState({
    value: plannedAmount ? plannedAmount : null,
    isValid: true,
  });

  const submitHandler = () => {
    if (!enteredPrice.value || enteredPrice.value === ".") {
      setEnteredPrice({ value: null, isValid: true });
      setPlannedAmount(0);
      onSetModalVisible(false);
      return;
    }
    setPlannedAmount(parseFloat(enteredPrice.value));
    onSetModalVisible(false);
  };

  return (
    <ModalWindow
      title="Wprowadź kwotę"
      onModalVisible={onModalVisible}
      onSetModalVisible={onSetModalVisible}
      style={{ width: screenWidth - 40, padding: 4 }}
    >
      <TextUI style={styles.label}>Kwota budżetu na miesiąc</TextUI>
      <View style={styles.container}>
        <View style={styles.priceCurrencyText} />
        <Input
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
          placeholder="Kwota"
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
        <View style={styles.priceCurrencyText}>
          <TextUI style={styles.priceCurrencyText}>zł</TextUI>
        </View>
      </View>
      <View style={styles.bottomButtons}>
        <IconButton onPress={submitHandler} style={styles.submitButton}>
          <Ionicons
            name="checkmark"
            size={32}
            color={colors.background}
            style={styles.submitIcon}
          />
        </IconButton>
      </View>
    </ModalWindow>
  );
};

export default PlannedAmountModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "center",
    marginBottom: 4,
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
    height: 40,
    width: 24,
    marginLeft: 4,
    justifyContent: "center",
    alignSelf: "center",
    fontSize: AppStyle.fontSize.large,
    fontWeight: AppStyle.fontWeight.bold,
  },
  centerLabel: { textAlign: "center" },
  bottomButtons: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  submitIcon: {
    padding: 16,
  },
  submitButton: {
    marginHorizontal: 12,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
