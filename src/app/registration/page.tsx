'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { authApi } from '@/lib/api';

export default function RegistrationPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Валидация email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValid = isValidEmail(email);

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError('');

    try {
      // Отправляем запрос на бэкенд
      const response = await authApi.login(email);

      console.log('✅ Magic link sent:', response);

      // В dev режиме сразу переходим с dev_token
      if (response.dev_token) {
        // Верифицируем токен
        await authApi.verifyMagicLink(response.dev_token);

        // Переходим на следующий экран
        router.push('/data-input');
      } else {
        // В prod показываем сообщение о том, что письмо отправлено
        alert(`Письмо с Magic Link отправлено на ${email}. Проверьте почту!`);
      }
    } catch (err: any) {
      console.error('❌ Login error:', err);
      setError(err.response?.data?.detail || 'Ошибка при отправке письма. Попробуйте ещё раз.');
    } finally {
      setIsLoading(false);
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
              if (e.key === 'Enter' && isValid && !isLoading) {
                handleSubmit();
              }
            }}
            disabled={isLoading}
            className="h-14 rounded-xl border-2 border-[#6b7280] bg-[#1a1a1a] px-4 text-[#e5e5e5] transition-all placeholder:text-[#6b7280] focus:border-[#d4af37] focus-visible:ring-0"
          />

          {/* Ошибка */}
          {error && (
            <p className="mt-2 text-sm text-[#dc2626]">{error}</p>
          )}
        </div>

        {/* Кнопка продолжить */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className="w-full rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37] disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? 'Отправка...' : 'Продолжить'}
        </Button>
      </div>
    </div>
  );
}