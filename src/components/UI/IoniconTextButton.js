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
  iconStyle,
  fitBorders,
}) => {
  const { colors } = useTheme();
  const isIOS = Platform.OS === "ios";

  return (
    <View style={[styles.outer, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.accent }}
        style={({ pressed }) =>
          pressed && isIOS && { backgroundColor: colors.accent, opacity: 0.5 }
        }
      >
        <View
          style={[
            styles.inner,
            fitBorders && { width: 160, justifyContent: "space-evenly" },
          ]}
        >
          <View style={styles.innerSide}>
            <Ionicons
              name={icon}
              size={size}
              color={color}
              style={[styles.icon, iconStyle]}
            />
          </View>
          <View style={styles.innerSide}>
            <TextUI style={[styles.textStyle, textStyle]}>{children}</TextUI>
          </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  innerSide: {
    marginHorizontal: 4,
    justifyContent: "center",
  },
  textStyle: {
    fontSize: AppStyle.fontSize.medium,
    fontWeight: AppStyle.fontWeight.bold,
  },
  icon: { alignSelf: "center" },
});
