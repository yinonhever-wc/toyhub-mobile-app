import type { IconName } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { type ColorValue, StyleSheet, View } from "react-native";

const TAB_ICONS: Record<string, IconName> = {
  index: "home-outline",
  Toys: "storefront-outline"
};

interface TabBarIconProps {
  routeName: string;
  focused: boolean;
  color: ColorValue;
}

export function TabBarIcon({ routeName, focused, color }: TabBarIconProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name={TAB_ICONS[routeName]}
        size={30}
        color={focused ? "#000" : (color as string)}
        style={styles.icon}
      />
      {focused && (
        <View style={styles.focusBackgroundWrapper}>
          <View style={styles.focusBackground} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    zIndex: 1
  },
  focusBackgroundWrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center"
  },
  focusBackground: {
    backgroundColor: "#CEE9FC99",
    height: "100%",
    width: 80,
    borderRadius: 20
  }
});
