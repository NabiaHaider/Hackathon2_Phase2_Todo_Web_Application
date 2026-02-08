// frontend/lib/state/cart-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of a CartItem
interface CartItem {
  productId: string;
  quantity: number;
  variant: {
    type: 'color' | 'size';
    value: string;
  };
  priceAtTimeOfAdd: number;
}

// Define the shape of the CartStore state
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantType: 'color' | 'size', variantValue: string) => void;
  updateQuantity: (productId: string, variantType: 'color' | 'size', variantValue: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) =>
              i.productId === item.productId &&
              i.variant.type === item.variant.type &&
              i.variant.value === item.variant.value
          );

          if (existingItemIndex > -1) {
            // Update quantity if item already exists
            const updatedItems = state.items.map((i, index) =>
              index === existingItemIndex
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
            return { items: updatedItems };
          } else {
            // Add new item
            return { items: [...state.items, item] };
          }
        });
      },
      removeItem: (productId, variantType, variantValue) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.variant.type === variantType &&
                item.variant.value === variantValue
              )
          ),
        }));
      },
      updateQuantity: (productId, variantType, variantValue, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId &&
            item.variant.type === variantType &&
            item.variant.value === variantValue
              ? { ...item, quantity: quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);
