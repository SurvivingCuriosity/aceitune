import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/Api.ts';

interface AuthStore {
  token: string | null;
  tokenExpiresAt: number | null; // Tiempo en el que el token expira (timestamp)
  fetchToken: () => Promise<void>;
  isTokenExpired: () => boolean; // Para verificar si el token ha caducado
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      tokenExpiresAt: null,
      fetchToken: async () => {
        const data = await api.getToken();
        const currentTime = Date.now(); // Tiempo actual en ms
        const expiresIn = data.expires_in * 1000; // `expires_in` viene en segundos, convertir a ms
        set({ 
          token: data.access_token, 
          tokenExpiresAt: currentTime + expiresIn 
        });
      },
      isTokenExpired: () => {
        const { tokenExpiresAt } = get();
        return tokenExpiresAt === null || Date.now() > tokenExpiresAt;
      },
    }),
    { name: 'authStore' },
  ),
);
