import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import Card from "./Card";
import TextUI from "./TextUI";
import { useTheme } from "@react-navigation/native";
import SmallIconButton from "./SmallIconButton";
import { Ionicons } from "@expo/vector-icons";
import { AppStyle } from "../../constants/style";

// REQUIRE: OnModalVisible state, onSetModalVisible state fun!

const ModalWindow = ({
  children,
  onModalVisible,
  onSetModalVisible,
  title,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <Modal transparent={true} visible={onModalVisible} animationType={"fade"}>
      <TouchableOpacity
        style={styles.rootContainer}
        activeOpacity={1}
        onPressOut={() => onSetModalVisible(false)}
      />
      <View style={styles.innerContainer}>
        <Card style={[styles.modalContent, style]}>
          <View style={styles.top}>
            <TextUI style={styles.title}>{title}</TextUI>
            <SmallIconButton
              style={styles.closeButton}
              onPress={() => onSetModalVisible(false)}
            >
              <Ionicons name="close-sharp" size={20} color={colors.text} />
            </SmallIconButton>
            {children}
          </View>
        </Card>
      </View>
    </Modal>
  );
};

export default ModalWindow;

const styles = StyleSheet.create({
  rootContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    paddingBottom: 12,
  },
  top: {
    justifyContent: "center",
  },
  title: {
    fontSize: AppStyle.fontSize.large,
    fontWeight: AppStyle.fontWeight.bold,
    marginBottom: 16,
    marginTop: 8,
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
