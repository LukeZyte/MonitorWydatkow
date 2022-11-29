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
import OptionToggleTheme from "../components/Options/OptionToggleTheme";
import OptionWhatsNew from "../components/Options/WhatsNew/OptionWhatsNew";
import OptionPlannedExpenses from "../components/Options/PlannedAmount/OptionPlannedAmount";

const ProfileScreen = () => {
  const { colors } = useTheme();
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const isIOS = Platform.OS === "ios";

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <OptionToggleTheme />
      <OptionPlannedExpenses />
      <OptionWhatsNew />
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
