import { Stack } from "expo-router";

export default function ToysLayout() {
  return (
    <Stack screenOptions={{ title: "Shop" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
