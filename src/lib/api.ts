import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// backend api adresi geliştirme ve üretim için env uzerinden gelir
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6060';

// axios instance ortak ayarlar ve credential kullanımı
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials for CORS
  timeout: 10000, // 10 second timeout
});

// request interceptor her isteğe jwt token ekler
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // tarayıcıdan token al
    const token = localStorage.getItem('token');
    if (token) {
      // her isteğe authorization header ekle (Axios v1 tipleriyle uyumlu)
      const headers = config.headers as Record<string, string>;
      if (headers) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// response interceptor 401 durumunda kullanıcıyı çıkış yapar
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