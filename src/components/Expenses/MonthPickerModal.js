import ModalWindow from "../UI/ModalWindow";
import { Alert, Button, StyleSheet, View } from "react-native";
import TextUI from "../UI/TextUI";
import { AppStyle } from "../../constants/style";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getMonthName } from "../../constants/date";
import IconButton from "../UI/IconButton";
import { Ionicons } from "@expo/vector-icons";

const MonthPickerModal = ({
  selectedDate,
  setSelectedDate,
  datePickerVisible,
  setDatePickerVisible,
}) => {
  const { colors } = useTheme();

  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(new Date(selectedDate).getFullYear());
  const [month, setMonth] = useState(new Date(selectedDate).getMonth() + 1);

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

  useEffect(() => {
    const newDate = new Date(`${month}/1/${year}`);
    setSelectedDate(newDate);
  }, [year, month]);

  return (
    <ModalWindow
      onModalVisible={datePickerVisible}
      onSetModalVisible={setDatePickerVisible}
    >
      <View style={styles.container}>
        <TextUI style={styles.title}>Wybierz miesiąc i rok</TextUI>
        <View style={styles.slidersContainer}>
          <View style={styles.sliderBox}>
            {/* <Button title="<<" onPress={prevYearHandler} /> */}
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
            {/* <Button title=">>" onPress={nextYearHandler} /> */}
          </View>
          <View style={styles.sliderBox}>
            {/* <Button title="<<" onPress={prevMonthHandler} /> */}
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
            {/* <Button title=">>" onPress={nextMonthHandler} /> */}
          </View>
        </View>
      </View>
    </ModalWindow>
  );
};

export default MonthPickerModal;

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
