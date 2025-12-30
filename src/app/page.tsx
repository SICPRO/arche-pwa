'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SplashPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Генерируем частицы только на клиенте
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    
    // Генерируем позиции частиц один раз при монтировании
    const newParticles = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    // Автоматический переход на онбординг через 2 секунды
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* Background particles - рендерим только на клиенте */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#d4af37]"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-4">
        {/* Логотип появляется из темноты (без вращения) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1], // Эффект "elastic"
          }}
        >
          <motion.h1
            className="font-serif text-5xl text-[#d4af37]"
            style={{
              textShadow: '0 0 40px rgba(212, 175, 55, 0.5)',
            }}
            animate={{
              textShadow: [
                '0 0 40px rgba(212, 175, 55, 0.5)',
                '0 0 60px rgba(212, 175, 55, 0.8)',
                '0 0 40px rgba(212, 175, 55, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            ARCHÉ
          </motion.h1>
        </motion.div>

        {/* Линия под логотипом */}
        <motion.div
          className="h-[1px] bg-[#d4af37]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 60, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
          }}
        />

        {/* Подзаголовок */}
        <motion.p
          className="mt-4 text-sm text-[#9ca3af]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Интеллектуальный проводник в глубину себя
        </motion.p>
      </div>
    </div>
  );
}