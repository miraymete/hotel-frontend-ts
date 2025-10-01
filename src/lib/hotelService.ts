import api from './api';

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
  lastMinute?: boolean;
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
    // backend'den otel listesini al
    const response = await api.get('/api/hotels');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Otel listesi alınamadı');
  }
};

// belirli bir otelin detayını getir
export const getHotelById = async (id: number): Promise<Hotel> => {
  try {
    // backend'den otel detayını al
    const response = await api.get(`/api/hotels/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Otel detayı alınamadı');
  }
};

// otel arama fonksiyonu
export const searchHotels = async (params: SearchParams): Promise<{ content: Hotel[], totalElements: number, totalPages: number }> => {
  try {
    // backend'e arama parametreleri ile istek gönder
    const response = await api.get('/api/hotels/search', { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Arama başarısız');
  }
};

// son dakika otellerini getir
export const getLastMinuteHotels = async (page: number = 0, size: number = 10): Promise<{ content: Hotel[], totalElements: number, totalPages: number }> => {
  try {
    // backend'den son dakika otellerini al
    const response = await api.get('/api/hotels/last-minute', {
      params: { page, size }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Son dakika otelleri alınamadı');
  }
};

// yeni otel ekle (admin yetkisi gerekli)
export const createHotel = async (hotelData: HotelRequest): Promise<Hotel> => {
  try {
    // backend'e yeni otel bilgilerini gönder
    const response = await api.post('/api/hotels', hotelData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Otel eklenemedi');
  }
};

// mevcut oteli güncelle (admin yetkisi gerekli)
export const updateHotel = async (id: number, hotelData: HotelRequest): Promise<Hotel> => {
  try {
    // backend'e güncellenmiş otel bilgilerini gönder
    const response = await api.put(`/api/hotels/${id}`, hotelData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Otel güncellenemedi');
  }
};

// oteli sil (admin yetkisi gerekli)
export const deleteHotel = async (id: number): Promise<void> => {
  try {
    // backend'e otel silme isteği gönder
    await api.delete(`/api/hotels/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Otel silinemedi');
  }
};
