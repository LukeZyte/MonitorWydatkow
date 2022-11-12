import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Alert, Pressable, StyleSheet } from "react-native";
import { AppStyle } from "./src/constants/style";

const WhatsNewButton = () => {
  const { colors } = useTheme();

  const pressHandler = () => {
    Alert.alert(
      "Co nowego?",
      `Aktualizaja 12.11.2022\n
    > Dodano logo w zakładce "Wydatki".
    > Lepszy design okienek.
    > Lepsza paleta kolorów.
      
# Znane problemy #

    - Nie zawsze reagujące przyciski w opcjach.
    - Natywne białe okno w "Co nowego" oraz podczas usuwania wydatku.

Jeżli napotkasz jakiś błąd, który nie został powyżej wymieniony - daj znać, z góry dzięki <3\n
@telegram: https://t.me/LukeJarzab
      `,
      [{ text: "Zamknij" }]
    );
  };

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.2 }]}
    >
      <MaterialCommunityIcons
        name="information-outline"
        size={24}
        color={colors.text}
      />
    </Pressable>
  );
};

export default WhatsNewButton;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: AppStyle.border.round,
    marginHorizontal: 12,
  },
});
