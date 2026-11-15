import { colors } from "@/constants/colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";

interface QtyControlsProps {
  value: number;
  onChange: (v: number) => any;
  disabled?: boolean;
}

export function QtyControls({
  value,
  onChange,
  disabled = false
}: QtyControlsProps) {
  return (
    <View style={[styles.controls, disabled && styles.disabled]}>
      <TouchableOpacity
        disabled={disabled}
        hitSlop={10}
        onPress={() => onChange(value - 1)}
      >
        <AppText style={styles.buttonText}>-</AppText>
      </TouchableOpacity>
      <AppText style={styles.valueText}>{value}</AppText>
      <TouchableOpacity
        disabled={disabled}
        hitSlop={10}
        onPress={() => onChange(value + 1)}
      >
        <AppText style={styles.buttonText}>+</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    backgroundColor: colors.tertiary,
    borderRadius: 5,
    paddingHorizontal: 14.5,
    height: 45,
    width: 92,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  disabled: {
    opacity: 0.5
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
