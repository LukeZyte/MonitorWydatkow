import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";
import IoniconTextButton from "../UI/IoniconTextButton";

const ExpensesDateDisplay = () => {
  const { colors } = useTheme();
  const iconSize = AppStyle.fontSize.large;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.display,
          { borderColor: colors.border, backgroundColor: colors.bgPrimary },
        ]}
      >
        {/* <TextUI style={[styles.text, { color: colors.accent }]}>
          Październik
        </TextUI> */}
        <IoniconTextButton
          icon="calendar"
          size={iconSize}
          color={colors.accent}
          textStyle={{ color: colors.accent }}
        >
          Październik
        </IoniconTextButton>
      </View>
    </View>
  );
};

export default ExpensesDateDisplay;

const styles = StyleSheet.create({
  container: {
    // marginTop: 8,
    // marginBottom: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  display: {
    // paddingVertical: 16,
    // paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: AppStyle.border.radius,
  },
  text: {
    fontWeight: AppStyle.fontWeight.normal,
  },
});
