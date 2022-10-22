import { StyleSheet, View } from "react-native";
import { AppStyle } from "../../../constants/style";
import ModalWindow from "../../UI/ModalWindow";
import TextUI from "../../UI/TextUI";
import AddExpenseForm from "./AddExpenseForm";
import SmallIconButton from "../../UI/SmallIconButton";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const AddExpenseModal = ({ showAddExpenseModal, setShowAddExpenseModal }) => {
  const { colors } = useTheme();

  return (
    <ModalWindow
      onModalVisible={showAddExpenseModal}
      onSetModalVisible={setShowAddExpenseModal}
      style={styles.container}
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
    width: 360,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
});
