import products from "@/assets/data/toys.json";
import type { CartItem, PopulatedCartItem } from "@/types";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren
} from "react";

export interface CartContextType {
  cartItems: CartItem[];
  populatedCartItems: PopulatedCartItem[];
  totalCartItems: number;
  totalPrice: number;
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQty: (productId: string, qty: number) => void;
  clearItems: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const populatedCartItems = useMemo(
    () =>
      cartItems.map<PopulatedCartItem>(cartItem => ({
        ...cartItem,
        product: products?.find(product => product.id === cartItem.productId)
      })),
    [cartItems, products]
  );

  const totalCartItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () =>
      populatedCartItems.reduce(
        (sum, item) => sum + (item.product?.price ?? 0) * item.qty,
        0
      ),
    [populatedCartItems]
  );

  const addItem = (productId: string, qty = 1) => {
    const clonedItems = [...cartItems];
    const existingItem = clonedItems.find(item => item.productId === productId);
    if (existingItem) {
      const index = clonedItems.indexOf(existingItem);
      clonedItems.splice(index, 1, {
        ...existingItem,
        qty: existingItem.qty + qty
      });
    } else {
      clonedItems.push({ productId, qty });
    }
    setCartItems(clonedItems);
  };

  const removeItem = (productId: string) =>
    setCartItems(cartItems.filter(item => item.productId !== productId));

  const updateItemQty = (productId: string, qty: number) => {
    if (qty === 0) return removeItem(productId);
    const clonedItems = [...cartItems];
    const item = clonedItems.find(item => item.productId === productId);
    if (!item) return;
    const index = clonedItems.indexOf(item);
    clonedItems.splice(index, 1, { ...item, qty });
    setCartItems(clonedItems);
  };

  const clearItems = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        populatedCartItems,
        totalCartItems,
        totalPrice,
        addItem,
        removeItem,
        updateItemQty,
        clearItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext) as CartContextType;
