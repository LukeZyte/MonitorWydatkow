import { StyleSheet } from "react-native";
import HeaderButton from "./HeaderButton";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext";
import { useTheme } from "@react-navigation/native";

const ThemeToggleButton = () => {
  const { colors } = useTheme();
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);

  return (
    <HeaderButton onPress={toggleTheme} style={styles.icon}>
      {!isDarkTheme && (
        <Ionicons
          name="moon"
          size={24}
          color={colors.header}
          style={styles.iconInner}
        />
      )}
      {isDarkTheme && (
        <Ionicons
          name="sunny"
          size={28}
          color={colors.header}
          style={styles.iconInner}
        />
      )}
    </HeaderButton>
  );
};

export default ThemeToggleButton;

const styles = StyleSheet.create({
  icon: {
    width: 60,
    marginRight: 8,
  },
  iconInner: {
    padding: 8,
    alignSelf: "center",
  },
});
