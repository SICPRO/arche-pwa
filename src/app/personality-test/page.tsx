'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { testApi } from '@/lib/api';

// Интерфейс для вопроса
interface Question {
  id: number;
  archetype: string;
  text: string;
}

export default function PersonalityTestPage() {
  const router = useRouter();
  
  // Состояния
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Загружаем вопросы при монтировании
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await testApi.getQuestions();
      setQuestions(data);
      
      // Инициализируем ответы (все по 3 - средний балл)
      const initialAnswers: Record<number, number> = {};
      data.forEach((q) => {
        initialAnswers[q.id] = 3;
      });
      setAnswers(initialAnswers);
      
      setIsLoading(false);
      console.log('✅ Questions loaded:', data.length);
    } catch (err: any) {
      console.error('❌ Failed to load questions:', err);
      setError('Не удалось загрузить вопросы. Попробуйте обновить страницу.');
      setIsLoading(false);
    }
  };

  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const handleNext = async () => {
    if (currentQuestion < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Последний вопрос - отправляем на бэкенд
      await handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: value[0],
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      // Отправляем ответы на бэкенд
      const result = await testApi.submitTest(answers);
      
      console.log('✅ Test submitted:', result);

      // Сохраняем результат в sessionStorage для trial-result
      sessionStorage.setItem('test_result', JSON.stringify(result));

      // Переход на экран с результатом
      router.push('/trial-result');
    } catch (err: any) {
      console.error('❌ Submit test error:', err);
      setError(err.response?.data?.detail || 'Ошибка при отправке теста. Попробуйте ещё раз.');
      setIsSubmitting(false);
    }
  };

  // Лоадер
  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#d4af37] border-t-transparent"></div>
        <p className="text-[#9ca3af]">Загрузка теста...</p>
      </div>
    );
  }

  // Ошибка загрузки
  if (error && questions.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6">
        <div className="mb-4 text-4xl">⚠️</div>
        <p className="mb-4 text-center text-[#dc2626]">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-[#d4af37] px-8 py-3 text-black hover:bg-[#d4af37]"
        >
          Обновить страницу
        </Button>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] px-6 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-[#9ca3af]">Тест личности</span>
          <span className="font-mono text-sm text-[#d4af37]">
            {currentQuestion + 1}/{totalQuestions}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <div className="flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mb-12"
          >
            <div
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
            >
              <p className="mb-12 text-center font-serif text-2xl leading-relaxed text-[#e5e5e5]">
                {currentQuestionData?.text || 'Загрузка...'}
              </p>

              <div className="space-y-6">
                <Slider
                  value={[answers[currentQuestionData?.id] || 3]}
                  onValueChange={handleSliderChange}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />

                <div className="flex justify-between text-sm text-[#9ca3af]">
                  <span>Совсем не я</span>
                  <span className="text-[#6b7280]">Иногда</span>
                  <span>Это точно я</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-[#dc2626] bg-[#dc2626]/10 p-4">
            <p className="text-sm text-[#dc2626]">{error}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <Button
              onClick={handlePrev}
              disabled={isSubmitting}
              variant="outline"
              className="flex-1 rounded-xl border-2 border-[#6b7280] bg-transparent py-6 text-[#9ca3af] hover:border-[#d4af37] hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
            >
              Назад
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex-1 rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                Обработка...
              </span>
            ) : currentQuestion < totalQuestions - 1 ? (
              'Далее'
            ) : (
              'Завершить'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}