import type { ColorType } from "@/types";
import { Dialog } from "./Dialog";

interface ConfirmDialogProps {
  title: string;
  text: string;
  confirmButtonText?: string;
  confirmButtonColor?: ColorType;
  cancelButtonText?: string;
  cancelButtonColor?: ColorType;
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
      {text}
    </Dialog>
  );
}
