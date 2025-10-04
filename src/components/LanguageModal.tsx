import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";
import { Language } from "@/lib/i18n";
import { X, Globe, DollarSign } from "lucide-react";

interface LanguageModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function LanguageModal({ open, setOpen }: LanguageModalProps) {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency);

  if (!open) return null;

  const handleApply = () => {
    setLanguage(selectedLang);
    setCurrency(selectedCurrency);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[70]">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-2xl w-96 shadow-2xl border border-gray-700/50 z-[80]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-white flex items-center space-x-2">
            <Globe className="w-6 h-6 text-yellow-400" />
            <span>Dil ve Para Birimi</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <label className="mb-3 text-sm font-medium text-white/80 flex items-center space-x-2">
            <Globe className="w-4 h-4 text-yellow-400" />
            <span>Dil</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedLang('tr')}
              className={`p-3 rounded-lg border transition-all ${
                selectedLang === 'tr'
                  ? 'bg-yellow-600 border-yellow-600 text-white'
                  : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-medium">🇹🇷</div>
                <div className="text-sm">Türkçe</div>
              </div>
            </button>
            <button
              onClick={() => setSelectedLang('en')}
              className={`p-3 rounded-lg border transition-all ${
                selectedLang === 'en'
                  ? 'bg-yellow-600 border-yellow-600 text-white'
                  : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-medium">🇺🇸</div>
                <div className="text-sm">English</div>
              </div>
            </button>
          </div>
        </div>

        {/* Currency Selection */}
        <div className="mb-8">
          <label className="mb-3 text-sm font-medium text-white/80 flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span>Para Birimi</span>
          </label>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setSelectedCurrency('TRY')}
              className={`p-3 rounded-lg border transition-all ${
                selectedCurrency === 'TRY'
                  ? 'bg-yellow-600 border-yellow-600 text-white'
                  : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">₺</span>
                  <div>
                    <div className="font-medium">TRY</div>
                    <div className="text-sm opacity-80">Türk Lirası</div>
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={() => setSelectedCurrency('USD')}
              className={`p-3 rounded-lg border transition-all ${
                selectedCurrency === 'USD'
                  ? 'bg-yellow-600 border-yellow-600 text-white'
                  : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">$</span>
                  <div>
                    <div className="font-medium">USD</div>
                    <div className="text-sm opacity-80">Amerikan Doları</div>
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={() => setSelectedCurrency('EUR')}
              className={`p-3 rounded-lg border transition-all ${
                selectedCurrency === 'EUR'
                  ? 'bg-yellow-600 border-yellow-600 text-white'
                  : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">€</span>
                  <div>
                    <div className="font-medium">EUR</div>
                    <div className="text-sm opacity-80">Euro</div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setOpen(false)}
            className="px-6 py-3 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 transition-all"
          >
            İptal
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-3 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition-all font-medium"
          >
            Uygula
          </button>
        </div>
      </div>
    </div>
  );
}
