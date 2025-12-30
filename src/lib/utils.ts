import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Утилита для объединения Tailwind классов
 * Используется во всех ShadCN компонентах
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}