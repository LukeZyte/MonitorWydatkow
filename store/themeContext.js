import { createContext, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DarkTheme = {
  colors: {
    primary: "#03A9F4",
    bgPrimary: "#0f122c",
    secondBgPrimary: "#191c3f",
    // bgPrimary: "#0c0e25",
    // secondBgPrimary: "#151a50",
    accent: "#03A9F4",
    background: "#000000",
    modal: "#17192b",
    // card: "#191c3f",
    card: "#000000",
    text: "#FFFFFF",
    border: "#4690ff",
    header: "#FFFFFF",
    wrong: "#FF0000",
  },
};

// OLD LIGHT THEME
// const LightTheme = {
//   colors: {
//     // primary: "#03A9F4",
//     primary: "#004faa",
//     // bgPrimary: "#e1eeff",
//     bgPrimary: "#cae1ff",
//     secondBgPrimary: "#a8c1e0",
//     accent: "#004faa",
//     // background: "#fafafa",
//     background: "#e1eeff",
//     // card: "#03A9F4",
//     card: "#e1eeff",
//     text: "#000000",
//     // border: "#fafafa",
//     border: "#004faa",
//     header: "#000000",
//     wrong: "#FF0000",
//   },
// };

const LightTheme = {
  colors: {
    primary: "#0099ff",
    // primary: "#004faa",
    // bgPrimary: "#e1eeff",
    bgPrimary: "#e2efff",
    secondBgPrimary: "#e2efff",
    accent: "#004faa",
    // background: "#fafafa",
    background: "#ffffff",
    modal: "#ffffff",
    // card: "#03A9F4",
    card: "#ffffff",
    text: "#000000",
    // border: "#fafafa",
    border: "#004faa",
    header: "#000000",
    wrong: "#FF0000",
  },
};

export const ThemeContext = createContext({
  currentTheme: null,
  toggleTheme: () => {},
  setDarkTheme: () => {},
  setLightTheme: () => {},
  isDarkTheme: null,
});

const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(DarkTheme);

  const getThemeFromStore = async () => {
    try {
      const result = await AsyncStorage.getItem("themeKey");
      if (result) {
        setCurrentTheme(JSON.parse(result));
      } else {
        setCurrentTheme(DarkTheme);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const setThemeStore = async (data) => {
    try {
      await AsyncStorage.setItem("themeKey", JSON.stringify(data));
    } catch (error) {
      Alert.alert(error);
    }
  };

  useLayoutEffect(() => {
    getThemeFromStore();
  }, []);

  const toggleTheme = () => {
    if (currentTheme == DarkTheme) {
      setCurrentTheme(LightTheme);
      setThemeStore(LightTheme);
    } else {
      setCurrentTheme(DarkTheme);
      setThemeStore(DarkTheme);
    }
  };

  const setDarkTheme = () => {
    setCurrentTheme(DarkTheme);
    setThemeStore(DarkTheme);
  };

  const setLightTheme = () => {
    setCurrentTheme(LightTheme);
    setThemeStore(LightTheme);
  };

  const value = {
    currentTheme: currentTheme,
    toggleTheme: toggleTheme,
    setDarkTheme: setDarkTheme,
    setLightTheme: setLightTheme,
    isDarkTheme: currentTheme.colors.text === "#FFFFFF",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
