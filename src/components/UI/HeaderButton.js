import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";

function HeaderButton({ children, style, onPress }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.bgPrimary }}
        style={{ flex: 1 }}
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
