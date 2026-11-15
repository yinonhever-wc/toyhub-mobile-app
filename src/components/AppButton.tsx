import { colors } from "@/constants/colors";
import {
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type TouchableOpacityProps
} from "react-native";
import { AppText } from "./AppText";

export interface AppButtonProps extends TouchableOpacityProps {
  color: keyof typeof colors;
  small?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export function AppButton({
  children,
  color,
  small = false,
  style,
  textStyle,
  ...props
}: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        small && styles.smallButton,
        props.disabled && styles.disabledButton,
        style,
        { backgroundColor: colors[color] }
      ]}
      activeOpacity={0.7}
      role="button"
      {...props}
    >
      <AppText style={[styles.text, small && styles.smallText, textStyle]}>
        {children}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 100,
    paddingVertical: 9,
    paddingHorizontal: 12
  },
  smallButton: {
    paddingVertical: 8
  },
  disabledButton: {
    opacity: 0.6
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center"
  },
  smallText: {
    fontSize: 12
  }
});
