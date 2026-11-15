import { colors } from "@/constants/colors";
import type { IconName } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import type { PropsWithChildren } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp
} from "react-native-reanimated";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";

interface DialogProps extends PropsWithChildren {
  title: string;
  showIcon?: boolean;
  iconName?: IconName;
  iconSize?: number;
  iconColor?: keyof typeof colors;
  onClose: () => any;
}

export function Dialog({
  title,
  showIcon = true,
  iconName = "checkmark-circle-outline",
  iconSize = 75,
  iconColor = "primary",
  onClose,
  children
}: DialogProps) {
  return (
    <View style={styles.wrapper}>
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
        style={styles.overlay}
      >
        <Pressable style={styles.overlayPressable} onPress={onClose} />
      </Animated.View>
      <Animated.View
        entering={FadeInDown.duration(300)}
        exiting={FadeOutUp.duration(300)}
        style={styles.dialog}
      >
        <ScrollView contentContainerStyle={styles.dialogContainer}>
          {showIcon && (
            <Ionicons
              name={iconName}
              size={iconSize}
              color={colors[iconColor]}
              style={styles.icon}
            />
          )}
          <AppText style={styles.title} role="heading">
            {title}
          </AppText>
          {children && <View style={styles.content}>{children}</View>}
          <AppButton color="secondary" onPress={onClose}>
            Continue
          </AppButton>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    paddingHorizontal: 16
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#00000080"
  },
  overlayPressable: {
    width: "100%",
    height: "100%"
  },
  dialog: {
    maxHeight: "90%",
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 5
  },
  dialogContainer: {
    flexGrow: 1,
    paddingHorizontal: 13,
    paddingVertical: 18
  },
  icon: {
    alignSelf: "center"
  },
  title: {
    marginBottom: 26,
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center"
  },
  content: {
    marginBottom: 40
  }
});
