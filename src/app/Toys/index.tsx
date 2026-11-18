import products from "@/assets/data/toys.json";
import { ProductListing } from "@/components/ProductListing";
import { globalStyles } from "@/constants/globalStyles";
import { FlatList, StyleSheet, View } from "react-native";

const NUM_COLUMNS = 2;
const GUTTER = 16;

export default function Toys() {
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      numColumns={NUM_COLUMNS}
      contentContainerStyle={[
        globalStyles.screen,
        globalStyles.container,
        styles.listContainer
      ]}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <ProductListing product={item} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    rowGap: 34
  },
  columnWrapper: {
    marginHorizontal: -GUTTER / 2
  },
  itemContainer: {
    width: `${100 / NUM_COLUMNS}%`,
    paddingHorizontal: GUTTER / 2
  }
});
