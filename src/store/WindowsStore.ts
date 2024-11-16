import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WindowKind } from '../windows/WindowKind';

interface WindowsStore {
  ventanaAbierta: WindowKind | null;
  abrirVentana: (ventana: WindowKind) => void;
  cerrarVentana: () => void;
}

export const useWindowsStore = create<WindowsStore>()(
  persist(
    (set) => ({
      ventanaAbierta: null,
      abrirVentana: (ventana) => {
        set({ ventanaAbierta: ventana });
      },
      cerrarVentana: () => set({ ventanaAbierta: null }),
    }),
    { name: 'WindowsStore' },
  ),
);
