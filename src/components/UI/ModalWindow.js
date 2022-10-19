import { Modal, ScrollView, StyleSheet, View } from "react-native";
import Card from "./Card";
import OutsideView from "react-native-detect-press-outside";
import { useRef } from "react";

// REQUIRE: OnModalVisible state, onSetModalVisible state fun!

const ModalWindow = ({
  children,
  onModalVisible,
  onSetModalVisible,
  style,
}) => {
  const childRef = useRef();

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
              <Card style={[styles.modalContent, style]}>{children}</Card>
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
  modalContent: {},
});
