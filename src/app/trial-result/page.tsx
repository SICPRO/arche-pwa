'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TrialResultPage() {
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
          ИСКАТЕЛЬ
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-[#9ca3af]"
        >
          12% населения
        </motion.p>
      </motion.div>

      {/* Retrospective Card (KILLER FEATURE) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
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
          не работает. Это был период глубокой трансформации, когда старые методы
          перестали приносить результат.
        </p>
      </motion.div>

      {/* Current State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
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
        transition={{ duration: 0.6, delay: 1.8 }}
        className="rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-[#1e1b4b]/20 p-6 backdrop-blur-md"
      >
        <p className="mb-4 text-center text-[#e5e5e5]">
          Хотите узнать, что вас ждёт в 2025-2027?
        </p>
        
        <Button
          onClick={() => {
            window.location.href = '/path';
          }}
          className="mb-3 w-full rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37]"
        >
          Разблокировать ПУТЬ за 490 ₽
        </Button>
        
        <button
          onClick={() => {
            window.location.href = '/pricing';
          }}
          className="w-full py-3 text-center text-sm text-[#9ca3af] underline transition-colors hover:text-[#d4af37]"
        >
          Посмотреть все тарифы
        </button>
      </motion.div>
    </div>
  );
}