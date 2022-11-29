import { createContext, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PlannedAmountContext = createContext({
  plannedAmount: null,
  setPlannedAmount: (amount) => {},
});

const PlannedAmountContextProvider = ({ children }) => {
  const [plannedAmount, setAmount] = useState(0);

  // Validation
  const setPlannedAmount = (amount) => {
    if (isNaN(amount)) {
      console.log("Invalid amount! not a number");
      return;
    }

    const amountStr = amount.toString();
    const legalChars = "1234567890.";
    let numberOfDots = 0;
    for (let i in amountStr) {
      let correctChar = false;
      for (let j in legalChars) {
        if (amountStr[i].includes(legalChars[j])) {
          correctChar = true;
          break;
        }
      }
      if (!correctChar) {
        console.log("Invalid amount! unexpected character found");
        return;
      }

      if (numberOfDots === 1 && amountStr[i] === 1) {
        console.log("Invalid amount! not a number (more than one dot found)");
        return;
      }

      if (amountStr[i] === ".") {
        numberOfDots++;

        if (amountStr.length - i > 3) {
          console.log("Invalid amount! more than 2 digits after a dot");
          return;
        }
      }
    }
    setAmount(amount);
    setPlannedAmountStore(amount);
  };

  const getPlannedAmountFromStore = async () => {
    try {
      const result = await AsyncStorage.getItem("plannedAmountKey");
      if (result) {
        setPlannedAmount(JSON.parse(result));
      } else {
        setPlannedAmount(0);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const setPlannedAmountStore = async (data) => {
    try {
      await AsyncStorage.setItem("plannedAmountKey", JSON.stringify(data));
    } catch (error) {
      Alert.alert(error);
    }
  };

  useLayoutEffect(() => {
    getPlannedAmountFromStore();
  }, []);

  value = {
    plannedAmount: plannedAmount,
    setPlannedAmount: setPlannedAmount,
  };

  return (
    <PlannedAmountContext.Provider value={value}>
      {children}
    </PlannedAmountContext.Provider>
  );
};

export default PlannedAmountContextProvider;
