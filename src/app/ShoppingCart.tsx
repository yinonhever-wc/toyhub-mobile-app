import items from "@/assets/data/cartItems.json";
import products from "@/assets/data/toys.json";
import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { CartItem } from "@/components/CartItem";
import { OrderPlacedDialog } from "@/components/OrderPlacedDialog";
import { OrderPlacedMessage } from "@/components/OrderPlacedMessage";
import { globalStyles } from "@/constants/globalStyles";
import { PopulatedCartItem } from "@/types";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const generateOrderId = () => {
  const num = Math.floor(Math.random() * (9999999 - 10000 + 1)) + 10000;
  return "OR-" + num;
};

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([...items]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const populatedCartItems = useMemo(
    () =>
      cartItems.map<PopulatedCartItem>(item => ({
        ...item,
        product: products.find(p => p.id === item.productId)
      })),
    [cartItems]
  );

  const totalPrice = useMemo(
    () =>
      populatedCartItems.reduce(
        (sum, item) => sum + (item.product?.price ?? 0),
        0
      ),
    [populatedCartItems]
  );

  const formattedTotalPrice = useMemo(
    () => totalPrice.toLocaleString("en-NZ"),
    [totalPrice]
  );

  const submitOrder = () => {
    setOrderId(generateOrderId());
    setShowDialog(true);
  };

  const cancelOrder = () => {
    setOrderId(null);
    setCartItems([]);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (orderId) {
          setCartItems([]);
          setOrderId(null);
          setShowDialog(false);
        }
      };
    }, [orderId])
  );

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={[
          globalStyles.screen,
          globalStyles.container,
          styles.container
        ]}
      >
        <View style={styles.items}>
          {cartItems.length ? (
            populatedCartItems.map(item => (
              <CartItem
                key={item.productId}
                item={item}
                disableQty={!!orderId}
              />
            ))
          ) : (
            <AppText style={styles.emptyText}>Your cart is empty.</AppText>
          )}
        </View>
        {orderId && <OrderPlacedMessage orderId={orderId} />}
        <View style={styles.bottom}>
          <View style={styles.totlPriceRow}>
            <AppText style={styles.totalPriceLabel}>Total</AppText>
            <AppText style={styles.totalPriceValue}>
              ${formattedTotalPrice}
            </AppText>
          </View>
          <View style={styles.buttons}>
            {orderId ? (
              <AppButton color="error" onPress={cancelOrder}>
                Cancel Order
              </AppButton>
            ) : (
              <AppButton
                color="primary"
                disabled={!cartItems.length}
                onPress={submitOrder}
              >
                Place Order
              </AppButton>
            )}
            <AppButton
              color="secondary"
              onPress={() => router.navigate("/Toys")}
            >
              See More Toys
            </AppButton>
          </View>
        </View>
      </ScrollView>
      {orderId && showDialog && (
        <OrderPlacedDialog
          orderId={orderId}
          onClose={() => setShowDialog(false)}
        />
      )}
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    gap: 45
  },
  items: {
    gap: 22
  },
  emptyText: {
    fontSize: 16
  },
  bottom: {
    gap: 15
  },
  totlPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  totalPriceLabel: {
    fontSize: 18,
    fontWeight: "300",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  totalPriceValue: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 0.5
  },
  buttons: {
    gap: 10
  }
});
