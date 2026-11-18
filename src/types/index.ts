import type { colors } from "@/constants/colors";
import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  shortDescription: string;
  longDescription: string;
}

export interface CartItem {
  productId: Product["id"];
  qty: number;
}

export interface PopulatedCartItem extends CartItem {
  product?: Product;
}

export type IconName = ComponentProps<typeof Ionicons>["name"];

export type ColorType = keyof typeof colors;
