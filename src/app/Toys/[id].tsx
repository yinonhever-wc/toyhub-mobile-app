import products from "@/assets/data/toys.json";
import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { Dialog } from "@/components/Dialog";
import { globalStyles } from "@/constants/globalStyles";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  type ImageSourcePropType
} from "react-native";

/**
 * Metro bundles images at build time, so require() needs a literal string.
 * `require(`.../${name}`)` is not supported, so every image is listed here
 * and looked up by the filename stored in assets/data/toys.json.
 */
const PRODUCT_IMAGES: Record<string, ImageSourcePropType> = {
  "Wooden train set.jpg": require("@/assets/images/Wooden train set.jpg"),
  "F0413DAA-AA98-446F-915B-7C05AA820D66.webp": require("@/assets/images/F0413DAA-AA98-446F-915B-7C05AA820D66.webp"),
  "Rainbow learning blocks.jpg": require("@/assets/images/Rainbow learning blocks.jpg"),
  "Walking robot.webp": require("@/assets/images/Walking robot.webp")
};

// Used for toys in toys.json whose image file hasn't been added yet.
const PLACEHOLDER: ImageSourcePropType = require("@/assets/images/logo-glow.png");

export function getProductImage(filename: string): ImageSourcePropType {
  return PRODUCT_IMAGES[filename] ?? PLACEHOLDER;
}

export default function ToyDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = useMemo(() => products.find(item => item.id === id), [id]);

  if (!product) return;

  const [showDialog, setShowDialog] = useState(false);

  const addToCart = () => {
    setShowDialog(true);
  };

  return (
    <View style={[{ flex: 1 }]}>
      <ScrollView contentContainerStyle={globalStyles.screen}>
        <Image source={getProductImage(product.image)} style={styles.image} />
        <View style={[globalStyles.container, styles.content]}>
          <View style={styles.detailWrapper}>
            <AppText style={styles.title} role="heading">
              {product.title}
            </AppText>
            <AppText style={styles.price}>${product.price}</AppText>
            <AppText style={styles.productId}>
              <AppText style={styles.productIdLabel}>Product ID</AppText>:{" "}
              {product.id}
            </AppText>
            <AppText style={styles.description}>
              {product.longDescription}
            </AppText>
          </View>
          <View style={styles.buttons}>
            <AppButton color="primary" onPress={addToCart}>
              Add to Cart
            </AppButton>
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
    fontWeight: 700
  },
  description: {
    fontSize: 14,
    lineHeight: 19
  },
  buttons: {
    gap: 10,
    marginTop: 29
  }
});
