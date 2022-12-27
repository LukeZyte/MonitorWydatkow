import { FlatList, StyleSheet, View } from "react-native";
import CategoryStat from "./CategoryStat";

const CategoriesStats = ({ categoriesSums }) => {
  return (
    <View>
      <FlatList
        data={categoriesSums}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <CategoryStat {...item} itemIndex={index} />
        )}
      />
    </View>
  );
};

export default CategoriesStats;

const styles = StyleSheet.create({});
