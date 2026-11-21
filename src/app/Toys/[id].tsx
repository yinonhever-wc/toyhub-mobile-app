import products from "@/assets/data/toys.json";
import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { Dialog } from "@/components/Dialog";
import { QtyControls } from "@/components/QtyControls";
import { globalStyles } from "@/constants/globalStyles";
import { useCart } from "@/context/CartContext";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ToyDetail() {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [showDialog, setShowDialog] = useState(false);

  const { id } = useLocalSearchParams();

  const product = useMemo(() => products.find(item => item.id === id), [id]);

  if (!product) return null;

  const addToCart = () => {
    addItem(product.id, qty);
    setShowDialog(true);
  };

  return (
    <View style={globalStyles.screen}>
      <ScrollView contentContainerStyle={globalStyles.screen}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={[globalStyles.container, styles.content]}>
          <View style={styles.detailWrapper}>
            <AppText style={styles.title} role="heading">
              {product.title}
            </AppText>
            <AppText style={styles.price}>${product.price}</AppText>
            <AppText style={styles.productId}>
              <AppText style={styles.productIdLabel}>Product ID</AppText>:
              {" " + product.id}
            </AppText>
            <AppText style={styles.description}>
              {product.longDescription}
            </AppText>
          </View>
          <View style={styles.buttons}>
            <View style={styles.addToCartRow}>
              <AppButton
                color="primary"
                onPress={addToCart}
                style={styles.addToCartButton}
              >
                Add to Cart
              </AppButton>
              <QtyControls
                value={qty}
                onChange={setQty}
                minValue={1}
                autoHeight
              />
            </View>
            <AppButton
              color="secondary"
              onPress={() => router.navigate("/Toys")}
            >
              See More Toys
            </AppButton>
          </View>
        </View>
      </ScrollView>
      {showDialog && (
        <Dialog
          title="Added to Cart"
          extraButtons={[
            {
              color: "primary",
              text: "Go to Cart",
              onPress: () => router.navigate("/ShoppingCart")
            }
          ]}
          onClose={() => setShowDialog(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350
  },
  content: {
    flex: 1
  },
  detailWrapper: {
    flex: 1
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8
  },
  price: {
    fontSize: 20,
    fontWeight: "300",
    letterSpacing: 0.7,
    textAlign: "center",
    marginBottom: 13
  },
  productId: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15
  },
  productIdLabel: {
    fontWeight: "700",
    marginRight: 4
  },
  description: {
    fontSize: 14,
    lineHeight: 19
  },
  buttons: {
    gap: 10,
    marginTop: 29
  },
  addToCartRow: {
    flexDirection: "row",
    gap: 8
  },
  addToCartButton: {
    flex: 1
  }
});
