import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { globalStyles } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const FEATURES = [
  "Affordable prices",
  "Premium designs",
  "Adapted to various ages"
];

const index = () => {
  return (
    <ScrollView contentContainerStyle={globalStyles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/homepage-intro.jpg")}
          style={styles.image}
        />
      </View>
      <View style={[globalStyles.container, styles.content]}>
        <AppText style={styles.heading} role="heading">
          Find Your Child's Next Favourite Toys
        </AppText>
        <View style={styles.featureList}>
          {FEATURES.map(feature => (
            <View key={feature} style={styles.featureItem}>
              <Ionicons name="checkmark" size={25} />
              <AppText style={styles.featureText}>{feature}</AppText>
            </View>
          ))}
        </View>
        <AppButton color="primary" onPress={() => router.navigate("/Toys")}>
          View Toys
        </AppButton>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    minHeight: 250
  },
  image: {
    width: "100%",
    height: "100%"
  },
  content: {
    paddingVertical: 27
  },
  heading: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center"
  },
  featureList: {
    gap: 3,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 33
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  featureText: {
    fontSize: 16,
    textAlign: "center"
  }
});
