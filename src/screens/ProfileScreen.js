import { StyleSheet } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import { ThemeContext } from "../../store/themeContext";
import TextUI from "../components/UI/TextUI";
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
