import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";
import TextUI from "../UI/TextUI";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useContext } from "react";
import { ExpensesContext } from "../../../store/expensesContext";

const ExpenseItem = ({ id, title, value, date, category }) => {
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
    expensesCtx.deleteExpense(id);
  };

  return (
    <Pressable onLongPress={() => longPressHandler(id)}>
      <View
        style={[
          styles.container,
          {
            borderBottomColor: colors.accent,
            backgroundColor: colors.bgPrimary,
          },
        ]}
      >
        <View
          style={{
            backgroundColor: categoryColor,
            padding: 6,
            marginVertical: 6,
            marginHorizontal: 6,
            borderRadius: AppStyle.border.round,
          }}
        >
          {icon}
        </View>
        <TextUI style={{ flex: 3 }}>{title}</TextUI>
        <TextUI style={[styles.value, { color: colors.accent }]}>
          {`${parseFloat(value).toFixed(2)} zł`}
        </TextUI>
      </View>
    </Pressable>
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
    borderRadius: AppStyle.border.radius,
  },
  value: {
    fontWeight: AppStyle.fontWeight.bold,
    flex: 1,
    textAlign: "right",
  },
});
