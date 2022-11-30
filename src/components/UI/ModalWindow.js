import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Card from "./Card";
import TextUI from "./TextUI";
import { useTheme } from "@react-navigation/native";
import SmallIconButton from "./SmallIconButton";
import { Ionicons } from "@expo/vector-icons";
import { AppStyle } from "../../constants/style";
import { useLayoutEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

// REQUIRE: OnModalVisible state, onSetModalVisible state fun!

const ModalWindow = ({
  children,
  onModalVisible,
  onSetModalVisible,
  title,
  closeOnTap,
  style,
}) => {
  const { colors } = useTheme();

  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  useLayoutEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.background);
  }, []);

  return (
    <Modal transparent={true} visible={onModalVisible} animationType={"fade"}>
      <TouchableOpacity
        style={styles.rootContainer}
        activeOpacity={1}
        onPressOut={() => closeOnTap && onSetModalVisible(false)}
      />
      <View style={styles.innerContainer}>
        <Card
          style={[styles.modalContent, style, { borderColor: colors.border }]}
        >
          <View style={styles.top}>
            <TextUI style={styles.title}>{title}</TextUI>
            <SmallIconButton
              pressColor={colors.accent}
              style={[styles.closeButton, { backgroundColor: colors.modal }]}
              onPress={() => onSetModalVisible(false)}
            >
              <Ionicons name="close" size={20} color={colors.text} />
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  innerContainer: {
    flex: 1,
    // position: "absolute",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  modalContent: {
    paddingBottom: 12,
    // borderWidth: 1,
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
