import { Modal, StyleSheet, View } from "react-native";
import Card from "./Card";
import OutsideView from "react-native-detect-press-outside";
import { useRef } from "react";
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
  const childRef = useRef();
  const { colors } = useTheme();

  return (
    <Modal transparent={true} visible={onModalVisible} animationType={"fade"}>
      <View style={styles.rootContainer}>
        <OutsideView
          childRef={childRef}
          onPressOutside={() => {
            onSetModalVisible(false);
          }}
          style={styles.rootContainer}
        >
          <View style={styles.innerContainer}>
            <View ref={childRef}>
              <Card style={[styles.modalContent, style]}>
                <View style={styles.top}>
                  <TextUI style={styles.title}>{title}</TextUI>
                  <SmallIconButton
                    style={styles.closeButton}
                    onPress={() => onSetModalVisible(false)}
                  >
                    <Ionicons
                      name="close-sharp"
                      size={20}
                      color={colors.text}
                    />
                  </SmallIconButton>
                  {children}
                </View>
              </Card>
            </View>
          </View>
        </OutsideView>
      </View>
    </Modal>
  );
};

export default ModalWindow;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
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
