import { createSelectors } from '@app/store/createSelectors';
import { create } from 'zustand';

type AuthStore = {
  isAuth: boolean;
  setAuth: (value: boolean) => void;
};

const useAuthStoreBase = create<AuthStore>((set) => ({
  isAuth: false,
  setAuth: (value) => set({ isAuth: value }),
}));

export const useAuthStore = createSelectors(useAuthStoreBase);
