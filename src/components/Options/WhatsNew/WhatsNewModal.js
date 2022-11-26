import { useTheme } from "@react-navigation/native";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { AppStyle } from "../../../constants/style";
import ModalWindow from "../../UI/ModalWindow";
import TextUI from "../../UI/TextUI";
import WhatsNewRecord from "./WhatsNewRecord";
import updatesLog from "../../../util/updatesLog";

const WhatsNewModal = ({ onModalVisible, onSetModalVisible }) => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const { colors } = useTheme();

  return (
    <ModalWindow
      onModalVisible={onModalVisible}
      onSetModalVisible={onSetModalVisible}
      title="Co nowego"
      style={{
        width: screenWidth - 20,
        padding: 8,
        maxHeight: screenHeight - 120,
      }}
    >
      {/* <ScrollView
        key={DATA}
        style={{
          marginBottom: 32,
          borderRadius: AppStyle.border.radius,
        }}
      >
        {DATA.map((itemData, index) => {
          console.log(itemData.title);
          return (
            <WhatsNewRecord
              key={itemData.title}
              {...itemData}
              itemIndex={index}
            />
          );
        })}
      </ScrollView> */}

      {/* TODO: Find out why unique key Error appears... */}

      <FlatList
        style={styles.list}
        data={updatesLog}
        renderItem={(itemData) => {
          return (
            <WhatsNewRecord {...itemData.item} itemIndex={itemData.index} />
          );
        }}
        keyExtractor={(item) => {
          return item.title;
        }}
      />
    </ModalWindow>
  );
};

export default WhatsNewModal;

const styles = StyleSheet.create({
  list: {
    marginBottom: 32,
    borderRadius: AppStyle.border.radius,
  },
});
