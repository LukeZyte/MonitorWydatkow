import ModalWindow from "../ModalWindow";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import TextUI from "../TextUI";
import { AppStyle } from "../../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import { getMonthName } from "../../../constants/date";
import IconButton from "../IconButton";
import { Ionicons } from "@expo/vector-icons";
import Input from "../Input";
import { ThemeContext } from "../../../../store/themeContext";
import ArrowButton from "../ArrowButton";

const FullDatePickerModal = ({
  selectedDate,
  setSelectedDate,
  datePickerVisible,
  setDatePickerVisible,
}) => {
  const { colors } = useTheme();
  const { isDarkTheme } = useContext(ThemeContext);
  const screenWidth = Dimensions.get("screen").width;

  const thisYear = new Date().getFullYear();
  const [month, setMonth] = useState(new Date(selectedDate).getMonth() + 1);
  const [year, setYear] = useState(new Date(selectedDate).getFullYear());

  const [dayInput, setDayInput] = useState({
    value: new Date(selectedDate).getDate().toString(),
    isValid: true,
  });

  const navDateStageRef = useRef();

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

  const [navStage, setNavStage] = useState(1);

  const nextHandler = () => {
    if (navStage === 1) {
      navDateStageRef.current.scrollTo({
        x: navStageWidth,
        animated: true,
      });
      setNavStage(2);
    }

    if (navStage === 2) {
      navDateStageRef.current.scrollTo({
        x: navStageWidth * 2,
        animated: true,
      });
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

  const navStageWidth = screenWidth - 96;

  const yearStage = (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: navStageWidth,
      }}
    >
      <TextUI>Rok</TextUI>
      <View style={styles.sliderBox}>
        <ArrowButton direction="left" onPress={prevYearHandler} />
        <TextUI style={[styles.text, { color: colors.accent, width: "50%" }]}>
          {year}
        </TextUI>
        <ArrowButton direction="right" onPress={nextYearHandler} />
      </View>
    </View>
  );

  const monthStage = (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: navStageWidth,
      }}
    >
      <TextUI>Miesiąc</TextUI>
      <View style={styles.sliderBox}>
        <ArrowButton direction="left" onPress={prevMonthHandler} />
        <TextUI
          style={[
            styles.text,
            {
              color: colors.accent,
              width: "50%",
              fontSize: AppStyle.fontSize.larger,
            },
          ]}
        >
          {getMonthName(month)}
        </TextUI>
        <ArrowButton direction="right" onPress={nextMonthHandler} />
      </View>
    </View>
  );

  const dayStage = (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: navStageWidth,
      }}
    >
      <TextUI>Dzień</TextUI>
      <View style={styles.sliderBox}>
        <Input
          style={[
            styles.dayText,
            isDarkTheme && {
              backgroundColor: colors.background,
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
    </View>
  );

  return (
    <ModalWindow
      onModalVisible={datePickerVisible}
      onSetModalVisible={setDatePickerVisible}
      closeOnTap
      title="Wybór daty"
      style={[styles.rootContainer, { width: screenWidth - 80 }]}
    >
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={navDateStageRef}
      >
        {yearStage}
        {monthStage}
        {dayStage}
      </ScrollView>
      <View style={styles.bottomButtons}>
        {navStage === 1 && <TextUI></TextUI>}
        {navStage === 2 && <TextUI style={styles.dateHint}>{year}</TextUI>}
        {navStage === 3 && (
          <TextUI style={styles.dateHint}>
            {year} - {getMonthName(month)}
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

          {navStage === 2 && (
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

export default FullDatePickerModal;

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
    // justifyContent: "center",
    // alignItems: "center",
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
