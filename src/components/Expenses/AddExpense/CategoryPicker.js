import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { CategoriesContext } from "../../../../store/categoriesContext";
import { AppStyle } from "../../../constants/style";
import TextUI from "../../UI/TextUI";
import CategoryItem from "./CategoryItem";

const CategoryPicker = ({ selectCategoryHandler, selectedCategory }) => {
  const { categories } = useContext(CategoriesContext);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <TextUI>Kategoria:</TextUI>
        <TextUI
          style={{
            fontWeight: AppStyle.fontWeight.bold,
            color: colors.accent,
          }}
        >
          {selectedCategory.name}
        </TextUI>
      </View>
      <View>
        <FlatList
          columnWrapperStyle={{
            justifyContent: "center",
            margin: 2,
          }}
          data={categories}
          numColumns={3}
          renderItem={({ item }) => (
            <CategoryItem
              key={item.name}
              name={item.name}
              color={item.color}
              selectCategoryHandler={selectCategoryHandler}
              selectedCategory={selectedCategory}
            />
          )}
        />
      </View>
    </View>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 8,
  },
  titleBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
