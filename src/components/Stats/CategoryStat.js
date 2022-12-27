import { FlatList, StyleSheet, View } from "react-native";
import { AppStyle } from "../../constants/style";
import CategoryItem from "../Expenses/AddExpense/CategoryItem";
import TextUI from "../UI/TextUI";

const CategoryStat = ({ amount, svg, category }) => {
  const color = svg.fill;
  const categoryName = category.name;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ marginHorizontal: 8 }}>
        <CategoryItem
          small
          name={categoryName}
          color={color}
          selectCategoryHandler={() => {}}
          selectedCategory={() => {}}
        />
      </View>
      <TextUI>{categoryName}</TextUI>
      <TextUI
        style={{
          fontSize: AppStyle.fontSize.large,
          fontWeight: AppStyle.fontWeight.bold,
        }}
      >{` ${amount}`}</TextUI>
    </View>
  );
};

export default CategoryStat;

const styles = StyleSheet.create({});
