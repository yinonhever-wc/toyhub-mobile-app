import { Link } from "expo-router";
import { Text, View } from "react-native";

const Toys = () => {
  const toyId = 53;

  return (
    <View>
      <Text>Toys page content here</Text>
      <Link style={{ marginTop: 50 }} href="/ShoppingCart">
        Go to shopping cart
      </Link>
      <Link style={{ marginTop: 50 }} href={`/Toys/${toyId}`}>
        Go to toys details
      </Link>
    </View>
  );
};

export default Toys;
