'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ArchetypeResult {
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

export default function TrialResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<ArchetypeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Загружаем результат из sessionStorage
    const savedResult = sessionStorage.getItem('test_result');
    
    if (savedResult) {
      try {
        const parsed = JSON.parse(savedResult);
        setResult(parsed);
        console.log('✅ Test result loaded:', parsed);
      } catch (err) {
        console.error('❌ Failed to parse test result:', err);
      }
    } else {
      console.warn('⚠️ No test result found, redirecting to test');
      // Если нет результата, редирект на тест
      router.push('/personality-test');
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading || !result) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#d4af37] border-t-transparent"></div>
        <p className="text-[#9ca3af]">Загрузка результата...</p>
      </div>
    );
  }

  // Процент редкости (просто для визуала)
  const rarity = Math.floor(100 / 12); // 12 архетипов

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="font-serif text-3xl text-[#e5e5e5]">
          Ваша базовая конфигурация
        </h1>
      </motion.div>

      {/* Main Archetype */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md"
      >
        <div className="mb-6 flex justify-center">
          {/* 3D Geometric Shape */}
          <svg
            className="h-32 w-32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Hexagon */}
            <motion.path
              d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
              stroke="#d4af37"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
              d="M50 25 L75 37.5 L75 62.5 L50 75 L25 62.5 L25 37.5 Z"
              stroke="#d4af37"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </svg>
        </div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-2 font-serif text-4xl text-[#d4af37]"
        >
          {result.primary_archetype_ru.toUpperCase()}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-[#9ca3af]"
        >
          Редкость: {rarity}% населения
        </motion.p>

        {/* Secondary Archetype */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mt-4"
        >
          <Badge className="bg-[#1e1b4b] text-[#9ca3af] hover:bg-[#1e1b4b]">
            Вторичный: {result.secondary_archetype_ru}
          </Badge>
        </motion.div>
      </motion.div>

      {/* Top 3 Archetypes Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
      >
        <h3 className="mb-4 text-sm uppercase tracking-wider text-[#d4af37]">
          Ваши ведущие архетипы
        </h3>
        
        <div className="space-y-3">
          {result.scores_detailed.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.archetype}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.8 + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af37]/20 text-sm font-bold text-[#d4af37]">
                  {index + 1}
                </span>
                <span className="text-[#e5e5e5]">{item.archetype_ru}</span>
              </div>
              <span className="font-mono text-[#9ca3af]">
                {item.score}/{item.max_score}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Retrospective Card (МОКОВАЯ - в будущем с бэкенда) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="mb-8 rounded-2xl border-2 border-[#d4af37] bg-white/5 p-6 backdrop-blur-md"
        style={{ boxShadow: '0 0 24px rgba(212, 175, 55, 0.2)' }}
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">📍</span>
          <h3 className="text-sm uppercase tracking-wider text-[#d4af37]">
            Как вы проживали прошлые циклы
          </h3>
        </div>

        <Badge className="mb-4 bg-[#d4af37] px-3 py-1 text-black hover:bg-[#d4af37]">
          2017-2019
        </Badge>

        <p className="leading-relaxed text-[#e5e5e5]">
          В период с 2017 по 2019 год вы, скорее всего, пережили кризис
          профессиональной идентичности. Возможно, это была смена работы, переезд
          или разрыв важных отношений. Вы чувствовали, что "старая жизнь" больше
          не работает.
        </p>
        
        <p className="mt-4 text-sm text-[#9ca3af]">
          💡 В будущем здесь будет персонализированная ретроспектива на основе вашего возраста и архетипов
        </p>
      </motion.div>

      {/* Current State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
        className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
      >
        <h3 className="mb-3 text-sm uppercase tracking-wider text-[#d4af37]">
          Где вы сейчас
        </h3>
        <p className="text-[#9ca3af]">
          Вы находитесь в фазе восходящего цикла. Следующие 8 месяцев — идеальное
          время для новых начинаний и смелых решений. Энергия накоплена, теперь
          её нужно направить в правильное русло.
        </p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className="rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-[#1e1b4b]/20 p-6 backdrop-blur-md"
      >
        <p className="mb-4 text-center text-[#e5e5e5]">
          Хотите узнать, что вас ждёт в 2025-2027?
        </p>
        
        <Button
          onClick={() => router.push('/path')}
          className="mb-3 w-full rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37]"
        >
          Перейти к главному экрану
        </Button>
        
        <button
          onClick={() => router.push('/pricing')}
          className="w-full py-3 text-center text-sm text-[#9ca3af] underline transition-colors hover:text-[#d4af37]"
        >
          Посмотреть все тарифы
        </button>
      </motion.div>
    </div>
  );
}