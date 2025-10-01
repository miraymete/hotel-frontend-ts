import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// backend api adresi
const API_BASE_URL = 'http://localhost:6060';

// axios instance oluştur
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor - jwt token ekleme
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // tarayıcıdan token al
    const token = localStorage.getItem('token');
    if (token) {
      // her isteğe authorization header ekle (Axios v1 tipleriyle uyumlu)
      const headers: any = config.headers;
      if (headers && typeof headers.set === 'function') {
        headers.set('Authorization', `Bearer ${token}`);
      } else if (headers) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// response interceptor - hata yönetimi
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // 401 hatası alırsa kullanıcıyı çıkış yap
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;