import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../../../store/themeContext";
import TextUI from "./TextUI";
import { FontAwesome5 } from "@expo/vector-icons";
import { AppStyle } from "../../constants/style";
import { useTheme } from "@react-navigation/native";

const BottomTabElement = ({ title, bgColor, active, color, iconName }) => {
  const { currentTheme, isDarkTheme } = useContext(ThemeContext);
  const { colors } = useTheme();
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={[
          {
            padding: 12,
            borderRadius: AppStyle.border.round,
          },
          active && {
            backgroundColor: colors.secondBgPrimary,
          },
        ]}
      >
        <FontAwesome5 name={iconName} size={24} color={color} />
      </View>
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
