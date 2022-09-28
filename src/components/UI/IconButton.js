import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";

const IconButton = ({ children, onPress, style }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.outer, { backgroundColor: colors.primary }, style]}>
      <Pressable onPress={onPress} android_ripple={{ color: colors.bgPrimary }}>
        <View style={styles.inner}>{children}</View>
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  outer: {
    borderRadius: 100,
    alignSelf: "center",
    overflow: "hidden",
    marginBottom: 8,
  },
  inner: {
    padding: 24,
  },
});
