import type { ColorType } from "@/types";
import { Dialog } from "./Dialog";

interface ConfirmDialogProps {
  title: string;
  text: string;
  confirmButtonText?: string;
  confirmButtonColor?: ColorType;
  cancelButtonText?: string;
  cancelButtonColor?: ColorType;
  onConfirm: () => void;
  onClose: () => void;
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
