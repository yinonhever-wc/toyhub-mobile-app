import { colors } from "@/constants/colors";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";

export function CartButton() {
  const { totalCartItems } = useCart();

  return (
    <TouchableOpacity
      hitSlop={8}
      onPress={() => router.navigate("/ShoppingCart")}
    >
      <Ionicons name="cart-outline" size={32} />
      {totalCartItems > 0 && (
        <View style={styles.totalBadge}>
          <AppText style={styles.totalBadgeText}>{totalCartItems}</AppText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  totalBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    zIndex: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center"
  },
  totalBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14
  }
});
