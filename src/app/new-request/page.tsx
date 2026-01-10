'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LiquidGlassTabBar } from '@/components/ui/LiquidGlassTabBar';
import { analysisApi } from '@/lib/api';

// Категории запросов
const categories = [
  { id: 'career', label: 'Карьера', icon: '💼' },
  { id: 'money', label: 'Финансы', icon: '💰' },
  { id: 'love', label: 'Любовь', icon: '❤️' },
  { id: 'passion', label: 'Страсть', icon: '🔥' },
  { id: 'mind', label: 'Разум', icon: '🧠' },
  { id: 'home', label: 'Дом', icon: '🏠' },
  { id: 'people', label: 'Люди', icon: '👥' },
  { id: 'creativity', label: 'Творчество', icon: '🎨' },
  { id: 'purpose', label: 'Предназначение', icon: '🌟' },
  { id: 'path', label: 'Путь', icon: '🧭' },
];

export default function NewRequestPage() {
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Валидация: категория выбрана и текст >= 30 символов
  const isValid = selectedCategory && text.length >= 30;
  const charCount = text.length;

  const handleSubmit = async () => {
    if (!isValid || !selectedCategory) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Отправляем запрос на бэкенд
      const result = await analysisApi.createAnalysis({
        category: selectedCategory,
        question: text,
      });

      console.log('✅ Analysis created:', result);

      // Сохраняем результат для показа на следующей странице
      sessionStorage.setItem('current_analysis', JSON.stringify(result));

      // Переход на экран результата анализа
      router.push(`/analysis-result?id=${result.id}`);
    } catch (err: any) {
      console.error('❌ Create analysis error:', err);
      
      // Обработка специфичных ошибок
      if (err.response?.status === 400) {
        const detail = err.response?.data?.detail || '';
        if (detail.includes('birth data')) {
          setError('Пожалуйста, заполните данные о рождении в профиле.');
        } else if (detail.includes('archetype test')) {
          setError('Пожалуйста, пройдите тест на архетипы.');
        } else if (detail.includes('30 characters')) {
          setError('Вопрос должен быть минимум 30 символов.');
        } else {
          setError(detail);
        }
      } else {
        setError('Ошибка при создании разбора. Попробуйте ещё раз.');
      }
      
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-28">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/80 px-6 py-4 backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="text-[#9ca3af] transition-colors hover:text-[#d4af37] disabled:opacity-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-[#e5e5e5]">Новый запрос</h1>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-serif text-2xl text-[#e5e5e5]"
        >
          Что вас волнует?
        </motion.h2>

        {/* Сетка категорий */}
        <div className="mb-8 grid grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              disabled={isSubmitting}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                selectedCategory === category.id
                  ? 'border-[#d4af37] bg-white/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              } ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
              style={
                selectedCategory === category.id
                  ? { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }
                  : {}
              }
            >
              <div className="mb-2 text-2xl">{category.icon}</div>
              <p className="text-sm text-[#e5e5e5]">{category.label}</p>
            </motion.button>
          ))}
        </div>

        {/* Текстовое поле */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-4"
        >
          <Textarea
            placeholder="Опишите ситуацию подробно..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting}
            className="min-h-[120px] resize-y rounded-xl border-2 border-[#6b7280] bg-[#1a1a1a] px-4 py-3 text-[#e5e5e5] placeholder:text-[#6b7280] transition-all focus:border-[#d4af37] focus-visible:ring-0 disabled:opacity-50"
            maxLength={500}
          />
          
          {/* Счётчик символов и подсказка */}
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-[#9ca3af]">
              {charCount < 30 ? (
                <span className="text-[#dc2626]">
                  Минимум 30 символов (ещё {30 - charCount})
                </span>
              ) : (
                <span>✓ Готово к отправке</span>
              )}
            </p>
            <span
              className={`text-sm ${
                charCount < 30 ? 'text-[#dc2626]' : 'text-[#9ca3af]'
              }`}
            >
              {charCount}/500
            </span>
          </div>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-xl border border-[#dc2626] bg-[#dc2626]/10 p-4"
          >
            <p className="text-sm text-[#dc2626]">{error}</p>
          </motion.div>
        )}

        {/* Кнопка отправки */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37] disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                Создаём разбор...
              </span>
            ) : (
              <>
                <Plus className="mr-2 h-5 w-5" />
                Получить разбор
              </>
            )}
          </Button>
        </motion.div>

        {/* Info */}
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <p className="text-center text-sm text-[#9ca3af]">
              ⏳ Обрабатываем ваш запрос через AI...
              <br />
              Это может занять до 30 секунд
            </p>
          </motion.div>
        )}
      </div>

      {/* Tab Bar */}
      <LiquidGlassTabBar />
    </div>
  );
}