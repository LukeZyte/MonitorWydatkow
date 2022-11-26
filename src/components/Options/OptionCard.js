import Card from "../UI/Card";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Pressable, View, Platform, StyleSheet } from "react-native";
import TextUI from "../UI/TextUI";
import { AppStyle } from "../../constants/style";
import { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext";

const OptionCard = ({ iconName, iconSize, title, optionText, onPress }) => {
  const { colors } = useTheme();
  const isIOS = Platform.OS === "ios";
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Card
      style={[
        styles.outer,
        isDarkTheme && { backgroundColor: colors.background },
      ]}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.accent }}
        style={({ pressed }) => [
          pressed && isIOS && { opacity: 0.5, backgroundColor: colors.accent },
          styles.container,
        ]}
      >
        <View style={styles.optionTitle}>
          <Ionicons name={iconName} size={iconSize} color={colors.text} />
          <TextUI style={styles.title}>{title}</TextUI>
        </View>
        <TextUI style={[styles.text, { color: colors.accent }]}>
          {optionText}
        </TextUI>
      </Pressable>
    </Card>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  outer: {
    marginVertical: 4,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: AppStyle.border.radius,
    overflow: "hidden",
  },
  optionTitle: {
    flexDirection: "row",
  },
  title: {
    marginLeft: 16,
  },
  text: {
    fontWeight: AppStyle.fontWeight.bold,
    marginHorizontal: 8,
    maxWidth: 200,
    textAlign: "center",
  },
});
