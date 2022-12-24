import { useTheme } from "@react-navigation/native";
import React, { useState, forwardRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { AppStyle } from "../../constants/style";
import TextUI from "./TextUI";

const Input = React.forwardRef(
  (
    {
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
      autoFocus,
      returnKeyType,
      onSubmitEditing,
    },
    ref
  ) => {
    const [focus, setFocus] = useState(false);
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
        {label && <TextUI style={[styles.label, styleLabel]}>{label}</TextUI>}
        <TextInput
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          ref={ref}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          style={[
            styles.input,
            {
              backgroundColor: colors.secondBgPrimary,
              color: colors.text,
              borderColor: colors.background,
              borderRadius: AppStyle.border.radius,
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
  }
);

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    // borderBottomWidth: 2,
  },
  label: {
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 2,
  },
});
