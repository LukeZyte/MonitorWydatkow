import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
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
  return (
    <View style={[styles.outer, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.secondBgPrimary }}
      >
        <View style={styles.inner}>
          <Ionicons name={icon} size={size} color={color} />
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
    // marginBottom: 8,
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
