import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslation } from '@/lib/i18n';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof import('@/lib/i18n').translations.tr) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('hotel-language') as Language;
    if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('hotel-language', lang);
  };

  const t = (key: keyof typeof import('@/lib/i18n').translations.tr) => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
