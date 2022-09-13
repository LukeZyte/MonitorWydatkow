import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { AppStyle } from "../../constants/style";

const ExpenseItem = ({ id, title, value, date }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        //borderColor: colors.border,
        { backgroundColor: colors.darkPrimary },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.value, { color: colors.accent }]}>
        {`${value} zł`}
      </Text>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 2,
    // borderWidth: 1,
    // borderRadius: AppStyle.border.radius,
  },
  title: {
    fontSize: AppStyle.fontSize.medium,
  },
  value: {
    fontWeight: AppStyle.fontWeight.bold,
    fontSize: AppStyle.fontSize.medium,
  },
});
