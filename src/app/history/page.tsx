'use client';

import { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { LiquidGlassTabBar } from '@/components/ui/LiquidGlassTabBar';
import { useRouter } from 'next/navigation';

const filters = [
  { id: 'all', label: 'Все' },
  { id: 'favorites', label: 'Избранное' },
  { id: 'career', label: '💼 Карьера' },
  { id: 'money', label: '💰 Финансы' },
  { id: 'love', label: '❤️ Любовь' },
];

const analyses = [
  {
    id: '1',
    category: 'career',
    categoryIcon: '💼',
    categoryLabel: 'Карьера',
    question: 'Стоит ли мне сейчас менять работу? Чувствую, что застряла...',
    date: '15 дек',
    isFavorite: true,
  },
  {
    id: '2',
    category: 'love',
    categoryIcon: '❤️',
    categoryLabel: 'Отношения',
    question: 'Как понять, что отношения действительно исчерпали себя?',
    date: '10 дек',
    isFavorite: false,
  },
  {
    id: '3',
    category: 'money',
    categoryIcon: '💰',
    categoryLabel: 'Финансы',
    question: 'Хочу начать инвестировать, но не знаю, правильное ли сейчас время',
    date: '5 дек',
    isFavorite: true,
  },
];

export default function HistoryScreen() {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-28">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/80 px-6 py-4 backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-[#9ca3af] transition-colors hover:text-[#d4af37]"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-[#e5e5e5]">История</h1>
          </div>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-[#9ca3af] transition-colors hover:text-[#d4af37]"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="border-b border-white/10 px-6 py-4"
      >
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${
                activeFilter === filter.id
                  ? 'bg-[#d4af37] text-black'
                  : 'border border-white/10 bg-white/5 text-[#9ca3af] hover:border-white/20'
              }`}
              style={
                activeFilter === filter.id
                  ? { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }
                  : {}
              }
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Analyses List */}
      <div className="px-6 py-6">
        <div className="space-y-4">
          {analyses.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/analysis-result?id=${analysis.id}`)}   // ← самое главное здесь!
              className="
                w-full rounded-xl border border-white/10 
                bg-white/5 p-4 text-left 
                transition-all hover:border-white/20 hover:bg-white/10 
                cursor-pointer
              "
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{analysis.categoryIcon}</span>
                  <span className="text-sm text-[#9ca3af]">
                    {analysis.categoryLabel}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // ← останавливаем всплытие, чтобы звёздочка не кликала по карточке
                      // Здесь в будущем будет логика добавления/удаления из избранного
                    }}
                    className="transition-colors"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        analysis.isFavorite
                          ? 'fill-[#d4af37] text-[#d4af37]'
                          : 'text-[#6b7280]'
                      }`}
                    />
                  </button>
                  <ChevronRight className="h-4 w-4 text-[#6b7280]" />
                </div>
              </div>

              <p className="mb-3 line-clamp-2 text-[#e5e5e5]">
                {analysis.question}
              </p>

              <span className="text-xs text-[#9ca3af]">{analysis.date}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
            <LiquidGlassTabBar />
    </div>
  );
}