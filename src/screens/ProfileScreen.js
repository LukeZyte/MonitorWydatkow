import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import { ThemeContext } from "../../store/themeContext";
import TextUI from "../components/UI/TextUI";
import ThemeToggleButton from "../components/UI/ThemeToggleButton";
import { Ionicons } from "@expo/vector-icons";
import { AppStyle } from "../constants/style";

const ProfileScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => <ThemeToggleButton />,
  //   });
  // }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable
          onPress={toggleTheme}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 24,
            paddingHorizontal: 12,
            backgroundColor: colors.bgPrimary,
            borderRadius: AppStyle.border.radius,
            overflow: "hidden",
          }}
          android_ripple={{ color: colors.accent }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextUI>Motyw aplikacji</TextUI>
          </View>
          <View
            style={{
              overflow: "hidden",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // paddingHorizontal: 12,
            }}
          >
            {!isDarkTheme && (
              <Ionicons
                name="sunny"
                size={24}
                color={colors.header}
                style={{ marginRight: 12 }}
              />
            )}
            {isDarkTheme && (
              <Ionicons
                name="moon"
                size={24}
                color={colors.header}
                style={{ marginRight: 12 }}
              />
            )}
            <TextUI
              style={{
                fontWeight: AppStyle.fontWeight.bold,
                color: colors.accent,
              }}
            >
              {isDarkTheme ? "Ciemny" : "Jasny"}
            </TextUI>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: AppStyle.border.radius,
  },
});
