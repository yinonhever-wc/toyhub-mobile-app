import { colors } from "@/constants/colors";
import { useFonts } from "expo-font";
import { StyleSheet, Text } from "react-native";

export function Logo() {
  const [fontsLoaded] = useFonts({
    "NicoMoji-Regular": require("@/assets/fonts/NicoMoji-Regular.ttf")
  });

  if (!fontsLoaded) return null;

  return <Text style={styles.logo}>ToyHub</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: "NicoMoji-Regular",
    fontSize: 34,
    color: colors.secondary,
    transform: [{ translateY: -2 }]
  }
});
