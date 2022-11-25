import { useTheme } from "@react-navigation/native";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { AppStyle } from "../../../constants/style";
import ModalWindow from "../../UI/ModalWindow";
import TextUI from "../../UI/TextUI";
import WhatsNewRecord from "./WhatsNewRecord";

const WhatsNewModal = ({ onModalVisible, onSetModalVisible }) => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const { colors } = useTheme();

  const DATA = [
    {
      title: "Aktualizacja 25.11.2022",
      added: [
        "Nowy przycisk w profilu do wyświetlania informacji o aktualizacjach",
        'Linki do profilu na telegram i facebook w "Co nowego"',
      ],
      changed: ['Nowy design okienka "Co nowego"'],
      fixed: ["Przycisk do zmiany motywu teraz pokazuje poprawną ikonę"],
      removed: ["Przycisk informacji z prawego górnego rogu ekranu"],
      knownIssues: [
        "Nie zawsze reagujące przyciski w opcjach",
        "Biały pasek nawigacyjny u dołu ekranu (jeżeli widoczny)",
      ],
    },
    {
      title: "Aktualizacja 12.11.2022",
      added: [
        'Dodano logo w zakładce "Wydatki"',
        "Nowe okno komunikatu podczas usuwania wydatku",
      ],
      changed: ["Nowy wygląd okienek", "Nowa paleta kolorów"],
      knownIssues: [
        "Nie zawsze reagujące przyciski w opcjach",
        'Natywne, białe okno w "Co nowego"',
        "Biały pasek nawigacyjny u dołu ekranu (jeżeli widoczny)",
      ],
    },
  ];

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
        data={DATA}
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
