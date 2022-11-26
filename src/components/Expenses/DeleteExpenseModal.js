import { Dimensions, StyleSheet, View } from "react-native";
import ModalWindow from "../UI/ModalWindow";
import TextUI from "../UI/TextUI";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import IconButton from "../UI/IconButton";
import { AppStyle } from "../../constants/style";
import { useContext } from "react";
import { ExpensesContext } from "../../../store/expensesContext";

const DeleteExpenseModal = ({
  onModalVisible,
  onSetModalVisible,
  title,
  value,
  id,
  category,
}) => {
  const screenWidth = Dimensions.get("screen").width;
  const { colors } = useTheme();
  const expensesCtx = useContext(ExpensesContext);

  const iconSize = 32;
  let icon = <Ionicons name="shapes" size={iconSize} color="white" />;
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
    case "Inne":
      categoryColor = AppStyle.categoriesColor.other;
      break;
  }

  const submitHandler = () => {
    expensesCtx.deleteExpense(id);
    onSetModalVisible(false);
  };

  return (
    <ModalWindow
      title="Usuwanie wydatku"
      onModalVisible={onModalVisible}
      onSetModalVisible={onSetModalVisible}
      style={{ padding: 8, width: screenWidth - 20 }}
    >
      <View style={styles.container}>
        <TextUI style={styles.text}>
          Kliknij w kosz, aby usunąć poniższy wydatek lub zamknij okno aby
          anulować.
        </TextUI>
        <View style={styles.expenseContainer}>
          <View
            style={[
              styles.categoryContainer,
              { backgroundColor: categoryColor },
            ]}
          >
            {icon}
          </View>
          <View style={{ paddingHorizontal: 8 }}>
            <TextUI style={styles.expenseTitle}>{title.trim()}</TextUI>
            <TextUI style={[styles.expenseValue, { color: colors.accent }]}>
              {parseFloat(value).toFixed(2) + " zł"}
            </TextUI>
          </View>
        </View>
        <View style={styles.submitFooter}>
          <IconButton
            style={[styles.submitButton, { backgroundColor: colors.wrong }]}
            pressColor={colors.wrongDarker}
            onPress={submitHandler}
          >
            <Ionicons
              name="trash"
              size={28}
              color={colors.background}
              style={styles.submitIcon}
            />
          </IconButton>
        </View>
      </View>
    </ModalWindow>
  );
};

export default DeleteExpenseModal;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginBottom: 16,
    marginHorizontal: 12,
  },
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  categoryContainer: {
    padding: 16,
    marginHorizontal: 8,
    borderRadius: AppStyle.border.round,
  },
  expenseTitle: {
    fontSize: AppStyle.fontSize.large,
    fontWeight: AppStyle.fontWeight.bold,
  },
  expenseValue: {
    fontSize: AppStyle.fontSize.larger,
    fontWeight: AppStyle.fontWeight.bold,
  },
  submitIcon: {
    padding: 16,
  },
  submitButton: {
    alignSelf: "flex-end",
    marginHorizontal: 8,
  },
  submitFooter: {
    width: "100%",
  },
});
