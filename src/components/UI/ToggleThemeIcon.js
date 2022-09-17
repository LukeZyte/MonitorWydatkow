import { StyleSheet, Pressable, Animated } from "react-native";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react/cjs/react.production.min";
import { ThemeContext } from "../../../store/themeContext";

const ToggleThemeIcon = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const sunAnim = useRef(new Animated.Value(isDarkTheme ? 1 : 0)).current;

  const moonAnim = useRef(new Animated.Value(isDarkTheme ? 0 : 1)).current;

  const onAnimate = (firstAnim, secondAnim) => {
    Animated.timing(firstAnim, {
      duration: 150,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(secondAnim, {
        duration: 150,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };

  const onToggle = () => {
    isDarkTheme ? onAnimate(sunAnim, moonAnim) : onAnimate(moonAnim, sunAnim);
    toggleTheme();
  };

  return (
    <Pressable onPress={onToggle}>
      <Animated.View
        style={[
          styles.toggleButton,
          { opacity: moonAnim, transform: [{ scale: moonAnim }] },
        ]}
      >
        <Ionicons name={"moon"} size={28} color={"black"} />
      </Animated.View>
      <Animated.View
        style={[
          styles.toggleButton,
          { opacity: sunAnim, transform: [{ scale: sunAnim }] },
        ]}
      >
        <Ionicons name={"sunny"} size={28} color={"white"} />
      </Animated.View>
    </Pressable>
  );
};

export default ToggleThemeIcon;

const styles = StyleSheet.create({
  toggleButton: {
    position: "absolute",
    top: 3,
    right: 3,
    padding: 5,
    borderRadius: 50,
    flex: 1,
  },
});
