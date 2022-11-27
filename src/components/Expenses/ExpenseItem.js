import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View, Alert, Platform } from "react-native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { ExpensesContext } from "../../../store/expensesContext";
import { getSimpleDate } from "../../constants/date";
import DeleteExpenseModal from "./DeleteExpenseModal";

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
  const isIOS = Platform.OS === "ios";

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
      icon = <Ionicons name="folder-open" size={iconSize} color="white" />;
      break;
    case "Transport":
      icon = <Ionicons name="car" size={iconSize} color="white" />;
      break;
    case "Odzież":
      icon = <Ionicons name="shirt" size={iconSize} color="white" />;
      break;
    case "Usługi":
      icon = <Ionicons name="cut" size={iconSize} color="white" />;
      break;
    case "Rachunki":
      icon = <Ionicons name="home" size={iconSize} color="white" />;
      break;
    case "Suplementy":
      //leaf
      //flash
      icon = <Ionicons name="barbell" size={iconSize} color="white" />;
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
    case "Usługi":
      categoryColor = AppStyle.categoriesColor.services;
      break;
    case "Rachunki":
      categoryColor = AppStyle.categoriesColor.bills;
      break;
    case "Suplementy":
      categoryColor = AppStyle.categoriesColor.supplements;
      break;
    case "Inne":
      categoryColor = AppStyle.categoriesColor.other;
      break;
  }

  const expensesCtx = useContext(ExpensesContext);

  const [showDeleteExpenseModal, setShowDeleteExpenseModal] = useState(false);

  const longPressHandler = (id) => {
    setShowDeleteExpenseModal(true);
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

  let summaryValue = 0;
  let sameDateBackwards = true;
  if (itemIndex < expensesCtx.expenses.length - 1) {
    if (
      new Date(date).toLocaleDateString() ===
      new Date(
        expensesCtx.expenses[parseInt(itemIndex) + 1].date
      ).toLocaleDateString()
    ) {
      sameDateBackwards = true;
    } else {
      sameDateBackwards = false;
      for (let index = 0; index < expensesCtx.expenses.length; index++) {
        if (
          new Date(expensesCtx.expenses[index].date).toDateString() ===
          new Date(date).toDateString()
        ) {
          summaryValue += parseFloat(expensesCtx.expenses[index].value);
        }
      }
    }
  } else {
    sameDateBackwards = false;
    for (let index = 0; index < expensesCtx.expenses.length; index++) {
      if (
        new Date(expensesCtx.expenses[index].date).toDateString() ===
        new Date(date).toDateString()
      ) {
        summaryValue += parseFloat(expensesCtx.expenses[index].value);
      }
    }
  }

  return (
    <>
      {showDeleteExpenseModal && (
        <DeleteExpenseModal
          onModalVisible={showDeleteExpenseModal}
          onSetModalVisible={setShowDeleteExpenseModal}
          title={title}
          value={value}
          category={category}
          id={id}
        />
      )}
      {withDatesSeparators && !sameDate && (
        <View
          style={[
            styles.dateSeparators,
            {
              backgroundColor: colors.bgPrimary,
              borderTopStartRadius: AppStyle.border.radius,
              borderTopEndRadius: AppStyle.border.radius,
            },
          ]}
        >
          <Ionicons name="calendar" size={16} color={colors.accent} />
          <TextUI style={[styles.dateSeparatorsText]}>
            {getSimpleDate(date)}
          </TextUI>
        </View>
      )}

      <View
        style={{
          borderBottomColor: colors.accent,
          backgroundColor: colors.bgPrimary,
          overflow: "hidden",
        }}
      >
        <Pressable
          onLongPress={() => longPressHandler(id)}
          android_ripple={{ color: colors.primary }}
          style={({ pressed }) =>
            pressed &&
            isIOS && { opacity: 0.5, backgroundColor: colors.primary }
          }
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

      {withDatesSeparators && !sameDateBackwards && (
        <View
          style={[
            styles.bottomOfPage,
            {
              backgroundColor: colors.bgPrimary,
            },
          ]}
        >
          <View
            style={[styles.dateBox, { backgroundColor: colors.background }]}
          >
            <TextUI
              style={[
                styles.addition,
                { color: colors.accent, marginRight: 8 },
              ]}
            >
              Suma:
            </TextUI>
            <TextUI style={[styles.addition, { color: colors.text }]}>
              {summaryValue.toFixed(2)}
            </TextUI>
          </View>
        </View>
      )}
    </>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    marginVertical: -1,
    paddingVertical: 4,
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
    paddingTop: 8,
    marginTop: 4,
    marginBottom: -1,
    borderTopStartRadius: AppStyle.border.radius,
    borderTopEndRadius: AppStyle.border.radius,
  },
  dateSeparatorsText: {
    fontSize: AppStyle.fontSize.normal,
    fontWeight: AppStyle.fontWeight.bold,
    paddingHorizontal: 8,
  },
  bottomOfPage: {
    borderBottomStartRadius: AppStyle.border.radius,
    borderBottomEndRadius: AppStyle.border.radius,
    marginBottom: 4,
    marginTop: -1,
  },
  dateBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: AppStyle.border.radius,
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  addition: {
    fontSize: AppStyle.fontSize.normal,
    fontWeight: AppStyle.fontWeight.bold,
  },
});
