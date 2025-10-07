// tur istekleri için servis
import api from './api';

export interface Tour {
  id: number;
  name: string;
  description: string;
  location: string;
  category: string;
  duration: string;
  groupSize: string;
  price: number;
  currency: string;
  ratingScore?: number;
  ratingLabel?: string;
  reviewCount?: number;
  imageUrl?: string;
  isRecommended?: boolean;
  tags?: string[];
}

export interface TourSearchParams {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  page?: number;
  size?: number;
}

export const tourService = {
  // turları getir
  async getAllTours(): Promise<Tour[]> {
    const response = await api.get('/api/tours');
    return response.data;
  },

  // ID ile tour getir
  async getTourById(id: number): Promise<Tour> {
    const response = await api.get(`/api/tours/${id}`);
    return response.data;
  },

  // önerilen turlar
  async getRecommendedTours(): Promise<Tour[]> {
    const response = await api.get('/api/tours/recommended');
    return response.data;
  },

  // kategoriye göre turlar
  async getToursByCategory(category: string, page = 0, size = 12): Promise<{
    content: Tour[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> {
    const response = await api.get(`/api/tours/category/${category}?page=${page}&size=${size}`);
    return response.data;
  },

  // tur ara
  async searchTours(params: TourSearchParams): Promise<{
    content: Tour[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> {
    const queryParams = new URLSearchParams();
    
    if (params.q) queryParams.append('q', params.q);
    if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.size) queryParams.append('size', params.size.toString());

    const response = await api.get(`/api/tours/search?${queryParams}`);
    return response.data;
  },

  // filtrele
  async filterTours(params: TourSearchParams): Promise<{
    content: Tour[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> {
    const queryParams = new URLSearchParams();
    
    if (params.category) queryParams.append('category', params.category);
    if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.size) queryParams.append('size', params.size.toString());

    const response = await api.get(`/api/tours/filter?${queryParams}`);
    return response.data;
  }
};
