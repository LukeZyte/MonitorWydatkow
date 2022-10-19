import { useTheme } from "@react-navigation/native";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";

function HeaderButton({ children, style, onPress }) {
  const { colors } = useTheme();
  const isIOS = Platform.OS === "ios";

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.bgPrimary }}
        style={({ pressed }) => [
          { flex: 1 },
          pressed &&
            isIOS && { opacity: 0.5, backgroundColor: colors.bgPrimary },
        ]}
      >
        {children}
      </Pressable>
    </View>
  );
}

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: AppStyle.border.radius,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
