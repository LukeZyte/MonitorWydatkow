import { StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import { getMonthName, getSimpleDate } from "../../constants/date";
import { useState } from "react";
import DatePickerModal from "./DatePickerModal";
import TextUI from "../UI/TextUI";
import IoniconTextButton from "../UI/IoniconTextButton";

const DatePickerDisplay = ({
  selectedDate,
  setSelectedDate,
  fullDate,
  style,
}) => {
  const { colors } = useTheme();
  const isIOS = Platform.OS === "ios";

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <>
      {datePickerVisible && (
        <DatePickerModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          datePickerVisible={datePickerVisible}
          setDatePickerVisible={setDatePickerVisible}
          fullDate={fullDate}
        />
      )}

      <View
        style={[styles.display, { backgroundColor: colors.bgPrimary }, style]}
      >
        <IoniconTextButton
          fitBorders={!fullDate}
          icon="calendar"
          size={24}
          color={colors.accent}
          onPress={() => setDatePickerVisible(true)}
          // style={({ pressed }) => [pressed && isIOS && { opacity: 0.5 }]}
        >
          {fullDate && getSimpleDate(selectedDate)}
          {!fullDate && (
            <View style={styles.dateContainer}>
              <TextUI style={[styles.dateText, { color: colors.accent }]}>
                {new Date(selectedDate).getFullYear()}
              </TextUI>
              <TextUI style={[styles.dateText]}>
                {getMonthName(new Date(selectedDate).getMonth() + 1)}
              </TextUI>
            </View>
          )}
        </IoniconTextButton>
      </View>
    </>
  );
};

export default DatePickerDisplay;

const styles = StyleSheet.create({
  display: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: AppStyle.border.radius,
  },
  dateText: {
    fontSize: AppStyle.fontSize.medium,
    fontWeight: AppStyle.fontWeight.bold,
  },
  text: {
    fontWeight: AppStyle.fontWeight.normal,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  date: {
    flex: 2,
    alignItems: "center",
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
