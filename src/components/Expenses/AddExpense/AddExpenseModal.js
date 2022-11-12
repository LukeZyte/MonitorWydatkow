import { StyleSheet, Dimensions } from "react-native";
import ModalWindow from "../../UI/ModalWindow";
import AddExpenseForm from "./AddExpenseForm";
import { useTheme } from "@react-navigation/native";

const AddExpenseModal = ({ showAddExpenseModal, setShowAddExpenseModal }) => {
  const { colors } = useTheme();

  const screenWidth = Dimensions.get("screen").width;

  return (
    <ModalWindow
      onModalVisible={showAddExpenseModal}
      onSetModalVisible={setShowAddExpenseModal}
      style={[styles.container, { width: screenWidth - 20 }]}
      title="Nowy wydatek"
    >
      <AddExpenseForm onSetModalVisible={setShowAddExpenseModal} />
    </ModalWindow>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
