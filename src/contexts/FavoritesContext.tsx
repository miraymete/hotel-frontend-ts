
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// favori otel veri yapısı
export interface FavoriteHotel {
  id: string;           
  name: string;         
  image: string;        // görsel url
  location: string;     // konumu
  price?: string | number;        
  rating: number;       // puan 1-5
  reviews: number;      // yorum sayısı
  description?: string; // açıklama
  tags?: string[];      // etiketler
  category?: string;    // kategori
}

interface FavoritesContextType {
  favorites: FavoriteHotel[];                          
  addToFavorites: (hotel: FavoriteHotel) => void;      // favorilere ekleme
  removeFromFavorites: (hotelId: string) => void;      // favorilerden çıkarma
  isFavorite: (hotelId: string) => boolean;            // favori durumu kontrolü
}

// başlangıçta undefined
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// contexti kullanmak için custom hook 
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  // favori oteller listesi statei 
  const [favorites, setFavorites] = useState<FavoriteHotel[]>([]);

  // uygulama başladığında localstoragedan favorileri yüklr
  useEffect(() => {
    const savedFavorites = localStorage.getItem('hotel-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // favoriler değiştiğinde localstoragea kaydetttt 
  useEffect(() => {
    localStorage.setItem('hotel-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // favorilere otel ekleme fonksiyonu
  const addToFavorites = (hotel: FavoriteHotel) => {
    setFavorites(prev => {
      //otel zaten favorilerde varsa listeyi değiştirme
      if (prev.some(fav => fav.id === hotel.id)) {
        return prev;
      }
      // yeni oteli listeye ekle
      return [...prev, hotel];
    });
  };

  // otel çıkarma fonksiyonu
  const removeFromFavorites = (hotelId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== hotelId));
  };

  // otelin favori olup olmadığını kontrol 
  const isFavorite = (hotelId: string) => {
    return favorites.some(fav => fav.id === hotelId);
  };


  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };


  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
