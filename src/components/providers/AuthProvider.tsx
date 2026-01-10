/**
 * Auth Provider - клиентский компонент для инициализации состояния пользователя
 * Используется в серверном layout.tsx через обертку
 */

'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);

  // Загружаем пользователя из localStorage при старте
  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return <>{children}</>;
}