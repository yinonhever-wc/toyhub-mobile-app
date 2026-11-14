import { colors } from "@/constants/colors";
import { useFonts } from "expo-font";
import { Text } from "react-native";

export function Logo() {
  const [fontsLoaded] = useFonts({
    "NicoMoji-Regular": require("@/assets/fonts/NicoMoji-Regular.ttf")
  });

  if (!fontsLoaded) return null;

  return (
    <Text
      style={{
        fontFamily: "NicoMoji-Regular",
        fontSize: 34,
        color: colors.secondary
      }}
    >
      ToyHub
    </Text>
  );
}
