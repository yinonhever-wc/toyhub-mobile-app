import { globalStyles } from "@/constants/globalStyles";
import { Stack } from "expo-router";

export default function ToysLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: globalStyles.scene
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
