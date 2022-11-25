import { useTheme } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, View, Linking, Alert, Pressable } from "react-native";
import { AppStyle } from "../../../constants/style";
import TextUI from "../../UI/TextUI";
import { FontAwesome } from "@expo/vector-icons";

const WhatsNewRecord = ({
  title,
  itemIndex,
  added,
  fixed,
  removed,
  changed,
  customAction,
  customTitle,
  knownIssues,
}) => {
  const { colors } = useTheme();

  const telegramUrl = "https://t.me/LukeJarzab";
  const facebookUrl = "https://www.facebook.com/profile.php?id=100019891516062";

  const telegramLinkHandler = useCallback(async () => {
    const supported = await Linking.canOpenURL(telegramUrl);

    if (supported) {
      await Linking.openURL(telegramUrl);
    } else {
      Alert.alert(
        "Operacja nie powiodła się!",
        `Nie udało się otworzyć strony z tego źródła: ${telegramUrl}`
      );
    }
  }, [telegramUrl]);

  const facebookLinkHandler = useCallback(async () => {
    const supported = await Linking.canOpenURL(facebookUrl);

    if (supported) {
      await Linking.openURL(facebookUrl);
    } else {
      Alert.alert(
        "Operacja nie powiodła się!",
        `Nie udało się otworzyć strony z tego źródła: ${facebookUrl}`
      );
    }
  }, [facebookUrl]);

  return (
    <>
      <View style={styles.container}>
        <TextUI style={[styles.title, { color: colors.accent }]}>
          {title}
        </TextUI>
        {added && <TextUI style={styles.subtitle}>Dodano</TextUI>}
        {added &&
          added.map((item) => <TextUI style={styles.content}>• {item}</TextUI>)}
        {removed && <TextUI style={styles.subtitle}>Usunięto</TextUI>}
        {removed &&
          removed.map((item) => (
            <TextUI style={styles.content}>• {item}</TextUI>
          ))}
        {fixed && <TextUI style={styles.subtitle}>Naprawiono</TextUI>}
        {fixed &&
          fixed.map((item) => <TextUI style={styles.content}>• {item}</TextUI>)}
        {changed && <TextUI style={styles.subtitle}>Zmieniono</TextUI>}
        {changed &&
          changed.map((item) => (
            <TextUI style={styles.content}>• {item}</TextUI>
          ))}
        {customAction && <TextUI style={styles.subtitle}>{customTitle}</TextUI>}
        {customAction &&
          customAction.map((item) => (
            <TextUI style={styles.content}>• {item}</TextUI>
          ))}
        {knownIssues && <TextUI style={styles.subtitle}>Znane problemy</TextUI>}
        {knownIssues &&
          knownIssues.map((item) => (
            <TextUI style={styles.content}>• {item}</TextUI>
          ))}
      </View>

      {itemIndex === 0 && (
        <View style={styles.footerContainer}>
          <TextUI style={styles.footer}>
            Jeżli napotkasz jakiś błąd, który nie został powyżej wymieniony -
            daj znać, z góry dziękuję ❤
          </TextUI>

          <View style={styles.contactElement}>
            <Pressable
              onPress={telegramLinkHandler}
              style={({ pressed }) =>
                pressed && {
                  opacity: 0.5,
                }
              }
            >
              <View style={styles.contactElement}>
                <FontAwesome name="telegram" size={24} color={colors.text} />

                <TextUI style={[styles.contactText, { color: colors.accent }]}>
                  LukeJarzab
                </TextUI>
              </View>
            </Pressable>
            <Pressable
              onPress={facebookLinkHandler}
              style={({ pressed }) =>
                pressed && {
                  opacity: 0.5,
                }
              }
            >
              <View style={styles.contactElement}>
                <FontAwesome
                  name="facebook-square"
                  size={24}
                  color={colors.text}
                />

                <TextUI style={[styles.contactText, { color: colors.accent }]}>
                  Łukasz Jarząb
                </TextUI>
              </View>
            </Pressable>
          </View>
          <TextUI style={styles.line}>================================</TextUI>
        </View>
      )}
    </>
  );
};

export default WhatsNewRecord;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: AppStyle.fontSize.large,
    textAlign: "center",
    fontWeight: AppStyle.fontWeight.bold,
    marginVertical: 4,
  },
  subtitle: {
    fontWeight: AppStyle.fontWeight.bold,
    marginVertical: 4,
    marginTop: 8,
  },
  content: {
    marginLeft: 8,
  },
  footerContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  footer: {
    marginVertical: 16,
    fontSize: AppStyle.fontSize.small,
    textAlign: "center",
  },
  contactElement: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  contactText: {
    marginHorizontal: 8,
    fontWeight: AppStyle.fontWeight.bold,
  },
  line: {
    marginTop: 8,
    textAlign: "center",
  },
});
