import { colors } from "@/constants/colors";
import type { IconName } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, type PropsWithChildren } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp
} from "react-native-reanimated";
import { AppButton, type AppButtonProps } from "./AppButton";
import { AppText } from "./AppText";

interface DialogButton extends AppButtonProps {
  text: string;
}

interface DialogProps extends PropsWithChildren {
  title: string;
  showIcon?: boolean;
  iconName?: IconName;
  iconSize?: number;
  iconColor?: keyof typeof colors;
  showDefaultButton?: boolean;
  extraButtons?: DialogButton[];
  onClose: () => any;
}

export function Dialog({
  title,
  showIcon = true,
  iconName = "checkmark-circle-outline",
  iconSize = 75,
  iconColor = "primary",
  showDefaultButton = true,
  extraButtons,
  onClose,
  children
}: DialogProps) {
  const buttons = useMemo(() => {
    const items: DialogButton[] = [];
    if (showDefaultButton)
      items.push({ color: "secondary", text: "Continue", onPress: onClose });
    if (extraButtons) items.push(...extraButtons);
    return items;
  }, [showDefaultButton, extraButtons]);

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
          <View style={styles.buttons}>
            {buttons.map(item => (
              <View key={item.text} style={styles.buttonWrapper}>
                <AppButton small {...item}>
                  {item.text}
                </AppButton>
              </View>
            ))}
          </View>
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
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  buttonWrapper: {
    flexGrow: 1,
    flexBasis: "40%"
  }
});
