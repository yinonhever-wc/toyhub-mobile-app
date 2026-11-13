import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="Toys" options={{ title: "Shop" }} />
      <Tabs.Screen
        name="ShoppingCart"
        options={{
          title: "Shopping Cart",
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
