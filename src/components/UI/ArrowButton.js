import { useTheme } from "@react-navigation/native";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppStyle } from "../../constants/style";

const ArrowButton = ({ direction, onPress }) => {
  const { colors } = useTheme();
  const isIOS = Platform.OS === "ios";

  // FIX PRESSED STYLING CUZ IT DOES NOT WORK for some reason

  return (
    <View style={[styles.outer, { backgroundColor: colors.modal }]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.primary }}
        style={({ pressed }) => {
          pressed && { backgroundColor: colors.primary };
        }}
      >
        <MaterialIcons
          name={`keyboard-arrow-${direction}`}
          size={32}
          color={colors.text}
          //   style={[styles.sliderIcon]}
        />
      </Pressable>
    </View>
  );
};

export default ArrowButton;

const styles = StyleSheet.create({
  outer: {
    borderRadius: AppStyle.border.round,
    alignSelf: "center",
    overflow: "hidden",
    // marginBottom: 8,
  },
  pressed: {
    padding: 8,
    backgroundColor: "orange",
  },
});
