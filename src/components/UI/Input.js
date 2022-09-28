import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { AppStyle } from "../../constants/style";
import TextUI from "./TextUI";

const Input = ({
  styleLabel,
  label,
  style,
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  multiline,
  numberOfLines,
  blurOnSubmit,
  keyboardType,
}) => {
  const [focus, setFocus] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TextUI style={[styles.label, styleLabel]}>{label}</TextUI>
      <TextInput
        keyboardType={keyboardType}
        style={[
          styles.input,
          {
            backgroundColor: colors.secondBgPrimary,
            color: colors.text,
            borderColor: colors.secondBgPrimary,
            borderRadius: AppStyle.border.round,
          },
          focus && styles.focusInput,
          focus && {
            borderColor: colors.primary,
          },
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : colors.accent
        }
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        blurOnSubmit={blurOnSubmit}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      ></TextInput>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 2,
  },
});
