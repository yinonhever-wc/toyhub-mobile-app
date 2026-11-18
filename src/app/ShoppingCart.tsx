import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { CartItem } from "@/components/CartItem";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { OrderPlacedDialog } from "@/components/OrderPlacedDialog";
import { OrderPlacedMessage } from "@/components/OrderPlacedMessage";
import { globalStyles } from "@/constants/globalStyles";
import { useCart } from "@/context/CartContext";
import { formatNumber, generateOrderId } from "@/utils";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const ShoppingCart = () => {
  const { cartItems, populatedCartItems, totalPrice, clearItems } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const submitOrder = () => {
    setOrderId(generateOrderId());
    setShowSuccessDialog(true);
  };

  const cancelOrder = () => {
    setOrderId(null);
    clearItems();
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (orderId) {
          clearItems();
          setOrderId(null);
          setShowSuccessDialog(false);
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
          <View style={styles.totalPriceRow}>
            <AppText style={styles.totalPriceLabel}>Total</AppText>
            <AppText style={styles.totalPriceValue}>
              ${formatNumber(totalPrice)}
            </AppText>
          </View>
          <View style={styles.buttons}>
            {orderId ? (
              <AppButton
                color="error"
                onPress={() => setShowConfirmCancel(true)}
              >
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
      {orderId && showSuccessDialog && (
        <OrderPlacedDialog
          orderId={orderId}
          onClose={() => setShowSuccessDialog(false)}
        />
      )}
      {showConfirmCancel && (
        <ConfirmDialog
          title={`Cancel Order ${orderId}`}
          text="Are you sure you want to cancel this order? This action is irreversible."
          confirmButtonColor="error"
          onConfirm={cancelOrder}
          onClose={() => setShowConfirmCancel(false)}
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
  totalPriceRow: {
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
