import { StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../../constants/style";
import { getSimpleDate } from "../../../constants/date";
import { useState } from "react";
import IoniconTextButton from "../IoniconTextButton";
import FullDatePickerModal from "./FullDatePickerModal";

const FullDatePickerDisplay = ({ selectedDate, setSelectedDate, style }) => {
  const { colors } = useTheme();
  const isIOS = Platform.OS === "ios";

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <>
      {datePickerVisible && (
        <FullDatePickerModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          datePickerVisible={datePickerVisible}
          setDatePickerVisible={setDatePickerVisible}
        />
      )}

      <View
        style={[styles.display, { backgroundColor: colors.bgPrimary }, style]}
      >
        <IoniconTextButton
          icon="calendar"
          size={24}
          color={colors.accent}
          onPress={() => setDatePickerVisible(true)}
          // style={({ pressed }) => [pressed && isIOS && { opacity: 0.5 }]}
        >
          {getSimpleDate(selectedDate)}
        </IoniconTextButton>
      </View>
    </>
  );
};

export default FullDatePickerDisplay;

const styles = StyleSheet.create({
  display: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: AppStyle.border.radius,
  },
});
