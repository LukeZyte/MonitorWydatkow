import { StyleSheet, View, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import { getMonthName } from "../../constants/date";
import IoniconTextButton from "../UI/IoniconTextButton";
import { useState } from "react";
import MonthPickerModal from "./MonthPickerModal";
import { Ionicons } from "@expo/vector-icons";
import TextUI from "../UI/TextUI";

const ExpensesDateDisplay = ({ selectedDate, setSelectedDate }) => {
  const { colors } = useTheme();
  const iconSize = AppStyle.fontSize.large;

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <>
      {datePickerVisible && (
        <MonthPickerModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          datePickerVisible={datePickerVisible}
          setDatePickerVisible={setDatePickerVisible}
        />
      )}

      <View
        style={[
          styles.display,
          { borderColor: colors.border, backgroundColor: colors.bgPrimary },
        ]}
      >
        <Pressable
          onPress={() => setDatePickerVisible(true)}
          style={{
            overflow: "hidden",
            flexDirection: "row",
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
          android_ripple={{ color: colors.secondBgPrimary }}
        >
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Ionicons name="calendar" size={24} color={colors.accent} />
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextUI style={[styles.dateText, { color: colors.accent }]}>
                {new Date(selectedDate).getFullYear()}
              </TextUI>
              <TextUI style={[styles.dateText]}>
                {getMonthName(new Date(selectedDate).getMonth() + 1)}
              </TextUI>
            </View>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default ExpensesDateDisplay;

const styles = StyleSheet.create({
  // container: {
  //   // marginTop: 8,
  //   // marginBottom: 8,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  display: {
    width: 160,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: AppStyle.border.radius,
  },
  dateText: {
    fontSize: AppStyle.fontSize.medium,
    fontWeight: AppStyle.fontWeight.bold,
  },
  text: {
    fontWeight: AppStyle.fontWeight.normal,
  },
});
