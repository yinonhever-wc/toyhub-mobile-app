import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export function CartButton() {
  return (
    <TouchableOpacity
      hitSlop={8}
      onPress={() => router.navigate("/ShoppingCart")}
    >
      <Ionicons name="cart-outline" size={32} />
    </TouchableOpacity>
  );
}
