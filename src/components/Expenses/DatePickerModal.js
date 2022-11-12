import ModalWindow from "../UI/ModalWindow";
import { Alert, Button, Dimensions, StyleSheet, View } from "react-native";
import TextUI from "../UI/TextUI";
import { AppStyle } from "../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { getMonthName } from "../../constants/date";
import IconButton from "../UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import Input from "../UI/Input";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../../../store/themeContext";

const DatePickerModal = ({
  selectedDate,
  setSelectedDate,
  datePickerVisible,
  setDatePickerVisible,
  fullDate,
}) => {
  const { colors } = useTheme();
  const { isDarkTheme } = useContext(ThemeContext);

  const thisYear = new Date().getFullYear();
  const [day, setDay] = useState(new Date(selectedDate).getDate());
  const [month, setMonth] = useState(new Date(selectedDate).getMonth() + 1);
  const [year, setYear] = useState(new Date(selectedDate).getFullYear());

  const [dayInput, setDayInput] = useState({
    value: new Date(selectedDate).getDate().toString(),
    isValid: true,
  });

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const prevYearHandler = () => {
    if (year > 1) {
      setYear((prevState) => --prevState);
    }
  };
  const nextYearHandler = () => {
    if (year < thisYear) {
      setYear((prevState) => ++prevState);
    }
  };
  const prevMonthHandler = () => {
    if (month == 1) {
      setMonth(12);
    }
    if (month > 1) {
      setMonth((prevState) => --prevState);
    }
  };
  const nextMonthHandler = () => {
    if (month == 12) {
      setMonth(1);
    }
    if (month < 12) {
      setMonth((prevState) => ++prevState);
    }
  };

  const dayInputHandler = (enteredText) => {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < enteredText.length; i++) {
      if (numbers.indexOf(enteredText[i]) > -1) {
        newText = newText + enteredText[i];
      }
    }
    setDayInput({ value: newText, isValid: true });
  };

  const screenWidth = Dimensions.get("screen").width;

  const [navStage, setNavStage] = useState(1);

  const nextHandler = () => {
    if (navStage === 1) {
      setNavStage(2);
    }
    if (navStage === 2 && !fullDate) {
      setDatePickerVisible(false);
    }
    if (navStage === 2 && fullDate) {
      setNavStage(3);
    }
    if (navStage === 3) {
      if (
        parseInt(dayInput.value) <= daysInMonth(month, year) &&
        parseInt(dayInput.value) > 0
      ) {
        const newDate = new Date(`${month}/${dayInput.value}/${year}`);
        setSelectedDate(newDate);
        setDatePickerVisible(false);
      } else {
        setDayInput((prevState) => {
          return { value: prevState.value, isValid: false };
        });
      }
    }
  };

  useEffect(() => {
    const newDate = new Date(`${month}/${day}/${year}`);
    setSelectedDate(newDate);
  }, [year, month]);

  const [viewWidth, setViewWidth] = useState(0);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  const yearStage = (
    <>
      <TextUI>Rok</TextUI>
      <View style={styles.sliderBox}>
        <IconButton style={styles.sliderIconContainer}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={32}
            color={colors.text}
            style={[styles.sliderIcon, { backgroundColor: colors.modal }]}
            onPress={prevYearHandler}
          />
        </IconButton>
        <TextUI
          style={[styles.text, { color: colors.accent, width: viewWidth / 2 }]}
        >
          {year}
        </TextUI>
        <IconButton style={styles.sliderIconContainer}>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={32}
            color={colors.text}
            style={[styles.sliderIcon, { backgroundColor: colors.modal }]}
            onPress={nextYearHandler}
          />
        </IconButton>
      </View>
    </>
  );

  const monthStage = (
    <>
      <TextUI>Miesiąc</TextUI>
      <View style={styles.sliderBox}>
        <IconButton style={styles.sliderIconContainer}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={32}
            color={colors.text}
            style={[styles.sliderIcon, { backgroundColor: colors.modal }]}
            onPress={prevMonthHandler}
          />
        </IconButton>
        <TextUI
          style={[
            styles.text,
            {
              color: colors.accent,
              width: viewWidth / 2,
              fontSize: AppStyle.fontSize.larger,
            },
          ]}
        >
          {getMonthName(month)}
        </TextUI>
        <IconButton style={styles.sliderIconContainer}>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={32}
            color={colors.text}
            style={[styles.sliderIcon, { backgroundColor: colors.modal }]}
            onPress={nextMonthHandler}
          />
        </IconButton>
      </View>
    </>
  );

  const dayStage = (
    <>
      <TextUI>Dzień</TextUI>
      <View style={styles.sliderBox}>
        <Input
          style={[
            styles.dayText,
            isDarkTheme && {
              backgroundColor: colors.background,
              // borderColor: colors.background,
            },
            !dayInput.isValid && {
              color: colors.wrong,
              borderColor: colors.wrong,
            },
          ]}
          value={dayInput.value}
          keyboardType="numeric"
          onChangeText={dayInputHandler}
        />
      </View>
    </>
  );

  return (
    <ModalWindow
      onModalVisible={datePickerVisible}
      onSetModalVisible={setDatePickerVisible}
      title="Wybór daty"
      style={[styles.rootContainer, { width: screenWidth - 80 }]}
    >
      <View style={styles.container} onLayout={onLayout}>
        {navStage === 1 && yearStage}
        {navStage === 2 && monthStage}
        {navStage === 3 && dayStage}
      </View>
      <View style={styles.bottomButtons}>
        {navStage === 1 && <TextUI></TextUI>}
        {navStage === 2 && <TextUI style={styles.dateHint}>{year}</TextUI>}
        {navStage === 3 && (
          <TextUI style={styles.dateHint}>
            {year} - {month}
          </TextUI>
        )}
        <IconButton onPress={nextHandler} style={styles.submitButton}>
          {navStage === 1 && (
            <Ionicons
              name="md-arrow-forward"
              size={32}
              color={colors.background}
              style={styles.submitIcon}
            />
          )}
          {navStage === 2 && !fullDate && (
            <Ionicons
              name="checkmark"
              size={32}
              color={colors.background}
              style={styles.submitIcon}
            />
          )}
          {navStage === 2 && fullDate && (
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
    </ModalWindow>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 8,
    justifyContent: "space-between",
  },
  container: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  slidersContainer: {
    justifyContent: "center",
    width: 200,
  },
  sliderBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sliderIcon: {
    padding: 8,
  },
  sliderIconContainer: {
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: AppStyle.fontWeight.bold,
    fontSize: AppStyle.fontSize.huge,
    marginHorizontal: 24,
    textAlign: "center",
  },
  dayText: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    texAlign: "center",
    borderRadius: AppStyle.border.round,
    fontSize: AppStyle.fontSize.larger,
    fontWeight: AppStyle.fontWeight.bold,
    borderWidth: 1,
  },
  warning: {
    fontSize: AppStyle.fontSize.small,
    texAlign: "center",
    marginBottom: 8,
  },

  dayInput: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignSelf: "center",
  },
  dateHint: {
    marginHorizontal: 16,
    fontWeight: AppStyle.fontWeight.bold,
  },
  submitIcon: {
    padding: 16,
  },
  submitButton: {},
  bottomButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
});
