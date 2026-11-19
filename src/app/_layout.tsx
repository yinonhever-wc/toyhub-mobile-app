import { CartButton } from "@/components/CartButton";
import { Logo } from "@/components/Logo";
import { TabBarIcon } from "@/components/TabBarIcon";
import { CartProvider } from "@/context/CartContext";
import { useAppFonts } from "@/hooks/use-app-fonts";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded, error] = useAppFonts();
  const insets = useSafeAreaInsets();

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
          tabBarIcon: props => <TabBarIcon routeName={route.name} {...props} />,
          tabBarIconStyle: { flex: 1 },
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
