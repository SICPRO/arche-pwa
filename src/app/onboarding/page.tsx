'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Слайды онбординга
const slides = [
  {
    title: 'Психология — это наука о циклах',
    subtitle: 'Ваша жизнь подчиняется паттернам. Мы их знаем.',
    visual: 'wave1',
  },
  {
    title: 'Каждая фаза имеет смысл',
    subtitle: 'Кризисы и подъёмы — части одного пути.',
    visual: 'wave2',
  },
  {
    title: 'Управляйте циклами осознанно',
    subtitle: 'Предвидьте перемены и принимайте верные решения.',
    visual: 'wave3',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const slide = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    } else {
      // Последний слайд → переход на регистрацию
      router.push('/registration');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#0a0a0a] px-6 py-12">
      {/* Visual - анимированная волна */}
      <div className="mb-12 flex h-[40vh] items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full"
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#1e1b4b" />
                </linearGradient>
                <filter id="waveGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Главная волна */}
              <motion.path
                d="M0 150 Q100 100 200 150 T400 150"
                stroke="url(#waveGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#waveGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
              
              {/* Вторая волна (полупрозрачная) */}
              <motion.path
                d="M0 180 Q100 130 200 180 T400 180"
                stroke="url(#waveGradient)"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
              />
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Текст слайда */}
      <div className="mb-8 flex-1 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-serif text-3xl text-[#e5e5e5]">
              {slide.title}
            </h2>
            <p className="text-[#9ca3af]">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Индикаторы (точки) */}
      <div className="mb-8 flex justify-center gap-2">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-[#d4af37]' : 'bg-[#6b7280]'
            }`}
            animate={{
              width: index === currentSlide ? 32 : 8,
            }}
            transition={{ duration: 0.3 }}
            style={
              index === currentSlide
                ? { boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)' }
                : {}
            }
          />
        ))}
      </div>

      {/* Кнопка "Далее" / "Начать" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button
          onClick={handleNext}
          className="w-full rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37]"
        >
          {currentSlide < slides.length - 1 ? 'Далее' : 'Начать'}
        </Button>
      </motion.div>
    </div>
  );
}