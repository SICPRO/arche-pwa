'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { usersApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { format } from 'date-fns';

export default function DataInputPage() {
  const router = useRouter();
  const refreshUser = useAuthStore((state) => state.refreshUser);
  
  // Состояния формы
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [skipTime, setSkipTime] = useState(false);
  
  // Состояния загрузки
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Валидация: дата, город и пол обязательны
  const isValid = birthDate && birthCity && gender !== null;

  const handleSubmit = async () => {
    if (!isValid || !birthDate) return;

    setIsLoading(true);
    setError('');

    try {
      // Формируем данные для отправки
      const data = {
        birth_date: format(birthDate, 'yyyy-MM-dd'), // ISO формат
        birth_time: skipTime ? undefined : birthTime || undefined,
        birth_city: birthCity,
        gender: gender,
      };

      // Отправляем на бэкенд
      await usersApi.saveBirthData(data);

      console.log('✅ Birth data saved:', data);

      // Обновляем пользователя в глобальном состоянии
      await refreshUser();

      // Переход на тест личности
      router.push('/personality-test');
    } catch (err: any) {
      console.error('❌ Save birth data error:', err);
      setError(err.response?.data?.detail || 'Ошибка при сохранении данных. Попробуйте ещё раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] px-6 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-serif text-3xl text-[#e5e5e5]">
          Калибровка персонального цикла
        </h1>
        <p className="text-sm text-[#9ca3af]">
          Для точного анализа нам нужны координаты вашего старта
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        {/* Пол */}
        <div>
          <Label className="mb-3 block text-[#e5e5e5]">Пол</Label>
          <div className="flex gap-3">
            <button
              onClick={() => setGender('male')}
              disabled={isLoading}
              className={`flex-1 rounded-xl border-2 px-6 py-4 text-center transition-all ${
                gender === 'male'
                  ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                  : 'border-[#6b7280] bg-[#1a1a1a] text-[#9ca3af] hover:border-[#d4af37]/50'
              }`}
              style={
                gender === 'male'
                  ? { boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' }
                  : {}
              }
            >
              <div className="mb-1 text-2xl">♂</div>
              <div className="text-sm font-medium">Мужской</div>
            </button>
            
            <button
              onClick={() => setGender('female')}
              disabled={isLoading}
              className={`flex-1 rounded-xl border-2 px-6 py-4 text-center transition-all ${
                gender === 'female'
                  ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                  : 'border-[#6b7280] bg-[#1a1a1a] text-[#9ca3af] hover:border-[#d4af37]/50'
              }`}
              style={
                gender === 'female'
                  ? { boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' }
                  : {}
              }
            >
              <div className="mb-1 text-2xl">♀</div>
              <div className="text-sm font-medium">Женский</div>
            </button>
          </div>
          <p className="mt-2 text-xs text-[#9ca3af]">
            Влияет на интерпретацию архетипов
          </p>
        </div>

        {/* Дата рождения */}
        <div>
          <Label className="mb-2 block text-[#e5e5e5]">Дата рождения</Label>
          <DatePicker
            value={birthDate}
            onChange={setBirthDate}
            placeholder="Выберите дату"
          />
          <p className="mt-2 text-sm text-[#9ca3af]">Фундамент вашей матрицы</p>
        </div>

        {/* Время рождения */}
        {!skipTime && (
          <div>
            <Label className="mb-2 block text-[#e5e5e5]">Время рождения</Label>
            <Input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              disabled={isLoading}
              className="h-14 rounded-xl border-2 border-[#6b7280] bg-[#1a1a1a] px-4 text-[#e5e5e5] transition-all focus:border-[#d4af37] focus-visible:ring-0"
            />
            <p className="mt-2 text-sm text-[#d4af37]">
              Влияет на точность на 40%
            </p>
            <button
              onClick={() => setSkipTime(true)}
              disabled={isLoading}
              className="mt-2 text-sm text-[#9ca3af] underline transition-colors hover:text-[#d4af37]"
            >
              Не знаю
            </button>
          </div>
        )}

        {skipTime && (
          <div className="rounded-xl border border-[#6b7280] bg-[#1a1a1a] p-4">
            <p className="text-sm text-[#9ca3af]">
              ⏰ Время рождения пропущено. Точность прогноза будет снижена.
            </p>
            <button
              onClick={() => setSkipTime(false)}
              disabled={isLoading}
              className="mt-2 text-sm text-[#d4af37] underline transition-colors hover:text-[#d4af37]/80"
            >
              Добавить время
            </button>
          </div>
        )}

        {/* Город рождения */}
        <div>
          <Label className="mb-2 block text-[#e5e5e5]">Город рождения</Label>
          <Input
            type="text"
            placeholder="Москва"
            value={birthCity}
            onChange={(e) => setBirthCity(e.target.value)}
            disabled={isLoading}
            className="h-14 rounded-xl border-2 border-[#6b7280] bg-[#1a1a1a] px-4 text-[#e5e5e5] transition-all placeholder:text-[#6b7280] focus:border-[#d4af37] focus-visible:ring-0"
          />
          <p className="mt-2 text-sm text-[#9ca3af]">
            Для расчёта геолокационных паттернов
          </p>
        </div>

        {/* Ошибка */}
        {error && (
          <div className="rounded-xl border border-[#dc2626] bg-[#dc2626]/10 p-4">
            <p className="text-sm text-[#dc2626]">{error}</p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!isValid || isLoading}
        className="mt-8 w-full rounded-xl bg-[#d4af37] py-6 text-black shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-[1.02] hover:bg-[#d4af37] disabled:opacity-50 disabled:hover:scale-100"
      >
        {isLoading ? 'Сохранение...' : 'Далее'}
      </Button>
    </div>
  );
}