import { StyleSheet } from "react-native";
import { AppStyle } from "../../constants/style";
import ModalWindow from "../UI/ModalWindow";
import TextUI from "../UI/TextUI";
import AddExpenseForm from "./AddExpenseForm";

const AddExpenseModal = ({ showAddExpenseModal, setShowAddExpenseModal }) => {
  return (
    <ModalWindow
      onModalVisible={showAddExpenseModal}
      onSetModalVisible={setShowAddExpenseModal}
      style={{ padding: 8, width: 360 }}
    >
      <TextUI style={styles.title}>Nowy wydatek</TextUI>
      <AddExpenseForm />
    </ModalWindow>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: AppStyle.fontSize.large,
    fontWeight: AppStyle.fontWeight.bold,
    marginBottom: 32,
  },
});
