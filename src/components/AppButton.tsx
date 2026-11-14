import { colors } from "@/constants/colors";
import type { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type TouchableOpacityProps
} from "react-native";
import { AppText } from "./AppText";

export function AppButton({
  children,
  color,
  style,
  textStyle,
  ...props
}: TouchableOpacityProps & {
  children: ReactNode;
  color: keyof typeof colors;
  textStyle?: StyleProp<TextStyle>;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: colors[color] }]}
      activeOpacity={0.7}
      accessibilityRole="button"
      {...props}
    >
      <AppText style={[styles.text, textStyle]}>{children}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 100,
    padding: 9
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center"
  }
});
