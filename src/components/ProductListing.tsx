import type { Product } from "@/types";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";

interface ProductListingProps {
  product: Product;
}

export function ProductListing({ product }: ProductListingProps) {
  const goToProductPage = () => router.navigate(`/Toys/${product.id}`);

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} onPress={goToProductPage}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToProductPage}>
        <AppText style={styles.title} role="heading">
          {product.title}
        </AppText>
      </TouchableOpacity>
      <AppText style={styles.price}>${product.price}</AppText>
      <AppText style={styles.description}>{product.shortDescription}</AppText>
      <AppButton
        color="primary"
        small
        style={styles.button}
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
    marginTop: "auto"
  }
});
