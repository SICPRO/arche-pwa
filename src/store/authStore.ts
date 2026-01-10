/**
 * Zustand Store для управления состоянием пользователя
 */

import { create } from 'zustand';
import { User, authApi } from '@/lib/api';

interface AuthState {
  // Состояние
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Действия
  setUser: (user: User | null) => void;
  loadUserFromStorage: () => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Начальное состояние
  user: null,
  isLoading: false,
  isAuthenticated: false,

  /**
   * Установить пользователя
   */
  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  /**
   * Загрузить пользователя из localStorage при старте приложения
   */
  loadUserFromStorage: () => {
    if (typeof window !== 'undefined') {
      try {
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('access_token');

        if (userStr && token) {
          const user = JSON.parse(userStr);
          set({
            user,
            isAuthenticated: true,
          });
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
      }
    }
  },

  /**
   * Выйти из аккаунта
   */
  logout: () => {
    authApi.logout();
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  /**
   * Обновить данные пользователя с сервера
   */
  refreshUser: async () => {
    set({ isLoading: true });

    try {
      const user = await authApi.getCurrentUser();
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to refresh user:', error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));