'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X, Check, Sparkles, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LiquidGlassTabBar } from '@/components/ui/LiquidGlassTabBar';

// Тарифные планы
const plans = [
  {
    id: 'free',
    name: 'FREE',
    price: null,
    description: 'Базовые возможности',
    icon: Sparkles,
    features: [
      'Полный тест на архетипы',
      'Просмотр главного экрана "ПУТЬ"',
      '1 бесплатный разбор после теста',
      'Просмотр матрицы (без интерактива)',
    ],
    current: true,
    highlight: false,
    premium: false,
  },
  {
    id: 'core',
    name: 'CORE',
    price: '1990 ₽',
    period: '/месяц',
    description: 'Для регулярного использования',
    icon: Zap,
    features: [
      'Всё из FREE',
      'Безлимитные разборы',
      'Интерактивная матрица с деталями',
      'Экспорт истории в TXT',
      'Без рекламы',
      'Приоритетная скорость (<30 сек)',
    ],
    popular: true,
    highlight: true,
    premium: false,
  },
  {
    id: 'lux',
    name: 'LUX',
    price: '4990 ₽',
    period: '/месяц',
    description: 'Максимальная глубина анализа',
    icon: Crown,
    features: [
      'Всё из CORE',
      'PDF-отчёты с дизайном',
      'Ежемесячный транзитный прогноз',
      'Ранний доступ к новым фичам',
      'Email-поддержка (24ч)',
    ],
    popular: false,
    highlight: false,
    premium: true,
  },
];

// Разовые покупки
const oneTimePurchases = [
  { 
    id: '1-analysis',
    label: '1 разбор', 
    price: '490 ₽', 
    discount: null,
    savings: null,
  },
  { 
    id: '5-analyses',
    label: '5 разборов', 
    price: '1850 ₽', 
    discount: '−25%',
    savings: 'Экономия 600 ₽',
    originalPrice: '2450 ₽',
  },
  { 
    id: '10-analyses',
    label: '10 разборов', 
    price: '2940 ₽', 
    discount: '−40%',
    savings: 'Экономия 1960 ₽',
    originalPrice: '4900 ₽',
  },
];

export default function PricingPage() {
  const router = useRouter();

  const handleSelectPlan = (planId: string) => {
    // TODO: Интеграция с платёжной системой
    console.log('Selected plan:', planId);
    
    // Пока просто показываем уведомление
    alert(`Вы выбрали тариф: ${planId}`);
  };

  const handlePurchase = (purchaseId: string) => {
    // TODO: Интеграция с платёжной системой
    console.log('Selected purchase:', purchaseId);
    
    alert(`Вы выбрали: ${purchaseId}`);
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
          <h1 className="text-xl font-medium text-[#e5e5e5]">Выберите тариф</h1>
          <button
            onClick={() => router.back()}
            className="text-[#9ca3af] transition-colors hover:text-[#d4af37]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Subscription Plans */}
        <div className="mb-12 space-y-4">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className={`relative rounded-2xl p-6 backdrop-blur-md transition-all ${
                  plan.highlight
                    ? 'border-2 border-[#d4af37] bg-white/10'
                    : plan.premium
                    ? 'border-2 border-white/20 bg-gradient-to-br from-[#d4af37]/10 to-[#1e1b4b]/10'
                    : 'border border-white/10 bg-white/5'
                }`}
                style={
                  plan.highlight
                    ? { boxShadow: '0 0 24px rgba(212, 175, 55, 0.2)' }
                    : plan.premium
                    ? { boxShadow: '0 0 20px rgba(30, 27, 75, 0.2)' }
                    : {}
                }
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <Badge className="absolute -top-3 left-6 bg-[#d4af37] px-3 py-1 text-black hover:bg-[#d4af37]">
                    ⭐ Популярный
                  </Badge>
                )}

                {/* Premium Badge */}
                {plan.premium && (
                  <Badge className="absolute -top-3 right-6 bg-gradient-to-r from-[#d4af37] to-[#1e1b4b] px-3 py-1 text-white">
                    👑 Премиум
                  </Badge>
                )}

                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        plan.highlight
                          ? 'bg-[#d4af37]/20'
                          : plan.premium
                          ? 'bg-gradient-to-br from-[#d4af37]/20 to-[#1e1b4b]/20'
                          : 'bg-white/5'
                      }`}
                    >
                      <Icon
                        className={
                          plan.highlight || plan.premium
                            ? 'h-6 w-6 text-[#d4af37]'
                            : 'h-6 w-6 text-[#9ca3af]'
                        }
                      />
                    </div>
                    <div>
                      <h3 className="mb-1 font-serif text-2xl text-[#e5e5e5]">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-[#9ca3af]">{plan.description}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                {plan.price && (
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-3xl font-bold text-[#d4af37]">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-[#9ca3af]">{plan.period}</span>
                      )}
                    </div>
                  </div>
                )}

                {plan.current && (
                  <div className="mb-6">
                    <Badge className="bg-[#10b981] text-white hover:bg-[#10b981]">
                      ✓ Текущий тариф
                    </Badge>
                  </div>
                )}

                {/* Features */}
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#10b981]" />
                      <span className="text-sm leading-relaxed text-[#e5e5e5]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={plan.current}
                  className={`w-full rounded-xl py-6 transition-transform ${
                    plan.current
                      ? 'cursor-not-allowed bg-[#1a1a1a] text-[#6b7280]'
                      : plan.highlight
                      ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/30 hover:scale-[1.02] hover:bg-[#d4af37]'
                      : plan.premium
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#1e1b4b] text-white hover:scale-[1.02]'
                      : 'border-2 border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37]/10'
                  }`}
                >
                  {plan.current ? 'Текущий тариф' : 'Выбрать'}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* One-time Purchases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm uppercase tracking-wider text-[#e5e5e5]">
              Разовые покупки
            </h3>
            <span className="text-xs text-[#9ca3af]">Без подписки</span>
          </div>

          <div className="space-y-3">
            {oneTimePurchases.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-[#e5e5e5]">{item.label}</span>
                    {item.discount && (
                      <Badge className="bg-[#10b981] text-white hover:bg-[#10b981]">
                        {item.discount}
                      </Badge>
                    )}
                  </div>
                  {item.savings && (
                    <span className="text-xs text-[#9ca3af]">
                      {item.savings}
                      {item.originalPrice && (
                        <span className="ml-2 line-through opacity-50">
                          {item.originalPrice}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <Button
                  onClick={() => handlePurchase(item.id)}
                  variant="outline"
                  className="rounded-lg border-2 border-[#d4af37] bg-transparent px-6 py-2 text-[#d4af37] hover:bg-[#d4af37]/10"
                >
                  {item.price}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
        >
          <p className="text-center text-xs leading-relaxed text-[#9ca3af]">
            💳 Принимаем карты Visa, MasterCard, МИР
            <br />
            🔒 Все платежи защищены через YooKassa
            <br />
            ♻️ Подписку можно отменить в любой момент
          </p>
        </motion.div>
      </div>

      {/* Tab Bar */}
      <LiquidGlassTabBar />
    </div>
  );
}