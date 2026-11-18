import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { Dialog } from "./Dialog";

interface ConfirmDialogProps {
  title: string;
  text: string;
  confirmButtonText?: string;
  confirmButtonColor?: keyof typeof colors;
  cancelButtonText?: string;
  cancelButtonColor?: keyof typeof colors;
  onConfirm: () => any;
  onClose: () => any;
}

export function ConfirmDialog({
  title,
  text,
  confirmButtonText = "Yes",
  confirmButtonColor = "primary",
  cancelButtonText = "No",
  cancelButtonColor = "secondary",
  onConfirm,
  onClose
}: ConfirmDialogProps) {
  return (
    <Dialog
      title={title}
      onClose={onClose}
      iconName="warning-outline"
      showDefaultButton={false}
      extraButtons={[
        {
          color: confirmButtonColor,
          text: confirmButtonText,
          onPress: () => {
            onClose();
            onConfirm();
          }
        },
        {
          color: cancelButtonColor,
          text: cancelButtonText,
          onPress: onClose
        }
      ]}
    >
      <AppText style={styles.text}>{text}</AppText>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: "center"
  }
});
