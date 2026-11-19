import {
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";

export const useAppFonts = () =>
  useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    NicoMoji_Regular: require("@/assets/fonts/NicoMoji-Regular.ttf")
  });
