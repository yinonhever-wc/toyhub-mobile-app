import { colors } from "@/constants/colors";
import { StyleSheet, Text } from "react-native";

export function Logo() {
  return <Text style={styles.logo}>ToyHub</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: "NicoMoji_Regular",
    fontSize: 34,
    color: colors.secondary,
    transform: [{ translateY: -2 }]
  }
});
