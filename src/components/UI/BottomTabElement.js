import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../../../store/themeContext";
import TextUI from "./TextUI";
import { FontAwesome5 } from "@expo/vector-icons";
import { AppStyle } from "../../constants/style";

const BottomTabElement = ({ title, bgColor, color, iconName }) => {
  const { currentTheme, isDarkTheme } = useContext(ThemeContext);
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FontAwesome5
        name={iconName}
        size={24}
        color={color}
        style={[
          {
            padding: 12,
            borderRadius: AppStyle.border.round,
          },
          color === currentTheme.colors.primary && {
            backgroundColor: bgColor,
          },
        ]}
      />
      <TextUI
        style={{
          fontSize: AppStyle.fontSize.normal,
          fontWeight: AppStyle.fontWeight.bold,
          marginTop: -12,
        }}
      >
        {title}
      </TextUI>
    </View>
  );
};

export default BottomTabElement;
