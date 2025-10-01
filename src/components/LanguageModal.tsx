import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n";

interface LanguageModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function LanguageModal({ open, setOpen }: LanguageModalProps) {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [selectedCurrency, setSelectedCurrency] = useState("TRY");

  if (!open) return null;

  const handleApply = () => {
    setLanguage(selectedLang);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[70]">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg z-[80]">
        <h2 className="text-lg font-semibold mb-4">{t('languageCurrency')}</h2>

        <label className="block mb-2 text-sm">{t('language')}</label>
        <select 
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value as Language)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
        </select>

        <label className="block mb-2 text-sm">{t('currency')}</label>
        <select 
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option value="TRY">TRY - Türk Lirası</option>
          <option value="USD">USD - Dolar</option>
          <option value="EUR">EUR - Euro</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            {t('close')}
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded-lg bg-[#3620D9] text-white hover:bg-[#4230FF]"
          >
            {t('apply')}
          </button>
        </div>
      </div>
    </div>
  );
}
