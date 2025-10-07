//auth isteklerini yapan servis
import api from './api';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6060';

// login isteği için gerekli lausername email ile login
export interface LoginRequest {
  username: string; // Bu alan username veya email olabilir
  password: string;
}

// register isteği için gerekli 
export interface RegisterRequest {
  fullName: string; // backendde username değil de fullname 
  email: string;
  password: string;
  role?: string; 
  phoneNumber?: string;
  dateOfBirth?: string;
}

// kullanıcı bilgileri 
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  fullName?: string; 
  phoneNumber?: string;
  dateOfBirth?: string;
  profileImageUrl?: string;
  createdAt?: string;
  isActive?: boolean;
  emailVerified?: boolean;
}

// backendden dönen auth cevabı token ve user içerir
export interface AuthResponse {
  token: string;
  user: User;
}

//BURAYI TEKRAR ANLAMAYA ÇALIŞ!!
// backend ile giriş yapma fonksiyonu tokeni localstorage a yazar
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    // backend'e giriş isteği gönder
    const response = await api.post('/api/auth/login', credentials);
    
    // backendden gelen token ve kullanıcı bilgilerini al
    const { token, user } = response.data;
    
    // token ve kullanıcı bilgilerini tarayıcıda sakla
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  } catch (error: unknown) {
    // hata mesajını belirle
    let errorMessage = 'Giriş başarısız';
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      errorMessage = axiosError.response?.data?.message || errorMessage;
    }
    
    throw new Error(errorMessage);
  }
};

// backend ile kayıt olma fonksiyonu token ve user döndürür
export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  try {
    // backende kayıt isteği gönder
    const response = await api.post('/api/auth/register', userData);
    
    // token ve kullanıcı bilgilerini al
    const { token, user } = response.data;
    
    // tarayıcıda sakla
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  } catch (error: unknown) {
    // hata mesajını belirle
    let errorMessage = 'Kayıt başarısız';
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      errorMessage = axiosError.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    console.error('Register error:', error); 
    throw new Error(errorMessage);
  }
};

export const logout = () => {
  // tarayıcıdan token ve kullanıcı bilgilerini sil
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  // tarayıcıdan kullanıcı bilgilerini al
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    // user objesine çevir
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// kullanıcı oturumu var mı kontrol eder
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

//hesap bilgilerini getir
export const getAccountInfo = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/account`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Failed to get account info:', error);
    throw error;
  }
};

