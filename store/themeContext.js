import { createContext, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, LightTheme } from "../src/constants/style";

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
    console.log("ZMIENIAM TRYB");
    if (currentTheme.colors.text === DarkTheme.colors.text) {
      setCurrentTheme(LightTheme);
      setThemeStore(LightTheme);
      console.log("Ustawiam LIGHT");
    } else {
      setCurrentTheme(DarkTheme);
      setThemeStore(DarkTheme);
      console.log("Ustawiam DARK");
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
