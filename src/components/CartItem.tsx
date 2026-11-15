import { PopulatedCartItem } from "@/types";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { QtyControls } from "./QtyControls";

interface CartItemProps {
  item: PopulatedCartItem;
  disableQty?: boolean;
}

export function CartItem({ item, disableQty = false }: CartItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <TouchableOpacity
          onPress={() => router.navigate(`/Toys/${item.productId}`)}
        >
          <AppText style={styles.title}>{item.product?.title}</AppText>
        </TouchableOpacity>
        <AppText style={styles.proudctId}>{item.productId}</AppText>
        <AppText style={styles.price}>${item.product?.price}</AppText>
      </View>
      <QtyControls
        value={item.qty}
        onChange={value => console.log("Qty changed to " + value)}
        disabled={disableQty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  details: {
    flex: 1,
    gap: 2
  },
  title: {
    fontSize: 17,
    fontWeight: "600"
  },
  proudctId: {
    fontSize: 16,
    fontWeight: "300"
  },
  price: {
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 0.5
  }
});
