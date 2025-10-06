import api from './api';

// login isteği için gerekli alanlar (username veya email ile login)
export interface LoginRequest {
  username: string; // Bu alan username veya email olabilir
  password: string;
}

// register isteği için gerekli alanlar
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: string; // Optional role alanı
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}

// kullanıcı bilgileri (genişletilmiş)
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
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

// backend ile giriş yapma fonksiyonu tokeni localstorage a yazar
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    // backend'e giriş isteği gönder
    const response = await api.post('/api/auth/login', credentials);
    
    // backend'den gelen token ve kullanıcı bilgilerini al
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

// backend ile kayıt olma fonksiyonu başarıda token ve user döndürür
export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  try {
    // backend'e kayıt isteği gönder
    const response = await api.post('/api/auth/register', userData);
    
    // backend'den gelen token ve kullanıcı bilgilerini al
    const { token, user } = response.data;
    
    // token ve kullanıcı bilgilerini tarayıcıda sakla
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
    
    console.error('Register error:', error); // Debug için log ekle
    throw new Error(errorMessage);
  }
};

// çıkış fonksiyonu localstorage i temizler
export const logout = () => {
  // tarayıcıdan token ve kullanıcı bilgilerini sil
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// mevcut kullanıcıyı localstorage dan okur
export const getCurrentUser = (): User | null => {
  // tarayıcıdan kullanıcı bilgilerini al
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    // json string'i user objesine çevir
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// kullanıcı oturumu var mı kontrol eder
export const isAuthenticated = (): boolean => {
  // token var mı kontrol et
  return !!localStorage.getItem('token');
};

