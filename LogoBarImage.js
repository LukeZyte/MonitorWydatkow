import { useTheme } from "@react-navigation/native";
import React, { useContext } from "react";

import { View, Image, StyleSheet } from "react-native";
import TextUI from "./src/components/UI/TextUI";
import { AppStyle } from "./src/constants/style";
import { ThemeContext } from "./store/themeContext";

const LogoBarImage = () => {
  const { colors } = useTheme();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        {isDarkTheme ? (
          <Image
            source={require("./assets/LogoMW_trans.png")}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("./assets/LogoMWLight_trans.png")}
            style={styles.image}
          />
        )}
        <TextUI style={styles.title}>Monitor Wydatków</TextUI>
      </View>
    </View>
  );
};

export default LogoBarImage;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 8,
    // backgroundColor: "blue",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    // backgroundColor: colors.background,
    // width: "100%",
  },
  image: {
    width: 40,
    height: 40,
    marginHorizontal: 8,
    // borderRadius: 80 / 2,
    // backgroundColor: "pink",
  },
  title: {
    fontSize: AppStyle.fontSize.large,
    fontWeight: AppStyle.fontWeight.bold,
    //   flex: 1,

    //   left: 10,
    //   right: 0,
    // backgroundColor: "orange",
  },
});
