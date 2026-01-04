'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Grid3X3, MessageSquare, MoreHorizontal } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: typeof Home;
  href: string;
}

const tabs: Tab[] = [
  { id: 'path', label: 'Путь', icon: Home, href: '/path' },
  { id: 'matrix', label: 'Матрица', icon: Grid3X3, href: '/matrix' },
  { id: 'history', label: 'Запросы', icon: MessageSquare, href: '/history' },
  { id: 'more', label: 'Ещё', icon: MoreHorizontal, href: '/pricing' },
];

export function LiquidGlassTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Определяем активную вкладку по текущему пути
  const getActiveTab = () => {
    // Для new-request считаем активной History (так как это часть потока запросов)
    if (pathname === '/new-request' || pathname === '/analysis-result') {
      return 'history';
    }
    
    const activeTab = tabs.find(tab => pathname === tab.href);
    return activeTab?.id || 'path';
  };

  const activeTabId = getActiveTab();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 100 }}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-[430px] rounded-[24px] px-2 py-3"
      style={{
        background: 'rgba(18, 18, 18, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '0.5px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabId === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              className="relative flex flex-col items-center gap-1 rounded-2xl px-6 py-2"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Активный индикатор (подложка) */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-2xl bg-[#d4af37]/15"
                  style={{
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Иконка с анимацией */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon
                  className={`relative h-5 w-5 transition-colors duration-300 ${
                    isActive ? 'text-[#d4af37]' : 'text-white/50'
                  }`}
                  style={
                    isActive
                      ? {
                          filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
                        }
                      : {}
                  }
                />
              </motion.div>

              {/* Лейбл */}
              <span
                className={`relative text-[10px] transition-colors duration-300 ${
                  isActive ? 'text-[#d4af37]' : 'text-white/50'
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}