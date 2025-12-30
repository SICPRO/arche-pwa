'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function RegistrationPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  // Валидация email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValid = isValidEmail(email);

  const handleSubmit = () => {
    if (isValid) {
      // TODO: Отправка magic link на бэкенд
      // Пока просто переходим на следующий экран
      router.push('/data-input');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#0a0a0a] px-6 py-8">
      {/* Header - кнопка назад */}
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-[#9ca3af] transition-colors hover:text-[#d4af37]"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Назад</span>
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 font-serif text-3xl text-[#e5e5e5]">
            Инициализация профиля
          </h1>
          <p className="text-[#9ca3af]">Введите email. Мы не спамим.</p>
        </div>

        {/* Поле ввода email */}
        <div className="mb-8">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isValid) {
                handleSubmit();
              }
            }}
            className="h-14 rounded-xl border-2 border-[#6b7280] bg-[#1a1a1a] px-4 text-[#e5e5e5] transition-all placeholder:text-[#6b7280] focus:border-[#d4af37] focus-visible:ring-0"
          />
        </div>

        {/* Кнопка продолжить */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37] disabled:opacity-50 disabled:hover:scale-100"
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
}