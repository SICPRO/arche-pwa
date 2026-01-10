/**
 * API Client для взаимодействия с Backend
 * Использует axios с автоматической обработкой токенов
 */

import axios, { AxiosError, AxiosInstance } from 'axios';

// Базовый URL из переменных окружения
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Создаём экземпляр axios с настройками
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 секунд
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Интерцептор для добавления токена в каждый запрос
 */
apiClient.interceptors.request.use(
  (config) => {
    // Получаем токен из localStorage (если есть)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Интерцептор для обработки ошибок
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Если 401 (Unauthorized) - очищаем токен и редиректим на логин
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/registration';
      }
    }
    
    // Логируем ошибку в консоль (в dev режиме)
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    
    return Promise.reject(error);
  }
);

// ============================================================================
// ТИПЫ (TypeScript)
// ============================================================================

export interface User {
  id: string;
  email: string;
  is_verified: boolean;
  subscription_tier: 'free' | 'core' | 'lux';
  primary_archetype?: string;
  secondary_archetype?: string;
  archetype_scores?: Record<string, number>;
  birth_date?: string;
  birth_time?: string;
  birth_city?: string;
  gender?: 'male' | 'female' | 'other';
  created_at: string;
  free_analyses_left: number;
  paid_analyses_left: number;
}

export interface LoginResponse {
  message: string;
  email: string;
  dev_token: string; // Токен для тестирования в dev
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface BirthData {
  birth_date: string; // ISO format
  birth_time?: string; // "HH:MM"
  birth_city: string;
  birth_lat?: string;
  birth_lon?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface ArchetypeTest {
  answers: Record<number, number>; // {question_id: score}
}

export interface ArchetypeResult {
  primary_archetype: string;
  primary_archetype_ru: string;
  secondary_archetype: string;
  secondary_archetype_ru: string;
  scores: Record<string, number>;
  scores_detailed: Array<{
    archetype: string;
    archetype_ru: string;
    score: number;
    max_score: number;
  }>;
}

export interface AnalysisRequest {
  category: string;
  question: string;
}

export interface Analysis {
  id: string;
  category: string;
  question: string;
  context: string;
  pattern_analysis: string;
  trends: string;
  action_steps: string;
  created_at: string;
}

// ============================================================================
// API МЕТОДЫ
// ============================================================================

/**
 * AUTH API
 */
export const authApi = {
  /**
   * Отправить Magic Link на email
   */
  login: async (email: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', { email });
    return response.data;
  },

  /**
   * Проверить Magic Link и получить токен
   */
  verifyMagicLink: async (token: string): Promise<TokenResponse> => {
    const response = await apiClient.get(`/auth/verify?token=${token}`);
    
    // Сохраняем токен и пользователя в localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  /**
   * Получить текущего пользователя
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/users/me');
    
    // Обновляем данные пользователя в localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  /**
   * Выйти из аккаунта
   */
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/registration';
    }
  },
};

/**
 * USERS API
 */
export const usersApi = {
  /**
   * Сохранить данные о рождении
   */
  saveBirthData: async (data: BirthData): Promise<User> => {
    const response = await apiClient.post('/users/me/birth-data', data);
    
    // Обновляем пользователя в localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  /**
   * Поиск городов (для автокомплита)
   */
  searchCities: async (query: string): Promise<Array<{
    city: string;
    region: string;
    country: string;
    lat: string;
    lon: string;
  }>> => {
    const response = await apiClient.get(`/users/cities/search?q=${encodeURIComponent(query)}`);
    return response.data.results;
  },
};

/**
 * TEST API
 */
export const testApi = {
  /**
   * Получить вопросы теста
   */
  getQuestions: async (): Promise<Array<{
    id: number;
    archetype: string;
    text: string;
  }>> => {
    const response = await apiClient.get('/test/questions');
    return response.data.questions;
  },

  /**
   * Отправить ответы на тест
   */
  submitTest: async (answers: Record<number, number>): Promise<ArchetypeResult> => {
    const response = await apiClient.post('/test/submit', { answers });
    
    // Обновляем пользователя в localStorage (там теперь есть архетипы)
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.primary_archetype = response.data.primary_archetype;
      user.secondary_archetype = response.data.secondary_archetype;
      user.archetype_scores = response.data.scores;
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return response.data;
  },
};

/**
 * ANALYSIS API
 */
export const analysisApi = {
  /**
   * Создать новый разбор
   */
  createAnalysis: async (data: AnalysisRequest): Promise<Analysis> => {
    const response = await apiClient.post('/analysis/create', data);
    return response.data;
  },

  /**
   * Получить список всех разборов
   */
  getAnalysisList: async (): Promise<Array<{
    id: string;
    category: string;
    question: string;
    created_at: string;
  }>> => {
    const response = await apiClient.get('/analysis/list');
    return response.data.analyses;
  },

  /**
   * Получить конкретный разбор по ID
   */
  getAnalysisById: async (id: string): Promise<Analysis> => {
    const response = await apiClient.get(`/analysis/${id}`);
    return response.data;
  },
};

/**
 * ASTRO API
 */
export const astroApi = {
  /**
   * Получить натальную карту
   */
  getNatalChart: async () => {
    const response = await apiClient.get('/astro/chart');
    return response.data;
  },

  /**
   * Получить текущие транзиты
   */
  getCurrentTransits: async () => {
    const response = await apiClient.get('/astro/transits');
    return response.data;
  },
};

/**
 * PAYMENT API
 */
export const paymentApi = {
  /**
   * Получить тарифы
   */
  getPricing: async () => {
    const response = await apiClient.get('/payment/pricing');
    return response.data.pricing;
  },

  /**
   * Создать разовый платёж
   */
  createOneTimePayment: async (packageId: string, returnUrl: string) => {
    const response = await apiClient.post('/payment/create/one-time', {
      package: packageId,
      return_url: returnUrl,
    });
    return response.data;
  },

  /**
   * Создать подписку
   */
  createSubscription: async (tier: string, returnUrl: string) => {
    const response = await apiClient.post('/payment/create/subscription', {
      tier,
      return_url: returnUrl,
    });
    return response.data;
  },

  /**
   * Проверить статус платежа
   */
  checkPaymentStatus: async (paymentId: string) => {
    const response = await apiClient.get(`/payment/status/${paymentId}`);
    return response.data;
  },
};

// ============================================================================
// ЭКСПОРТ
// ============================================================================

export default apiClient;