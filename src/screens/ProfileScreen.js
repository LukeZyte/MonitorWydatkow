import { useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import HeaderButton from "../components/UI/HeaderButton";
import { ThemeContext } from "../../store/themeContext";
import TextUI from "../components/UI/TextUI";
import ToggleThemeIcon from "../components/UI/ToggleThemeIcon";
import ThemeToggleButton from "../components/UI/ThemeToggleButton";

const ProfileScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeToggleButton />,
    });
  }, [navigation]);

  return (
    <>
      <TextUI>Profile</TextUI>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
