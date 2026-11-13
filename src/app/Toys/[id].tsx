import { useLocalSearchParams, usePathname } from "expo-router";
import { Text, View } from "react-native";

export default function ToyDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pathname = usePathname();

  return (
    <View style={{ flex: 1, backgroundColor: "yellow", padding: 24 }}>
      <Text style={{ color: "black", fontSize: 24 }}>
        Toy ID: {id} ({pathname})
      </Text>
    </View>
  );
}
