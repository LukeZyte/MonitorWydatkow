import { StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";
import ModalWindow from "../UI/ModalWindow";
import TextUI from "../UI/TextUI";
import AddExpenseForm from "./AddExpenseForm";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import SmallIconButton from "../UI/SmallIconButton";

const AddExpenseModal = ({ showAddExpenseModal, setShowAddExpenseModal }) => {
  const { colors } = useTheme();

  return (
    <ModalWindow
      onModalVisible={showAddExpenseModal}
      onSetModalVisible={setShowAddExpenseModal}
      style={{ padding: 8, width: 360 }}
    >
      <View>
        <TextUI style={styles.title}>Nowy wydatek</TextUI>
        <SmallIconButton
          style={styles.closeButton}
          onPress={() => setShowAddExpenseModal(false)}
        >
          <Ionicons name="close-sharp" size={24} color={colors.text} />
        </SmallIconButton>
      </View>
      <AddExpenseForm onSetModalVisible={setShowAddExpenseModal} />
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
    marginTop: 8,
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
