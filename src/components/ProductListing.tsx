import type { Product } from "@/types";
import { router } from "expo-router";
import type { ImageSourcePropType } from "react-native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";

/**
 * Metro bundles images at build time, so require() needs a literal string.
 * `require(`.../${name}`)` is not supported, so every image is listed here
 * and looked up by the filename stored in assets/data/toys.json.
 */
const PRODUCT_IMAGES: Record<string, ImageSourcePropType> = {
  "Wooden train set.jpg": require("../../assets/images/Wooden train set.jpg"),
  "F0413DAA-AA98-446F-915B-7C05AA820D66.webp": require("../../assets/images/F0413DAA-AA98-446F-915B-7C05AA820D66.webp"),
  "Rainbow learning blocks.jpg": require("../../assets/images/Rainbow learning blocks.jpg"),
  "Walking robot.webp": require("../../assets/images/Walking robot.webp")
};

// Used for toys in toys.json whose image file hasn't been added yet.
const PLACEHOLDER: ImageSourcePropType = require("../../assets/images/logo-glow.png");

export function getProductImage(filename: string): ImageSourcePropType {
  return PRODUCT_IMAGES[filename] ?? PLACEHOLDER;
}

interface ProductListingProps {
  product: Product;
}

export function ProductListing({ product }: ProductListingProps) {
  const goToProductPage = () => router.navigate(`/Toys/${product.id}`);

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} onPress={goToProductPage}>
        <Image source={getProductImage(product.image)} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToProductPage}>
        <AppText style={styles.title}>{product.title}</AppText>
      </TouchableOpacity>
      <AppText style={styles.price}>${product.price}</AppText>
      <AppText style={styles.description}>{product.shortDescription}</AppText>
      <AppButton
        color="primary"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={goToProductPage}
      >
        Select
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 5
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 4,
    textAlign: "center"
  },
  price: {
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 0.5,
    textAlign: "center"
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 14
  },
  button: {
    padding: 8,
    marginTop: "auto"
  },
  buttonText: {
    fontSize: 12
  }
});
