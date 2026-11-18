import { StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { Dialog } from "./Dialog";

interface OrderPlacedDialogProps {
  orderId: string;
  onClose: () => any;
}

export function OrderPlacedDialog({
  orderId,
  onClose
}: OrderPlacedDialogProps) {
  return (
    <Dialog title="Successfully Placed Order" onClose={onClose}>
      <AppText style={styles.text}>
        <AppText style={styles.textStrong}>Order ID</AppText>: {orderId}
      </AppText>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18
  },
  textStrong: {
    fontWeight: 700
  }
});
