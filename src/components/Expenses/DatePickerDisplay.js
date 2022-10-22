import { StyleSheet, View, Pressable, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import { getMonthName, getSimpleDate } from "../../constants/date";
import { useState } from "react";
import DatePickerModal from "./DatePickerModal";
import { Ionicons } from "@expo/vector-icons";
import TextUI from "../UI/TextUI";
import IoniconTextButton from "../UI/IoniconTextButton";

const DatePickerDisplay = ({ selectedDate, setSelectedDate, fullDate }) => {
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

      <View style={[styles.display, { backgroundColor: colors.bgPrimary }]}>
        {/* <Pressable
          onPress={() => setDatePickerVisible(true)}
          style={({ pressed }) => [
            styles.pressable,
            pressed && isIOS && { opacity: 0.5 },
          ]}
          android_ripple={{ color: colors.secondBgPrimary }}
        >
          <View style={styles.icon}>
            <Ionicons name="calendar" size={24} color={colors.accent} />
          </View>
          <View style={styles.date}>
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
            {fullDate && (
              <TextUI
                style={{
                  color: colors.text,
                  fontWeight: AppStyle.fontWeight.bold,
                }}
              >
                {getSimpleDate(selectedDate)}
              </TextUI>
            )}
          </View>
        </Pressable> */}
        <IoniconTextButton
          // iconStyle={{ paddingRight: 10 }}
          fitBorders={!fullDate}
          icon="calendar"
          size={24}
          color={colors.accent}
          onPress={() => setDatePickerVisible(true)}
          style={({ pressed }) => [
            // styles.pressable,
            pressed && isIOS && { opacity: 0.5 },
          ]}
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
    // width: 160,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden",
    borderRadius: AppStyle.border.radius,
  },
  dateText: {
    fontSize: AppStyle.fontSize.medium,
    fontWeight: AppStyle.fontWeight.bold,
  },
  text: {
    fontWeight: AppStyle.fontWeight.normal,
  },
  pressable: {
    // overflow: "hidden",
    // flexDirection: "row",
    // paddingHorizontal: 8,
    // paddingVertical: 8,
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
