// frontend/lib/state/ui-store.ts
import { create } from 'zustand';

interface UiStore {
  isMiniCartOpen: boolean;
  isMobileMenuOpen: boolean;
  toggleMiniCart: () => void;
  toggleMobileMenu: () => void;
  closeMiniCart: () => void;
  closeMobileMenu: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  isMiniCartOpen: false,
  isMobileMenuOpen: false,
  toggleMiniCart: () => set((state) => ({ isMiniCartOpen: !state.isMiniCartOpen })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMiniCart: () => set({ isMiniCartOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
