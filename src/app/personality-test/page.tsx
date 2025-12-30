'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

// Моковые вопросы (в проде будут с бэкенда)
const MOCK_QUESTIONS = [
  'Я часто чувствую потребность в переменах и новых впечатлениях',
  'Мне важно чувствовать стабильность и предсказуемость в жизни',
  'Я предпочитаю контролировать ситуацию, а не плыть по течению',
  'Я легко адаптируюсь к новым обстоятельствам и условиям',
  'Я склонен глубоко анализировать свои эмоции и переживания',
  'Мне важно помогать другим людям и заботиться о них',
  'Я часто берусь за несколько дел одновременно',
  'Мне нравится планировать всё заранее до мелочей',
  'Я предпочитаю действовать, а не размышлять',
  'Мне важно быть признанным и оценённым окружающими',
  'Я легко выражаю свои чувства и эмоции',
  'Мне комфортно в одиночестве',
  // ... добавим ещё 24 вопроса (всего 36)
  'Я склонен к риску и экспериментам',
  'Мне важна гармония в отношениях',
  'Я часто ищу смысл в происходящем',
  'Я предпочитаю следовать правилам и нормам',
  'Мне нравится быть в центре внимания',
  'Я легко доверяю людям',
  'Мне важно быть независимым',
  'Я часто сомневаюсь в своих решениях',
  'Мне нравится помогать другим решать проблемы',
  'Я предпочитаю теорию практике',
  'Мне важно быть справедливым',
  'Я легко меняю своё мнение',
  'Мне нравится создавать что-то новое',
  'Я предпочитаю работать в команде',
  'Мне важна свобода выбора',
  'Я часто откладываю дела на потом',
  'Мне нравится учиться новому',
  'Я предпочитаю конкретику абстракции',
  'Мне важно быть честным',
  'Я легко прощаю обиды',
  'Мне нравится конкурировать',
  'Я предпочитаю избегать конфликтов',
  'Мне важно найти своё предназначение',
  'Я легко принимаю изменения в жизни',
];

export default function PersonalityTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(36).fill(3));
  const [direction, setDirection] = useState(1);

  const totalQuestions = MOCK_QUESTIONS.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Последний вопрос - переходим к результатам
      console.log('Test completed! Answers:', answers);
      window.location.href = '/trial-result';
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value[0];
    setAnswers(newAnswers);
  };

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
                {MOCK_QUESTIONS[currentQuestion]}
              </p>

              <div className="space-y-6">
                <Slider
                  value={[answers[currentQuestion]]}
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

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <Button
              onClick={() => {
                setDirection(-1);
                setCurrentQuestion(currentQuestion - 1);
              }}
              variant="outline"
              className="flex-1 rounded-xl border-2 border-[#6b7280] bg-transparent py-6 text-[#9ca3af] hover:border-[#d4af37] hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
            >
              Назад
            </Button>
          )}

          <Button
            onClick={handleNext}
            className="flex-1 rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37]"
          >
            {currentQuestion < totalQuestions - 1 ? 'Далее' : 'Завершить'}
          </Button>
        </div>
      </div>
    </div>
  );
}