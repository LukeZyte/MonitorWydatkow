import ModalWindow from "../../UI/ModalWindow";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import TextUI from "../../UI/TextUI";
import { AppStyle } from "../../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { getMonthName } from "../../../constants/date";
import IconButton from "../../UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import ArrowButton from "../../UI/ArrowButton";

const DatePickerModal = ({
  selectedDate,
  setSelectedDate,
  datePickerVisible,
  setDatePickerVisible,
}) => {
  const { colors } = useTheme();

  const thisYear = new Date().getFullYear();
  const [month, setMonth] = useState(new Date(selectedDate).getMonth() + 1);
  const [year, setYear] = useState(new Date(selectedDate).getFullYear());

  const navDateStageRef = useRef();

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

  const screenWidth = Dimensions.get("screen").width;

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
      setDatePickerVisible(false);
    }
  };

  useEffect(() => {
    const newDate = new Date(`${month}/${1}/${year}`);
    setSelectedDate(newDate);
  }, [year, month]);

  const navStageWidth = screenWidth - 96;

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

  return (
    <ModalWindow
      onModalVisible={datePickerVisible}
      onSetModalVisible={setDatePickerVisible}
      title="Wybór daty"
      closeOnTap
      style={[styles.rootContainer, { width: screenWidth - 80 }]}
    >
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={navDateStageRef}
      >
        {monthStage}
        {yearStage}
      </ScrollView>
      <View style={styles.bottomButtons}>
        {navStage === 1 && <TextUI></TextUI>}
        {navStage === 2 && (
          <TextUI style={styles.dateHint}>{getMonthName(month)}</TextUI>
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
