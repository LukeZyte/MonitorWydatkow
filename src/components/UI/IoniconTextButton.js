import { useTheme } from "@react-navigation/native";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextUI from "./TextUI";
import { AppStyle } from "../../constants/style";

const IoniconTextButton = ({
  children,
  onPress,
  style,
  size,
  color,
  icon,
  textStyle,
}) => {
  const { colors } = useTheme();
  const isIOS = Platform.OS === "ios";

  return (
    <View style={[styles.outer, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.secondBgPrimary }}
        style={({ pressed }) =>
          pressed &&
          isIOS && { backgroundColor: colors.bgPrimary, opacity: 0.5 }
        }
      >
        <View style={styles.inner}>
          <Ionicons
            name={icon}
            size={size}
            color={color}
            style={{ alignSelf: "center" }}
          />
          <TextUI
            style={[
              styles.textStyle,
              {
                fontSize: AppStyle.fontSize.medium,
                fontWeight: AppStyle.fontWeight.bold,
              },

              textStyle,
            ]}
          >
            {children}
          </TextUI>
        </View>
      </Pressable>
    </View>
  );
};

export default IoniconTextButton;

const styles = StyleSheet.create({
  outer: {
    borderRadius: AppStyle.border.radius,
    alignSelf: "center",
    overflow: "hidden",
  },
  inner: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textStyle: {
    marginLeft: 8,
  },
});
