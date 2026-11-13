import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IconName = ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<string, IconName> = {
  index: "home-outline",
  Toys: "storefront-outline"
};

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 55 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 0
        },
        tabBarIcon: ({ color }) => {
          return (
            <Ionicons
              name={TAB_ICONS[route.name]}
              size={28}
              color={color as string}
            />
          );
        }
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="Toys" options={{ title: "Shop" }} />
      <Tabs.Screen
        name="ShoppingCart"
        options={{
          title: "Shopping Cart",
          tabBarItemStyle: { display: "none" }
        }}
      />
    </Tabs>
  );
}
