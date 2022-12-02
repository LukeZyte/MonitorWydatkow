import { Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";
import { useContext, useEffect, useRef } from "react";
import { ExpensesContext } from "../../../store/expensesContext";
import { PlannedAmountContext } from "../../../store/plannedAmountContext";
import CircularProgress, {
  CircularProgressBase,
  CircularProgressWithChild,
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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextUI
          style={{
            position: "absolute",
            fontSize: AppStyle.fontSize.huge,
            fontWeight: AppStyle.fontWeight.normal,
          }}
        >
          {`${summaryValue.toFixed(2)} zł`}
        </TextUI>
        {plannedAmount > 0 && plannedAmount >= summaryValue && thisMonth && (
          <CircularProgress
            radius={120}
            value={summaryValue}
            maxValue={plannedAmount}
            duration={1000}
            rotation={180}
            showProgressValue={false}
            inActiveStrokeColor={colors.bgPrimary}
            activeStrokeColor={colors.thirdPrimary}
            activeStrokeSecondaryColor={colors.secondPrimary}
            progressValueStyle={{
              fontSize: AppStyle.fontSize.huge,
              color: colors.text,
            }}
          />
        )}
        {plannedAmount > 0 && plannedAmount < summaryValue && thisMonth && (
          <CircularProgress
            radius={120}
            stroke
            value={summaryValue}
            maxValue={summaryValue}
            duration={1000}
            rotation={180}
            showProgressValue={false}
            inActiveStrokeColor={colors.bgPrimary}
            activeStrokeColor={colors.gradientWrongOne}
            activeStrokeSecondaryColor={colors.gradientWrongThree}
            progressValueStyle={{
              fontSize: AppStyle.fontSize.huge,
              color: colors.text,
            }}
          />
        )}
        {(plannedAmount === 0 || !thisMonth) && (
          // <View
          //   style={[
          //     styles.container,
          //     {
          //       backgroundColor: colors.bgPrimary,
          //       borderColor: colors.bgPrimary,
          //       borderBottomColor: colors.border,
          //     },
          //   ]}
          // >
          //   <TextUI style={styles.text}>{`${summaryValue.toFixed(2)} zł`}</TextUI>
          // </View>
          <CircularProgress
            radius={120}
            value={0}
            maxValue={10}
            rotation={180}
            showProgressValue={false}
            inActiveStrokeColor={colors.bgPrimary}
            activeStrokeColor={colors.thirdPrimary}
            activeStrokeSecondaryColor={colors.secondPrimary}
            progressValueStyle={{
              fontSize: AppStyle.fontSize.huge,
              color: colors.text,
            }}
          />
        )}
      </View>
      {plannedAmount > 0 && thisMonth && plannedAmount >= summaryValue && (
        <TextUI
          style={styles.plannedAmount}
        >{`Miesięczny budżet ${plannedAmount} zł`}</TextUI>
      )}
      {plannedAmount > 0 && thisMonth && plannedAmount < summaryValue && (
        <TextUI
          style={[styles.plannedAmount, { color: colors.wrong }]}
        >{`Miesięczny budżet ${plannedAmount} zł\nPrzekroczono`}</TextUI>
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
