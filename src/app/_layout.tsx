import { CartButton } from "@/components/CartButton";
import { Logo } from "@/components/Logo";
import { TabBarIcon } from "@/components/TabBarIcon";
import { CartProvider } from "@/context/CartContext";
import { useAppFonts } from "@/hooks/use-app-fonts";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [loaded, error] = useAppFonts();

  if (!loaded && !error) return null;

  return (
    <CartProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerTitleStyle: {
            fontFamily: "Montserrat_200ExtraLight",
            fontSize: 30
          },
          headerTitleContainerStyle: { marginLeft: 16 },
          headerRight: () => <CartButton />,
          headerRightContainerStyle: { paddingRight: 16 },
          tabBarShowLabel: false,
          tabBarStyle: { height: 55 + insets.bottom },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              routeName={route.name}
              color={color}
              focused={focused}
            />
          ),
          tabBarIconStyle: { width: "100%", height: "100%" },
          sceneStyle: { backgroundColor: "#fff" }
        })}
      >
        <Tabs.Screen name="index" options={{ headerTitle: () => <Logo /> }} />
        <Tabs.Screen name="Toys" options={{ title: "Shop" }} />
        <Tabs.Screen
          name="ShoppingCart"
          options={{
            title: "Shopping Cart",
            headerRight: () => null,
            tabBarItemStyle: { display: "none" }
          }}
        />
      </Tabs>
    </CartProvider>
  );
}
