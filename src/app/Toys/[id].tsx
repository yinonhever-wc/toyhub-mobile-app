import products from "@/assets/data/toys.json";
import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { globalStyles } from "@/constants/globalStyles";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
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

  return (
    <ScrollView
      contentContainerStyle={[globalStyles.screen, globalStyles.container]}
    >
      <View style={styles.detailContainer}>
        <Image source={getProductImage(product.image)} style={styles.image} />
        <AppText style={styles.title}>{product.title}</AppText>
        <AppText style={styles.price}>${product.price}</AppText>
        <AppText style={styles.productId}>
          <AppText style={styles.productIdLabel}>Product ID</AppText>:{" "}
          {product.id}
        </AppText>
        <AppText style={styles.description}>{product.longDescription}</AppText>
      </View>
      <View style={styles.buttons}>
        <AppButton color="primary">Add to Cart</AppButton>
        <AppButton color="secondary" onPress={() => router.navigate("/Toys")}>
          See More Toys
        </AppButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1
  },
  image: {
    width: "100%",
    height: 265,
    borderRadius: 5
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 18,
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
