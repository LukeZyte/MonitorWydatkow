import { createContext, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DarkTheme = {
  colors: {
    primary: "#03A9F4",
    bgPrimary: "#0c0e22",
    secondBgPrimary: "#191c3f",
    accent: "#03A9F4",
    background: "#000000",
    card: "#191c3f",
    text: "#FFFFFF",
    border: "#4690ff",
    header: "#FFFFFF",
    wrong: "#FF0000",
  },
};

const LightTheme = {
  colors: {
    primary: "#03A9F4",
    bgPrimary: "#e1eeff",
    secondBgPrimary: "#a8c1e0",
    accent: "#004faa",
    background: "#fafafa",
    card: "#03A9F4",
    text: "#000000",
    border: "#fafafa",
    header: "#FFFFFF",
    wrong: "#FF0000",
  },
};

export const ThemeContext = createContext({
  currentTheme: null,
  toggleTheme: () => {},
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

  const value = {
    currentTheme: currentTheme,
    toggleTheme: toggleTheme,
    isDarkTheme: currentTheme.colors.text === "#FFFFFF",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
