import { useTheme } from "@react-navigation/native";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";

const IconButton = ({
  children,
  onPress,
  style,
  innerStyle,
  pressColor,
  pressedStyle,
}) => {
  const { colors } = useTheme();
  const isIOS = Platform.OS === "ios";

  return (
    <View style={[styles.outer, { backgroundColor: colors.primary }, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={
          pressColor ? { color: pressColor } : { color: colors.bgPrimary }
        }
        style={({ pressed }) => {
          pressed && isIOS && pressColor
            ? { opacity: 0.5, backgroundColor: pressColor }
            : { opacity: 0.5, backgroundColor: colors.bgPrimary };
          // pressColor && { backgroundColor: pressColor };
          // pressed && { backgroundColor: "orange" };
        }}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  outer: {
    borderRadius: AppStyle.border.round,
    alignSelf: "center",
    overflow: "hidden",
    // marginBottom: 8,
  },
});
