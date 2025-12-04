import { create } from 'zustand';
import { UserInterface } from '../interfaces/user';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface setSessionParams {
  user: UserInterface;
  token: string;
  refreshToken: string;
}

interface updateTokensParams {
  token: string;
  refreshToken: string;
}

export interface UserStore {
  user: UserInterface | null;
  token: string | null;
  refreshToken: string | null;

  setSession: (sessionData: setSessionParams) => void;
  logout: () => void;
  updateTokens: (updateTokensData: updateTokensParams) => void;
}

export const useUserStore = create<UserStore>()(persist((set) => ({
  user: null,
  token: null,
  refreshToken: null,

  logout: () =>
    set({
      user: null,
      token: null,
      refreshToken: null
    }),
  setSession: (sessionData) => { set({ ...sessionData }) },
  updateTokens: (updateTokensData) => { set({ ...updateTokensData }) }
}), {
  name: 'marketplace-auth',
  storage: createJSONStorage(() => AsyncStorage),
})
);