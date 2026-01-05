'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCw, Target, DollarSign, MessageCircle, Home, Heart, Briefcase, Brain, Users, Palette, Compass, Eye } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { LiquidGlassTabBar } from '@/components/ui/LiquidGlassTabBar';

// 12 сфер жизни с иконками
const spheres = [
  { id: 'identity', label: 'Личность', icon: Target, value: 8, angle: 0 },
  { id: 'resource', label: 'Ресурс', icon: DollarSign, value: 6, angle: 30 },
  { id: 'communication', label: 'Связи', icon: MessageCircle, value: 7, angle: 60 },
  { id: 'roots', label: 'Корни', icon: Home, value: 9, angle: 90 },
  { id: 'creativity', label: 'Творчество', icon: Palette, value: 5, angle: 120 },
  { id: 'duty', label: 'Обязательства', icon: Briefcase, value: 7, angle: 150 },
  { id: 'partnership', label: 'Партнёрство', icon: Heart, value: 6, angle: 180 },
  { id: 'crisis', label: 'Кризис', icon: Eye, value: 8, angle: 210 },
  { id: 'meaning', label: 'Смыслы', icon: Compass, value: 7, angle: 240 },
  { id: 'goals', label: 'Цели', icon: Target, value: 8, angle: 270 },
  { id: 'freedom', label: 'Свобода', icon: Users, value: 6, angle: 300 },
  { id: 'subconscious', label: 'Подсознание', icon: Brain, value: 5, angle: 330 },
];

export default function MatrixPage() {
  const router = useRouter();

  // Функция для преобразования полярных координат в декартовы
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Генерируем точки для радарной диаграммы
  const generatePolygonPoints = () => {
    const center = 150;
    const maxRadius = 120;
    
    return spheres.map((sphere) => {
      const radius = (sphere.value / 10) * maxRadius;
      const point = polarToCartesian(center, center, radius, sphere.angle);
      return `${point.x},${point.y}`;
    }).join(' ');
  };

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
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-[#9ca3af] transition-colors hover:text-[#d4af37]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-[#e5e5e5]">Ваша матрица</h1>
          </div>
          <button className="text-[#9ca3af] transition-colors hover:text-[#d4af37]">
            <RotateCw className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Radar Chart */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
          style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.1)' }}
        >
          <div className="relative flex aspect-square items-center justify-center">
            <svg
              className="h-full w-full"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="radarGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid circles (4 уровня) */}
              {[120, 90, 60, 30].map((r, i) => (
                <motion.circle
                  key={r}
                  cx="150"
                  cy="150"
                  r={r}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{ transformOrigin: 'center' }}
                />
              ))}

              {/* Rays (12 линий от центра) */}
              {spheres.map((sphere, i) => {
                const point = polarToCartesian(150, 150, 120, sphere.angle);
                return (
                  <motion.line
                    key={i}
                    x1="150"
                    y1="150"
                    x2={point.x}
                    y2={point.y}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.03 }}
                  />
                );
              })}

              {/* Data polygon (заливка) */}
              <motion.polygon
                points={generatePolygonPoints()}
                fill="rgba(212, 175, 55, 0.2)"
                stroke="#d4af37"
                strokeWidth="2"
                filter="url(#radarGlow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, type: 'spring', stiffness: 80 }}
                style={{ transformOrigin: 'center' }}
              />

              {/* Data points (точки на вершинах) */}
              {spheres.map((sphere, i) => {
                const radius = (sphere.value / 10) * 120;
                const point = polarToCartesian(150, 150, radius, sphere.angle);
                return (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#d4af37"
                    filter="url(#radarGlow)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1 + i * 0.05 }}
                    style={{ transformOrigin: 'center' }}
                  />
                );
              })}

              {/* Labels (названия сфер) */}
              {spheres.map((sphere, i) => {
                const labelRadius = 140;
                const point = polarToCartesian(150, 150, labelRadius, sphere.angle);
                return (
                  <text
                    key={i}
                    x={point.x}
                    y={point.y}
                    fill="#d4af37"
                    fontSize="11"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {sphere.label}
                  </text>
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Spheres List (список сфер с прогресс-барами) */}
        <div className="space-y-4">
          <h3 className="mb-4 text-sm uppercase tracking-wider text-[#e5e5e5]">
            Ключевые сферы
          </h3>
          {spheres.slice(0, 6).map((sphere, index) => {
            const Icon = sphere.icon;
            return (
              <motion.div
                key={sphere.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:scale-[1.02] hover:border-white/20"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[#d4af37]" />
                    <span className="text-[#e5e5e5]">{sphere.label}</span>
                  </div>
                  <span className="font-mono text-[#d4af37]">
                    {sphere.value}/10
                  </span>
                </div>
                <Progress value={sphere.value * 10} className="h-2" />
              </motion.div>
            );
          })}

          {/* Кнопка "Показать все" */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.8 }}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-4 text-center text-sm text-[#9ca3af] transition-all hover:border-[#d4af37]/50 hover:bg-white/10 hover:text-[#d4af37]"
          >
            Показать все 12 сфер
          </motion.button>
        </div>
      </div>

      {/* Tab Bar */}
      <LiquidGlassTabBar />
    </div>
  );
}