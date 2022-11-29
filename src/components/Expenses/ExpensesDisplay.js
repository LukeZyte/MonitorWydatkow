import { Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";
import { useContext, useEffect, useRef } from "react";
import { ExpensesContext } from "../../../store/expensesContext";
import { PlannedAmountContext } from "../../../store/plannedAmountContext";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";

const ExpensesDisplay = ({ selectedDate, setSelectedDate }) => {
  const { colors } = useTheme();
  const { expenses } = useContext(ExpensesContext);
  const { plannedAmount } = useContext(PlannedAmountContext);

  let summaryValue = 0;

  const thisMonth =
    new Date(selectedDate).getFullYear() === new Date().getFullYear() &&
    new Date(selectedDate).getMonth() === new Date().getMonth();

  for (let index = 0; index < expenses.length; index++) {
    if (
      new Date(expenses[index].date).getFullYear() ===
        new Date(selectedDate).getFullYear() &&
      new Date(expenses[index].date).getMonth() ===
        new Date(selectedDate).getMonth()
    ) {
      summaryValue += parseFloat(expenses[index].value);
    }
  }
  summaryValue = parseFloat(summaryValue.toFixed(2));

  return (
    <>
      {plannedAmount > 0 && plannedAmount > summaryValue && thisMonth && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <CircularProgress
            radius={120}
            value={summaryValue}
            maxValue={plannedAmount}
            duration={1000}
            rotation={180}
            textColor={colors.text}
            fontSize={AppStyle.fontSize.large}
            // title="zł"
            // titleColor={colors.text}
            // titleStyle={{
            // fontSize: AppStyle.fontSize.larger,
            // fontWeight: AppStyle.fontWeight.bold,
            // }}
            valueSuffix={" zł"}
            inActiveStrokeColor={colors.bgPrimary}
            activeStrokeColor={colors.thirdPrimary}
            activeStrokeSecondaryColor={colors.secondPrimary}
            progressValueStyle={{
              fontSize: AppStyle.fontSize.huge,
              color: colors.text,
            }}
            progressFormatter={(value) => {
              "worklet";
              return value.toFixed(2); // 2 decimal places
            }}
          />
        </View>
      )}
      {plannedAmount > 0 && plannedAmount <= summaryValue && thisMonth && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <CircularProgress
            radius={120}
            value={summaryValue}
            maxValue={summaryValue}
            duration={1000}
            rotation={180}
            textColor={colors.text}
            fontSize={AppStyle.fontSize.large}
            // title="zł"
            // titleColor={colors.text}
            // titleStyle={{
            // fontSize: AppStyle.fontSize.larger,
            // fontWeight: AppStyle.fontWeight.bold,
            // }}
            valueSuffix={" zł"}
            inActiveStrokeColor={colors.bgPrimary}
            activeStrokeColor={colors.wrong}
            activeStrokeSecondaryColor={colors.wrong}
            progressValueStyle={{
              fontSize: AppStyle.fontSize.huge,
              color: colors.text,
            }}
            progressFormatter={(value) => {
              "worklet";
              return value.toFixed(2); // 2 decimal places
            }}
          />
        </View>
      )}
      {plannedAmount > 0 && thisMonth && (
        <TextUI
          style={styles.plannedAmount}
        >{`Miesięczny budżet ${plannedAmount} zł`}</TextUI>
      )}
      {(plannedAmount === 0 || !thisMonth) && (
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.bgPrimary,
              borderColor: colors.bgPrimary,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <TextUI style={styles.text}>{`${summaryValue.toFixed(2)} zł`}</TextUI>
        </View>
      )}
    </>
  );
};

export default ExpensesDisplay;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: AppStyle.border.round,
    borderLeftWidth: 0.1,
    borderRightWidth: 0.1,
    borderTopWidth: 0,
    borderBottomWidth: 4,
    marginBottom: 4,
    minWidth: 240,
    minHeight: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: AppStyle.fontSize.huge,
    fontWeight: AppStyle.fontWeight.bold,
  },
  plannedAmount: {
    textAlign: "center",
    marginVertical: 8,
    fontWeight: AppStyle.fontWeight.bold,
  },
});
