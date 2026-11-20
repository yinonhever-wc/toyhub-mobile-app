import { StyleSheet, Text, type TextProps } from "react-native";

const WEIGHTS: Record<string, string> = {
  "200": "Montserrat_200ExtraLight",
  "300": "Montserrat_300Light",
  "400": "Montserrat_400Regular",
  "500": "Montserrat_500Medium",
  "600": "Montserrat_600SemiBold",
  "700": "Montserrat_700Bold",
  "800": "Montserrat_800ExtraBold",
  light: "Montserrat_300Light",
  normal: "Montserrat_400Regular",
  bold: "Montserrat_700Bold"
};

const DEFAULT_WEIGHT = "400";

export function AppText({ style, ...props }: TextProps) {
  const flatStyle = StyleSheet.flatten(style) || {};
  const weightKey = flatStyle.fontWeight?.toString() ?? DEFAULT_WEIGHT;
  const fontFamily = WEIGHTS[weightKey] ?? WEIGHTS[DEFAULT_WEIGHT];

  return (
    <Text {...props} style={[style, { fontFamily, fontWeight: undefined }]} />
  );
}
