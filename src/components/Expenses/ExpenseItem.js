import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useContext } from "react";
import { ExpensesContext } from "../../../store/expensesContext";
import { getSimpleDate } from "../../constants/date";

const ExpenseItem = ({
  id,
  title,
  value,
  date,
  category,
  itemIndex,
  withDatesSeparators,
}) => {
  const { colors } = useTheme();

  const iconSize = 16;
  let icon = <Ionicons name="fast-food" size={iconSize} color="white" />;

  switch (category) {
    case "Spożywcze":
      icon = <Ionicons name="fast-food" size={iconSize} color="white" />;
      break;
    case "Używki":
      icon = <Ionicons name="beer" size={iconSize} color="white" />;
      break;
    case "Osobiste":
      icon = <Ionicons name="game-controller" size={iconSize} color="white" />;
      break;
    case "Transport":
      icon = <Ionicons name="car" size={iconSize} color="white" />;
      break;
    case "Odzież":
      icon = <Ionicons name="shirt" size={iconSize} color="white" />;
      break;
    case "Inne":
      icon = <Ionicons name="shapes" size={iconSize} color="white" />;
      break;
  }

  let categoryColor = AppStyle.categoriesColor.other;
  switch (category) {
    case "Spożywcze":
      categoryColor = AppStyle.categoriesColor.food;
      break;
    case "Używki":
      categoryColor = AppStyle.categoriesColor.drugs;
      break;
    case "Osobiste":
      categoryColor = AppStyle.categoriesColor.personal;
      break;
    case "Transport":
      categoryColor = AppStyle.categoriesColor.transport;
      break;
    case "Odzież":
      categoryColor = AppStyle.categoriesColor.clothes;
      break;
    case "Inne":
      categoryColor = AppStyle.categoriesColor.other;
      break;
  }

  const expensesCtx = useContext(ExpensesContext);

  const longPressHandler = (id) => {
    Alert.alert(
      `Usunąć ${title} za ${value}`,
      "Potwierdzenie usunie wybrany rekord z bazy",
      [
        {
          text: "Anuluj",
        },
        {
          text: "Potwierdź",
          onPress: () => expensesCtx.deleteExpense(id),
        },
      ]
    );
  };

  let sameDate = true;

  if (itemIndex > 0) {
    if (
      new Date(date).toLocaleDateString() ===
      new Date(
        expensesCtx.expenses[parseInt(itemIndex) - 1].date
      ).toLocaleDateString()
    ) {
      sameDate = true;
    } else {
      sameDate = false;
    }
  } else {
    sameDate = false;
  }

  // Alert.alert(sameDate.toString());

  return (
    <>
      {withDatesSeparators && !sameDate && (
        <View style={styles.dateSeparators}>
          <Ionicons name="caret-down" size={20} color={colors.primary} />
          <TextUI style={[styles.dateSeparatorsText, { color: colors.border }]}>
            {getSimpleDate(date)}
          </TextUI>
        </View>
      )}

      <View
        style={{
          borderBottomColor: colors.accent,
          backgroundColor: colors.bgPrimary,
          borderRadius: AppStyle.border.radius,
          overflow: "hidden",
        }}
      >
        <Pressable
          onLongPress={() => longPressHandler(id)}
          android_ripple={{ color: colors.primary }}
        >
          <View style={[styles.container]}>
            <View
              style={[
                styles.icon,
                {
                  backgroundColor: categoryColor,
                },
              ]}
            >
              {icon}
            </View>
            <View style={styles.titleDate}>
              <TextUI>{title}</TextUI>
              <TextUI style={[styles.date, { color: colors.accent }]}>
                {getSimpleDate(date)}
              </TextUI>
            </View>
            <TextUI style={[styles.value, { color: colors.accent }]}>
              {`${parseFloat(value).toFixed(2)} zł`}
            </TextUI>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: 8,
    paddingRight: 16,
    marginVertical: 2,
    // borderWidth: 1,
  },
  icon: {
    padding: 6,
    marginVertical: 6,
    marginHorizontal: 6,
    borderRadius: AppStyle.border.round,
  },
  value: {
    fontWeight: AppStyle.fontWeight.bold,
    flex: 1,
    textAlign: "right",
  },
  titleDate: {
    justifyContent: "center",
    flex: 3,
  },
  date: {
    fontSize: AppStyle.fontSize.tiny,
  },
  dateSeparators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    marginVertical: 4,
  },
  dateSeparatorsText: {
    fontSize: AppStyle.fontSize.normal,
    fontWeight: AppStyle.fontWeight.bold,
    marginHorizontal: 8,
  },
});
