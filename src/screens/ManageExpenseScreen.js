import { useTheme } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

const ManageExpenseScreen = ({ navigation }) => {
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Nowy wydatek",
    });
  }, []);

  return <View></View>;
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({});
