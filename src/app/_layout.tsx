import { CartButton } from "@/components/CartButton";
import { Logo } from "@/components/Logo";
import {
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  useFonts
} from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, type ComponentProps } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

type IconName = ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<string, IconName> = {
  index: "home-outline",
  Toys: "storefront-outline"
};

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const [loaded, error] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
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
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 55 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 0
        },
        tabBarIcon: ({ color }) => (
          <Ionicons
            name={TAB_ICONS[route.name]}
            size={28}
            color={typeof color === "string" ? color : undefined}
          />
        ),
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
  );
}
