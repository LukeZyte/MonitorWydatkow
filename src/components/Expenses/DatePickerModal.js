import ModalWindow from "../UI/ModalWindow";
import { Alert, Button, StyleSheet, View } from "react-native";
import TextUI from "../UI/TextUI";
import { AppStyle } from "../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getMonthName } from "../../constants/date";
import IconButton from "../UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import Input from "../UI/Input";

const DatePickerModal = ({
  selectedDate,
  setSelectedDate,
  datePickerVisible,
  setDatePickerVisible,
  fullDate,
}) => {
  const { colors } = useTheme();

  const thisYear = new Date().getFullYear();
  const [day, setDay] = useState(new Date(selectedDate).getDate().toString());
  const [month, setMonth] = useState(new Date(selectedDate).getMonth() + 1);
  const [year, setYear] = useState(new Date(selectedDate).getFullYear());

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const prevYearHandler = () => {
    if (year > 1) {
      setYear((prevState) => --prevState);
      setDay(1);
    }
  };
  const nextYearHandler = () => {
    if (year < thisYear) {
      setYear((prevState) => ++prevState);
      setDay(1);
    }
  };
  const prevMonthHandler = () => {
    if (month == 1) {
      setMonth(12);
      setDay(1);
    }
    if (month > 1) {
      setMonth((prevState) => --prevState);
      setDay(1);
    }
  };
  const nextMonthHandler = () => {
    if (month == 12) {
      setMonth(1);
      setDay(1);
    }
    if (month < 12) {
      setMonth((prevState) => ++prevState);
      setDay(1);
    }
  };
  const prevDayHandler = () => {
    if (day > 1) {
      setDay((prevState) => --prevState);
    }
  };
  const nextDayHandler = () => {
    if (day < daysInMonth(month, year)) {
      setDay((prevState) => ++prevState);
    }
  };

  const changeDayHandler = (enteredText) => {
    let newText = "";
    let numbers = "0123456789";

    // if (
    //   parseInt(newText) <= daysInMonth(month, year) &&
    //   parseInt(newText) > 0
    // ) {
    //   setDay(newText);
    // } else if (newText === "") {
    //   setDay("");
    // } else {
    //   setDay("1");
    // }

    for (var i = 0; i < enteredText.length; i++) {
      if (numbers.indexOf(enteredText[i]) > -1) {
        newText = newText + enteredText[i];
        if (
          parseInt(newText) <= daysInMonth(month, year) &&
          parseInt(newText) > 0
        ) {
          setDay(parseInt(newText));
        } else {
          setDay(1);
        }
      }
    }
  };

  useEffect(() => {
    const newDate = new Date(`${month}/${day}/${year}`);
    setSelectedDate(newDate);
  }, [year, month, day]);

  return (
    <ModalWindow
      onModalVisible={datePickerVisible}
      onSetModalVisible={setDatePickerVisible}
    >
      <View style={styles.container}>
        <TextUI style={styles.title}>Wybór daty</TextUI>
        {fullDate && (
          <TextUI
            style={{
              fontSize: AppStyle.fontSize.small,
              texAlign: "center",
              marginBottom: 8,
            }}
          >
            Dzień wprowadź na końcu! Inaczej jego wartość wróci do 1
          </TextUI>
        )}
        <View style={styles.slidersContainer}>
          <View style={styles.sliderBox}>
            <IconButton>
              <Ionicons
                name="arrow-back"
                size={20}
                color={colors.bgPrimary}
                style={{ padding: 8 }}
                onPress={prevYearHandler}
              />
            </IconButton>
            <TextUI style={[styles.text, { color: colors.accent }]}>
              {year}
            </TextUI>
            <IconButton>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={colors.bgPrimary}
                style={{ padding: 8 }}
                onPress={nextYearHandler}
              />
            </IconButton>
          </View>
          <View style={styles.sliderBox}>
            <IconButton>
              <Ionicons
                name="arrow-back"
                size={20}
                color={colors.bgPrimary}
                style={{ padding: 8 }}
                onPress={prevMonthHandler}
              />
            </IconButton>
            <TextUI style={styles.text}>{getMonthName(month)}</TextUI>
            <IconButton>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={colors.bgPrimary}
                style={{ padding: 8 }}
                onPress={nextMonthHandler}
              />
            </IconButton>
          </View>

          {fullDate && (
            <View style={styles.sliderBox}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <TextUI style={{ fontWeight: AppStyle.fontWeight.bold }}>
                  Dzień
                </TextUI>
                <Input
                  style={{ paddingHorizontal: 16, paddingVertical: 4 }}
                  value={day}
                  keyboardType="numeric"
                  onChangeText={changeDayHandler}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </ModalWindow>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    width: 360,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: AppStyle.fontSize.large,
    fontWeight: AppStyle.fontWeight.bold,
    marginBottom: 16,
    alignSelf: "center",
  },
  slidersContainer: {
    justifyContent: "center",
    width: 200,
  },
  sliderBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  text: {
    fontWeight: AppStyle.fontWeight.bold,
  },
});
