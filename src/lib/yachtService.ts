import api from './api';

export interface Yacht {
  id: number;
  name: string;
  description: string;
  location: string;
  category: string;
  capacity: string;
  length: string;
  price: number;
  currency: string;
  ratingScore?: number;
  ratingLabel?: string;
  reviewCount?: number;
  imageUrl?: string;
  isRecommended?: boolean;
  tags?: string[];
}

export interface YachtSearchParams {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  page?: number;
  size?: number;
}

export const yachtService = {
  // Tüm yatları getir
  async getAllYachts(): Promise<Yacht[]> {
    const response = await api.get('/api/yachts');
    return response.data;
  },

  // ID ile yacht getir
  async getYachtById(id: number): Promise<Yacht> {
    const response = await api.get(`/api/yachts/${id}`);
    return response.data;
  },

  // Önerilen yatları getir
  async getRecommendedYachts(): Promise<Yacht[]> {
    const response = await api.get('/api/yachts/recommended');
    return response.data;
  },

  // Kategoriye göre yatları getir
  async getYachtsByCategory(category: string, page = 0, size = 12): Promise<{
    content: Yacht[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> {
    const response = await api.get(`/api/yachts/category/${category}?page=${page}&size=${size}`);
    return response.data;
  },

  // Yatları ara
  async searchYachts(params: YachtSearchParams): Promise<{
    content: Yacht[];
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

    const response = await api.get(`/api/yachts/search?${queryParams}`);
    return response.data;
  },

  // Filtreleme
  async filterYachts(params: YachtSearchParams): Promise<{
    content: Yacht[];
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

    const response = await api.get(`/api/yachts/filter?${queryParams}`);
    return response.data;
  }
};
