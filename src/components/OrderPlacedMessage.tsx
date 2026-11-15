import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { AppText } from "./AppText";

interface OrderPlacedMessageProps {
  orderId: string;
}

export function OrderPlacedMessage({ orderId }: OrderPlacedMessageProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="checkmark-circle-outline"
        size={70}
        color={colors.primary}
        style={styles.icon}
      />
      <AppText style={styles.title} role="heading">
        Order Placed
      </AppText>
      <AppText style={styles.text}>
        <AppText style={styles.textStrong}>Order ID</AppText>: {orderId}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  icon: {
    alignSelf: "center"
  },
  title: {
    fontSize: 25,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 15,
    textAlign: "center"
  },
  text: {
    fontSize: 18,
    textAlign: "center"
  },
  textStrong: {
    fontWeight: 700
  }
});
