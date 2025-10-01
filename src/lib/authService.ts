import api from './api';

// giriş yapmak için gerekli bilgiler
export interface LoginRequest {
  username: string;
  password: string;
}

// kayıt olmak için gerekli bilgiler
export interface RegisterRequest {
  username: string;
  password: string;
}

// kullanıcı bilgileri
export interface User {
  id: number;
  username: string;
  role: string;
}

// backend'den dönen authentication response
export interface AuthResponse {
  token: string;
  user: User;
}

// backend ile giriş yapma fonksiyonu
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

// backend ile kayıt olma fonksiyonu
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
    }
    
    throw new Error(errorMessage);
  }
};

// çıkış yapma fonksiyonu
export const logout = () => {
  // tarayıcıdan token ve kullanıcı bilgilerini sil
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// mevcut kullanıcıyı getir
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

// kullanıcı giriş yapmış mı kontrol et
export const isAuthenticated = (): boolean => {
  // token var mı kontrol et
  return !!localStorage.getItem('token');
};

