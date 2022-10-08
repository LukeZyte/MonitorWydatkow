import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";

const IconButton = ({ children, onPress, style, innerStyle }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.outer, { backgroundColor: colors.primary }, style]}>
      <Pressable onPress={onPress} android_ripple={{ color: colors.bgPrimary }}>
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
