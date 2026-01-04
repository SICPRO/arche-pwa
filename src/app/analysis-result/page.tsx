'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MoreVertical, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LiquidGlassTabBar } from '@/components/ui/LiquidGlassTabBar';

export default function AnalysisResultPage() {
  const router = useRouter();

  // Моковые данные (в проде будут с бэкенда)
  const analysisData = {
    category: {
      icon: '💼',
      label: 'Карьера',
    },
    date: '15 дек',
    context: 'Вы находитесь в начале восходящего профессионального цикла. Последние 6 месяцев были периодом накопления энергии и ресурсов. Сейчас эта энергия готова реализоваться в конкретных действиях.',
    pattern: {
      main: 'Ваш архетип ИСКАТЕЛЯ проявляется через потребность в постоянном развитии и новых вызовах. Текущая ситуация — это не кризис, а естественная потребность в расширении границ.',
      historical: 'Аналогичный паттерн вы переживали в 2019 году, когда меняли сферу деятельности. Тогда решение далось сложно, но привело к значительному росту.',
    },
    trends: {
      text: 'Следующие 3 месяца — оптимальное окно для карьерных изменений. Пик возможностей придётся на февраль 2025.',
      chartData: [
        { month: 'Дек', value: 6 },
        { month: 'Янв', value: 7 },
        { month: 'Фев', value: 9 },
        { month: 'Мар', value: 7 },
      ],
    },
    steps: [
      'Составьте список из 3-5 компаний или проектов, которые вам интересны. Не ограничивайте себя «реалистичностью».',
      'Выделите 2 часа в неделю на networking в выбранных направлениях. Цикл благоприятствует новым связям.',
      'Зафиксируйте конкретную цель до 15 февраля. Период с 1 по 15 февраля — ваше окно максимальной реализации.',
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-48">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/80 px-6 py-4 backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-[#9ca3af] transition-colors hover:text-[#d4af37]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">{analysisData.category.icon}</span>
              <span className="text-sm text-[#9ca3af]">
                {analysisData.category.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#9ca3af]">{analysisData.date}</span>
            <button className="text-[#9ca3af] transition-colors hover:text-[#d4af37]">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="space-y-6 px-6 py-6">
        {/* Context Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xl">📍</span>
            <h3 className="text-sm uppercase tracking-wider text-[#d4af37]">
              Контекст
            </h3>
          </div>
          <p className="leading-relaxed text-[#e5e5e5]">
            {analysisData.context}
          </p>
        </motion.div>

        {/* Pattern Analysis Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <h3 className="text-sm uppercase tracking-wider text-[#d4af37]">
              Анализ паттерна
            </h3>
          </div>
          <div className="space-y-4 leading-relaxed text-[#e5e5e5]">
            <p>{analysisData.pattern.main}</p>
            <p className="text-[#9ca3af]">{analysisData.pattern.historical}</p>
          </div>
        </motion.div>

        {/* Trends Block with Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xl">📈</span>
            <h3 className="text-sm uppercase tracking-wider text-[#d4af37]">
              Тенденции
            </h3>
          </div>
          <p className="mb-6 leading-relaxed text-[#e5e5e5]">
            {analysisData.trends.text}
          </p>

          {/* Mini Chart */}
          <div className="relative h-24">
            <svg
              className="h-full w-full"
              viewBox="0 0 300 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="trendGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Trend Line */}
              <motion.path
                d="M0 80 Q75 60 150 40 T300 20"
                stroke="#d4af37"
                strokeWidth="2"
                fill="none"
                filter="url(#trendGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />

              {/* Peak Point (Feb) */}
              <motion.circle
                cx="150"
                cy="40"
                r="4"
                fill="#d4af37"
                filter="url(#trendGlow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 2 }}
              />

              {/* Month Labels */}
              <text x="0" y="95" fill="#9ca3af" fontSize="10">
                Дек
              </text>
              <text x="75" y="95" fill="#9ca3af" fontSize="10">
                Янв
              </text>
              <text x="145" y="95" fill="#d4af37" fontSize="10">
                Фев
              </text>
              <text x="225" y="95" fill="#9ca3af" fontSize="10">
                Мар
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Three Steps Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border-2 border-[#d4af37] bg-white/5 p-6 backdrop-blur-md"
          style={{ boxShadow: '0 0 24px rgba(212, 175, 55, 0.2)' }}
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xl">✅</span>
            <h3 className="text-sm uppercase tracking-wider text-[#d4af37]">
              Три шага прямо сейчас
            </h3>
          </div>
          <div className="space-y-4">
            {analysisData.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-black font-medium">
                  {index + 1}
                </div>
                <p className="leading-relaxed text-[#e5e5e5]">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.8,
          type: 'spring',
          stiffness: 100,
        }}
        className="fixed bottom-28 left-6 right-6 z-20 mx-auto max-w-[430px] space-y-3"
      >
        <Button
          onClick={() => router.push('/path')}
          className="w-full rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37]"
        >
          Понятно
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="
              flex-1
              rounded-xl
              py-6
              text-[#d4af37]
              border border-[#d4af37]/30
              bg-black/40
              backdrop-blur-xl
              backdrop-saturate-150
              hover:bg-[#d4af37]/15
              hover:border-[#d4af37]/50
              hover:text-[#d4af37]
              active:bg-[#d4af37]/25
              transition-all duration-300
              shadow-[0_4px_30px_rgba(0,0,0,0.3)]
            "
          >
            <Star className="mr-2 h-5 w-5" />
            Избранное
          </Button>
          <Button
            variant="outline"
            className="
            flex-1
              rounded-xl
              py-6
              text-[#d4af37]
              border border-[#d4af37]/30
              bg-black/40
              backdrop-blur-xl
              backdrop-saturate-150
              hover:bg-[#d4af37]/15
              hover:border-[#d4af37]/50
              hover:text-[#d4af37]
              active:bg-[#d4af37]/25
              transition-all duration-300
              shadow-[0_4px_30px_rgba(0,0,0,0.3)]
            "
          >
            <Share2 className="mr-2 h-5 w-5" />
            Поделиться
          </Button>
        </div>
      </motion.div>

      {/* Tab Bar */}
      <LiquidGlassTabBar />
    </div>
  );
}