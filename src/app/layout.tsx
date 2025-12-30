import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

// Подключаем шрифты
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

// Метаданные для SEO и PWA
export const metadata: Metadata = {
  title: 'ARCHÉ — Интеллектуальный проводник в глубину себя',
  description: 'Психологическая матрица, жизненные циклы и персональные разборы на основе архетипов',
  keywords: ['психология', 'саморазвитие', 'архетипы', 'личностный рост', 'жизненные циклы'],
  authors: [{ name: 'ARCHÉ' }],
  
  // Open Graph для соцсетей
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ARCHÉ',
    title: 'ARCHÉ — Интеллектуальный проводник в глубину себя',
    description: 'Психологическая матрица, жизненные циклы и персональные разборы',
  },
  
  // Manifest для PWA (добавим на Этапе 2)
  manifest: '/manifest.json',
  
  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ARCHÉ',
  },
};

// Viewport настройки для мобильных
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="ru" 
      className={`${inter.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <body className="antialiased">
        {/* Максимальная ширина для desktop */}
        <div className="mx-auto max-w-[430px]">
          {children}
        </div>
      </body>
    </html>
  );
}