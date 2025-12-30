'use client';

import { motion } from 'framer-motion';
import { Settings, Briefcase, Heart, Plus, Home, Grid3X3, MessageSquare, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function PathPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-32">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/80 px-6 py-4 backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#1e1b4b]" />
            <span className="text-[#e5e5e5]">Ваш путь, Анна</span>
          </div>
          <button className="text-[#9ca3af] transition-colors hover:text-[#d4af37]">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="space-y-6 px-6 py-6">
        {/* Waveform Graph */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.1)' }}
        >
          <h3 className="mb-4 text-sm uppercase tracking-wider text-[#d4af37]">
            Ваш цикл
          </h3>
          <div className="relative h-[250px]">
            <svg
              className="h-full w-full"
              viewBox="0 0 400 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Gradient fills */}
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Positive zone */}
              <path
                d="M0 125 Q50 75 100 100 T200 80 Q250 70 300 90 T400 100 L400 125 L0 125 Z"
                fill="url(#goldGradient)"
              >
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Negative zone */}
              <path
                d="M0 125 L0 250 L400 250 L400 125 Q350 150 300 140 T200 160 Q150 170 100 150 T0 125 Z"
                fill="url(#indigoGradient)"
              >
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Main wave */}
              <path
                d="M0 125 Q50 75 100 100 T200 80 Q250 70 300 90 T400 100"
                stroke="#d4af37"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="1000"
                  to="0"
                  dur="2s"
                  fill="freeze"
                />
              </path>

              {/* Current position line */}
              <line
                x1="250"
                y1="0"
                x2="250"
                y2="250"
                stroke="#d4af37"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0.4;0.8;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Current position dot */}
              <circle cx="250" cy="85" r="6" fill="#d4af37" filter="url(#glow)">
                <animate
                  attributeName="r"
                  values="6;8;6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Year labels */}
              <text x="0" y="240" fill="#9ca3af" fontSize="12">
                2022
              </text>
              <text x="100" y="240" fill="#9ca3af" fontSize="12">
                2023
              </text>
              <text x="200" y="240" fill="#9ca3af" fontSize="12">
                2024
              </text>
              <text x="300" y="240" fill="#9ca3af" fontSize="12">
                2025
              </text>
            </svg>

            {/* "Сейчас" badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="absolute left-[60%] top-4 rounded-full bg-[#d4af37] px-3 py-1 text-xs text-black"
              style={{ boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)' }}
            >
              Сейчас
            </motion.div>
          </div>
        </motion.div>

        {/* Current Cycle */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <h3 className="mb-4 text-sm uppercase tracking-wider text-[#d4af37]">
            Текущий цикл
          </h3>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[#e5e5e5]">Сила цикла</span>
            <span className="font-mono text-[#d4af37]">7/10</span>
          </div>
          <Progress value={70} className="h-2" />
        </motion.div>

        {/* Important Now */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="mb-4 text-sm uppercase tracking-wider text-[#e5e5e5]">
            Сейчас важно
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              { icon: Briefcase, label: 'Карьера', desc: 'Время для роста' },
              { icon: Heart, label: 'Отношения', desc: 'Укреплять связи' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="min-w-[200px] rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-transform hover:scale-105"
              >
                <item.icon className="mb-2 h-6 w-6 text-[#d4af37]" />
                <p className="text-sm text-[#e5e5e5]">{item.label}</p>
                <p className="mt-1 text-xs text-[#9ca3af]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Opportunities & Warnings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-3"
        >
          <div className="rounded-xl border-l-4 border-[#10b981] bg-white/5 p-4 backdrop-blur-md">
            <p className="mb-1 text-xs uppercase tracking-wider text-[#10b981]">
              Возможность
            </p>
            <p className="text-sm text-[#e5e5e5]">
              Следующие 2 недели — идеальное время для запуска новых проектов
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-[#dc2626] bg-white/5 p-4 backdrop-blur-md">
            <p className="mb-1 text-xs uppercase tracking-wider text-[#dc2626]">
              Предупреждение
            </p>
            <p className="text-sm text-[#e5e5e5]">
              Избегайте важных решений в конце месяца
            </p>
          </div>
        </motion.div>
      </div>

      {/* New Request Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 100 }}
        className="fixed bottom-28 left-6 right-6 z-20 mx-auto max-w-[430px]"
      >
        <Button
          onClick={() => {
            window.location.href = '/new-request';
          }}
          className="w-full rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37]"
        >
          <Plus className="mr-2 h-5 w-5" />
          Новый запрос
        </Button>
      </motion.div>

      {/* Tab Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-[430px] rounded-[24px] border border-white/10 bg-[#121212]/70 px-2 py-3 backdrop-blur-md">
        <div className="flex items-center justify-around">
          {[
            { id: 'path', label: 'Путь', icon: Home, href: '/path' },
            { id: 'matrix', label: 'Матрица', icon: Grid3X3, href: '/matrix' },
            { id: 'history', label: 'Запросы', icon: MessageSquare, href: '/history' },
            { id: 'more', label: 'Ещё', icon: MoreHorizontal, href: '/pricing' },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  window.location.href = tab.href;
                }}
                className={`flex flex-col items-center gap-1 rounded-2xl px-6 py-2 transition-colors ${
                  tab.id === 'path'
                    ? 'bg-[#d4af37]/15 text-[#d4af37]'
                    : 'text-white/50 hover:text-[#d4af37]'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}