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

export type IconName = ComponentProps<typeof Ionicons>["name"];
