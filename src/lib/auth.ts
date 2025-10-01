// src/lib/auth.ts - Backend entegrasyonu için güncellenmiş
import { login as backendLogin, register as backendRegister, logout as backendLogout, getCurrentUser as backendGetCurrentUser, User } from './authService';

export type PublicUser = { id: string; name: string; email: string };

export function validatePasswordOrThrow(password: string) {
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  if (!hasMinLength || !hasUppercase || !hasNumber) {
    throw new Error("Şifre en az 6 karakter, 1 büyük harf ve 1 sayı içermeli");
  }
}

// Backend ile entegre edilmiş fonksiyonlar
export const getCurrentUser = (): PublicUser | null => {
  const backendUser = backendGetCurrentUser();
  if (!backendUser) return null;
  
  return {
    id: backendUser.id.toString(),
    name: backendUser.username,
    email: backendUser.username // Backend'de email yerine username kullanılıyor
  };
};

export async function register(
  name: string,
  email: string,
  password: string
): Promise<PublicUser> {
  email = (email || "").trim().toLowerCase();
  name = (name || "").trim();
  password = (password || "").toString();
  
  if (!/.+@.+\..+/.test(email)) throw new Error("Geçersiz e-posta");
  validatePasswordOrThrow(password);

  try {
    const response = await backendRegister({
      username: email, // Backend'de username olarak email kullanıyoruz
      password: password
    });

    return {
      id: response.user.id.toString(),
      name: name || "Misafir",
      email: email
    };
  } catch (error: any) {
    throw new Error(error.message || "Kayıt başarısız");
  }
}

export async function login(
  email: string,
  password: string
): Promise<PublicUser> {
  email = (email || "").trim().toLowerCase();
  password = (password || "").toString();
  
  validatePasswordOrThrow(password);

  try {
    const response = await backendLogin({
      username: email, // Backend'de username olarak email kullanıyoruz
      password: password
    });

    return {
      id: response.user.id.toString(),
      name: response.user.username,
      email: email
    };
  } catch (error: any) {
    throw new Error(error.message || "E-posta veya şifre hatalı");
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  email = (email || "").trim().toLowerCase();
  if (!/.+@.+\..+/.test(email)) throw new Error("Geçersiz e-posta");
  // Backend'de şifre sıfırlama endpoint'i yok, bu yüzden geçici olarak boş bırakıyoruz
  throw new Error("Şifre sıfırlama özelliği henüz mevcut değil");
}

export function logout() {
  backendLogout();
}
