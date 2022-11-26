import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { CategoriesContext } from "../../../../store/categoriesContext";
import { AppStyle } from "../../../constants/style";

const CategoryItem = ({
  name,
  color,
  selectCategoryHandler,
  selectedCategory,
}) => {
  const { categories } = useContext(CategoriesContext);
  const { colors } = useTheme();
  const iconSize = 24;
  let icon = <Ionicons name="fast-food" size={iconSize} color="white" />;

  switch (name) {
    case "Spożywcze":
      icon = <Ionicons name="fast-food" size={iconSize} color="white" />;
      break;
    case "Używki":
      icon = <Ionicons name="beer" size={iconSize} color="white" />;
      break;
    case "Osobiste":
      icon = <Ionicons name="folder-open" size={iconSize} color="white" />;
      break;
    case "Transport":
      icon = <Ionicons name="car" size={iconSize} color="white" />;
      break;
    case "Odzież":
      icon = <Ionicons name="shirt" size={iconSize} color="white" />;
      break;
    case "Usługi":
      icon = <Ionicons name="cut" size={iconSize} color="white" />;
      break;
    case "Rachunki":
      icon = <Ionicons name="home" size={iconSize} color="white" />;
      break;
    case "Inne":
      icon = <Ionicons name="shapes" size={iconSize} color="white" />;
      break;
  }

  const index = categories.findIndex((item) => item.name === name);

  const choosenCategory = selectedCategory.name === name;

  return (
    <Pressable
      onPress={() => {
        selectCategoryHandler(index);
      }}
    >
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: color,
            borderColor: colors.bgPrimary,
          },
          choosenCategory && {
            borderColor: colors.primary,
            borderRadius: AppStyle.border.radius,
          },
        ]}
      >
        {icon}
      </View>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    borderRadius: AppStyle.border.round,
    borderWidth: 2,
  },
});
