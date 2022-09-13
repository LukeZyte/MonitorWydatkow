import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";

const IconButton = ({ children, onPress, style }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.outer, { backgroundColor: colors.primary }]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.darkPrimary }}
      >
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
