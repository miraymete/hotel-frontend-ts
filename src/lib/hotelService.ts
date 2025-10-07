// otel istekleri için servis
import api from './api';
// hata mesajını güvenli biçimde çıkaran yardımcı
function messageFromError(error: unknown, fallback: string): string {
  // axios benzeri response.message yapısını güvenli kontrol et
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const resp = (error as { response?: { data?: { message?: string } } }).response;
    const msg = resp?.data?.message;
    if (typeof msg === 'string' && msg.trim().length > 0) return msg;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

// otel bilgileri
export interface Hotel {
  id: number;
  name: string;
  city: string;
  country?: string;
  region?: string;
  stars: number;
  pricePerNight?: number;
  currency?: string;
  ratingScore?: number;
  ratingLabel?: string;
  reviewCount?: number;
  imageUrl?: string;
  amenities?: string[];
}

// yeni otel eklemek için gerekli bilgiler
export interface HotelRequest {
  name: string;
  city: string;
  country?: string;
  region?: string;
  stars: number;
  pricePerNight?: number;
  currency?: string;
  ratingScore?: number;
  ratingLabel?: string;
  reviewCount?: number;
  imageUrl?: string;
  lastMinute?: boolean;
  amenities?: string[];
}

// otel arama parametreleri
export interface SearchParams {
  q?: string;
  minStars?: number;
  maxStars?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}

// tüm otelleri getir
export const getHotels = async (): Promise<Hotel[]> => {
  try {
    // otel listesini al
    const response = await api.get('/api/hotels');
    return response.data;
  } catch (error: unknown) {
    throw new Error(messageFromError(error, 'Otel listesi alınamadı'));
  }
};

// belirli bir otelin detayını getir
export const getHotelById = async (id: number): Promise<Hotel> => {
  try {
    // backend'den otel detayını al
    const response = await api.get(`/api/hotels/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw new Error(messageFromError(error, 'Otel detayı alınamadı'));
  }
};

// otel arama fonksiyonu
export const searchHotels = async (params: SearchParams): Promise<Hotel[]> => {
  try {
    const response = await api.get('/api/hotels/search', { params });
    return response.data;
  } catch (error: unknown) {
    throw new Error(messageFromError(error, 'Arama başarısız'));
  }
};

// yeni otel ekle 
export const createHotel = async (hotelData: HotelRequest): Promise<Hotel> => {
  try {
    const response = await api.post('/api/hotels', hotelData);
    return response.data;
  } catch (error: unknown) {
    throw new Error(messageFromError(error, 'Otel eklenemedi'));
  }
};

// mevcut oteli güncelle
export const updateHotel = async (id: number, hotelData: HotelRequest): Promise<Hotel> => {
  try {
    const response = await api.put(`/api/hotels/${id}`, hotelData);
    return response.data;
  } catch (error: unknown) {
    throw new Error(messageFromError(error, 'Otel güncellenemedi'));
  }
};

// oteli sil 
export const deleteHotel = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/hotels/${id}`);
  } catch (error: unknown) {
    throw new Error(messageFromError(error, 'Otel silinemedi'));
  }
};
