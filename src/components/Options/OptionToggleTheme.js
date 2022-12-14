import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Appearance } from "react-native";
import { ThemeContext } from "../../../store/themeContext";
import OptionCard from "./OptionCard";

const OptionToggleTheme = () => {
  const { colors } = useTheme();
  const { isDarkTheme, setLightTheme, setDarkTheme, toggleTheme } =
    useContext(ThemeContext);
  const iconSize = 24;
  const systemTheme = Appearance.getColorScheme();

  const [pickedOption, setPickedOption] = useState("light"); // "system", "light", "dark"

  const pressHandler = () => {
    toggleTheme();
    // if (pickedOption === "system") {
    //   console.log(pickedOption, "BRUH");
    //   setPickedOption("light");
    //   setLightTheme();
    // }
    // if (pickedOption === "light") {
    //   console.log(pickedOption);
    //   setPickedOption("dark");
    //   setDarkTheme();
    // }
    // if (pickedOption === "dark") {
    //   setPickedOption("light");
    //   console.log(pickedOption);
    //   // setPickedOption("system");
    //   // if (systemTheme === "dark") {
    //   //   setDarkTheme();
    //   // } else {
    //   setLightTheme();
    //   // }
    // }
  };

  return (
    <OptionCard
      iconName={isDarkTheme ? "moon" : "sunny"}
      iconSize={iconSize}
      color={colors.accent}
      title="Motyw aplikacji"
      optionText={isDarkTheme ? "Ciemny" : "Jasny"}
      onPress={pressHandler}
    />
  );
};

export default OptionToggleTheme;
