import { create } from 'zustand';
import { UserInterface } from '../interfaces/user';
import { refreshTokenSchema } from './../../../../marketplace-backend/src/infra/web/routes/schemas/authentication/refresh-token.schema';

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

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  token: null,
  refreshToken: null,

  logout: () => { },
  setSession: (sessionData) => { set({ ...sessionData }) },
  updateTokens: (updateTokensData) => { set({ ...updateTokensData }) }
}))