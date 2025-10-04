import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'TRY' | 'USD' | 'EUR';

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const CurrencyProvider: React.FC<Props> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('TRY');

  useEffect(() => {
    const savedCurrency = localStorage.getItem('hotel-currency') as Currency;
    if (savedCurrency && (savedCurrency === 'TRY' || savedCurrency === 'USD' || savedCurrency === 'EUR')) {
      setCurrency(savedCurrency);
    }
  }, []);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('hotel-currency', newCurrency);
  };

  const formatPrice = (price: number) => {
    switch (currency) {
      case 'USD':
        return `$${(price * 0.03).toFixed(0)}`;
      case 'EUR':
        return `€${(price * 0.028).toFixed(0)}`;
      case 'TRY':
      default:
        return `₺${price.toLocaleString()}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};
