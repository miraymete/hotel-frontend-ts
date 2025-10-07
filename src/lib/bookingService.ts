// rezervasyon istekleri için servis
import api from './api';

export interface Booking {
  id: number;
  userId: number;
  username: string;
  bookingType: 'HOTEL' | 'TOUR' | 'YACHT';
  itemId: number;
  itemName: string;
  checkInDate: string;
  checkOutDate?: string;
  bookingDate: string;
  guestCount: number;
  totalPrice: number;
  currency: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingRequest {
  bookingType: 'HOTEL' | 'TOUR' | 'YACHT';
  itemId: number;
  itemName: string;
  checkInDate: string;
  checkOutDate?: string;
  bookingDate: string;
  guestCount: number;
  notes?: string;
}

export const bookingService = {
  // rezervasyon oluştur
  async createBooking(request: BookingRequest): Promise<Booking> {
    const response = await api.post('/api/bookings', request);
    return response.data;
  },

  //  rezervo 
  async getMyBookings(page = 0, size = 10): Promise<{
    content: Booking[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> {
    const response = await api.get(`/api/bookings/my-bookings?page=${page}&size=${size}`);
    return response.data;
  },

  // rezervo iptal
  async cancelBooking(bookingId: number): Promise<Booking> {
    const response = await api.put(`/api/bookings/${bookingId}/cancel`);
    return response.data;
  },


  async getAllBookings(page = 0, size = 10): Promise<{
    content: Booking[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> {
    const response = await api.get(`/api/bookings/all?page=${page}&size=${size}`);
    return response.data;
  },

  async updateBookingStatus(bookingId: number, status: string): Promise<Booking> {
    const response = await api.put(`/api/bookings/${bookingId}/status`, { status });
    return response.data;
  }
};
