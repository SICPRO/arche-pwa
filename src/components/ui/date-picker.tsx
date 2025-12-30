'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder = 'Выберите дату' }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(value || new Date(1990, 0)); // По умолчанию 1990 год

  // Генерируем годы (от 1920 до текущего года)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => currentYear - i);

  // Месяцы
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-14 w-full justify-start rounded-xl border-2 border-[#6b7280] bg-[#1a1a1a] px-4 text-left font-normal transition-all hover:border-[#d4af37] hover:bg-[#1a1a1a]',
            !value && 'text-[#6b7280]'
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5 text-[#d4af37]" />
          {value ? (
            <span className="text-[#e5e5e5]">
              {format(value, 'd MMMM yyyy', { locale: ru })}
            </span>
          ) : (
            <span className="text-[#6b7280]">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-auto border-[#6b7280] bg-[#1a1a1a] p-0" align="start">
        {/* Селекторы года и месяца */}
        <div className="flex items-center justify-between border-b border-[#6b7280] px-4 py-3">
          {/* Выбор месяца */}
          <select
            value={month.getMonth()}
            onChange={(e) => {
              const newMonth = new Date(month);
              newMonth.setMonth(parseInt(e.target.value));
              setMonth(newMonth);
            }}
            className="rounded-lg border border-[#6b7280] bg-[#0a0a0a] px-3 py-1.5 text-sm text-[#e5e5e5] focus:border-[#d4af37] focus:outline-none"
          >
            {months.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>

          {/* Выбор года */}
          <select
            value={month.getFullYear()}
            onChange={(e) => {
              const newMonth = new Date(month);
              newMonth.setFullYear(parseInt(e.target.value));
              setMonth(newMonth);
            }}
            className="rounded-lg border border-[#6b7280] bg-[#0a0a0a] px-3 py-1.5 text-sm text-[#e5e5e5] focus:border-[#d4af37] focus:outline-none"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Календарь */}
        <DayPicker
          mode="single"
          selected={value}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          locale={ru}
          classNames={{
            months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center',
            caption_label: 'text-sm font-medium text-[#e5e5e5]',
            nav: 'space-x-1 flex items-center',
            nav_button: 'h-7 w-7 bg-transparent p-0 text-[#9ca3af] hover:text-[#d4af37]',
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell: 'text-[#9ca3af] rounded-md w-9 font-normal text-[0.8rem]',
            row: 'flex w-full mt-2',
            cell: 'h-9 w-9 text-center text-sm p-0 relative hover:bg-[#d4af37]/10 rounded-md',
            day: 'h-9 w-9 p-0 font-normal text-[#e5e5e5] hover:bg-[#d4af37]/20 rounded-md',
            day_selected: 'bg-[#d4af37] text-black hover:bg-[#d4af37] hover:text-black',
            day_today: 'bg-[#6b7280]/20 text-[#e5e5e5]',
            day_outside: 'text-[#6b7280] opacity-50',
            day_disabled: 'text-[#6b7280] opacity-50',
            day_hidden: 'invisible',
          }}
          components={{
            IconLeft: () => <ChevronLeft className="h-4 w-4" />,
            IconRight: () => <ChevronRight className="h-4 w-4" />,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}