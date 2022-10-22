import {
  Pressable,
  ScrollView,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../../store/themeContext";
import TextUI from "../components/UI/TextUI";
import { Ionicons } from "@expo/vector-icons";
import { AppStyle } from "../constants/style";
import Card from "../components/UI/Card";

const ProfileScreen = () => {
  const { colors } = useTheme();
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const isIOS = Platform.OS === "ios";

  return (
    <ScrollView>
      <Card>
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            styles.pressable,
            { backgroundColor: colors.bgPrimary },
            pressed &&
              isIOS && { backgroundColor: colors.accent, opacity: 0.5 },
          ]}
          android_ripple={{ color: colors.accent }}
        >
          <View style={styles.title}>
            <TextUI>Motyw aplikacji</TextUI>
          </View>
          <View style={styles.icon}>
            {!isDarkTheme && (
              <Ionicons
                name="sunny"
                size={24}
                color={colors.header}
                style={styles.ioniconStyle}
              />
            )}
            {isDarkTheme && (
              <Ionicons
                name="moon"
                size={24}
                color={colors.header}
                style={styles.ioniconStyle}
              />
            )}
            <TextUI
              style={{
                fontWeight: AppStyle.fontWeight.bold,
                color: colors.accent,
              }}
            >
              {isDarkTheme ? "Ciemny" : "Jasny"}
            </TextUI>
          </View>
        </Pressable>
      </Card>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderRadius: AppStyle.border.radius,
    overflow: "hidden",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ioniconStyle: { marginRight: 12 },
});
