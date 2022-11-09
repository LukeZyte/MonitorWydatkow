import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Appearance } from "react-native";
import { ThemeContext } from "../../../store/themeContext";
import OptionCard from "./OptionCard";

const OptionToggleTheme = () => {
  const { colors } = useTheme();
  const { isDarkTheme, setLightTheme, setDarkTheme } = useContext(ThemeContext);
  const iconSize = 24;
  const systemTheme = Appearance.getColorScheme();

  const [pickedOption, setPickedOption] = useState("system"); // "system", "light", "dark"

  const pressHandler = () => {
    if (pickedOption === "system") {
      setPickedOption("light");
      setLightTheme();
    }
    if (pickedOption === "light") {
      setPickedOption("dark");
      setDarkTheme();
    }
    if (pickedOption === "dark") {
      setPickedOption("system");
      if (systemTheme === "dark") {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    }
  };

  return (
    <OptionCard
      iconName={isDarkTheme ? "sunny" : "moon"}
      iconSize={iconSize}
      color={colors.accent}
      title="Motyw aplikacji"
      optionText={isDarkTheme ? "Ciemny" : "Jasny"}
      onPress={pressHandler}
    />
  );
};

export default OptionToggleTheme;
