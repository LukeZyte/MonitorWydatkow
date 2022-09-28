import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";

const SmallIconButton = ({ children, onPress, style }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.outer, { backgroundColor: colors.secondBgPrimary }, style]}
    >
      <Pressable onPress={onPress} android_ripple={{ color: colors.bgPrimary }}>
        <View style={styles.inner}>{children}</View>
      </Pressable>
    </View>
  );
};

export default SmallIconButton;

const styles = StyleSheet.create({
  outer: {
    borderRadius: AppStyle.border.round,
    alignSelf: "center",
    overflow: "hidden",
    margin: 4,
  },
  inner: {
    padding: 8,
  },
});
