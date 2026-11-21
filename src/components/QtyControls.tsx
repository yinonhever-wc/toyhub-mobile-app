import { colors } from "@/constants/colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";

interface QtyControlsProps {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
}

export function QtyControls({
  value,
  onChange,
  disabled = false,
  minValue,
  maxValue
}: QtyControlsProps) {
  const decrementDisabled = minValue !== undefined && value <= minValue;
  const incrementDisabled = maxValue !== undefined && value >= maxValue;

  return (
    <View style={[styles.controls, disabled && styles.controlsDisabled]}>
      <TouchableOpacity
        disabled={disabled || decrementDisabled}
        hitSlop={10}
        onPress={() => onChange(value - 1)}
        style={decrementDisabled && styles.buttonDisabled}
      >
        <AppText style={styles.buttonText}>-</AppText>
      </TouchableOpacity>
      <AppText style={styles.valueText}>{value}</AppText>
      <TouchableOpacity
        disabled={disabled || incrementDisabled}
        hitSlop={10}
        onPress={() => onChange(value + 1)}
        style={incrementDisabled && styles.buttonDisabled}
      >
        <AppText style={styles.buttonText}>+</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    backgroundColor: colors.tertiary,
    borderRadius: 100,
    paddingHorizontal: 14.5,
    height: 45,
    width: 92,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  controlsDisabled: {
    opacity: 0.5
  },
  buttonDisabled: {
    opacity: 0.2
  },
  valueText: {
    fontSize: 15,
    fontWeight: "600"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600"
  }
});
