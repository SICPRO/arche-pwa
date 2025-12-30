import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Включаем экспериментальные фичи
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // PWA конфигурация будет добавлена на Этапе 2
  // Пока оставляем базовые настройки

  // Оптимизация для Production
  poweredByHeader: false,
  compress: true,

  // Разрешаем использовать внешние изображения (если понадобятся)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Настройка для Mobile
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;