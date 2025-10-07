// auth yüksek seviye fonksiyonlar backend servislerine yönlendirir
import { login as backendLogin, register as backendRegister, logout as backendLogout, getCurrentUser as backendGetCurrentUser } from './authService';

export type PublicUser = { id: string; name: string; email: string };

export function validatePasswordOrThrow(password: string) {
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  if (!hasMinLength || !hasUppercase || !hasNumber) {
    throw new Error("şifre en az 6 karakter 1 büyük harf ve 1 sayı içermeli");
  }
}

// backend ile entegre 
export const getCurrentUser = (): PublicUser | null => {
  const backendUser = backendGetCurrentUser();
  if (!backendUser) return null;
  
  return {
    id: backendUser.id.toString(),
    name: backendUser.fullName || backendUser.username, // fullName varsa onu kullan yoksa username
    email: backendUser.email // backendde email alanı var
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
  
  if (!/.+@.+\..+/.test(email)) throw new Error("geçersiz e posta");
  validatePasswordOrThrow(password);

  try {
    const response = await backendRegister({
      fullName: name,
      email: email,
      password: password,
      role: "USER" // default role ekle
    });

    return {
      id: response.user.id.toString(),
      name: name || "Misafir",
      email: email
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "kayıt başarısız";
    throw new Error(errorMessage);
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
      username: email, // backendde usernamei email olark aldım
      password: password
    });

    return {
      id: response.user.id.toString(),
      name: response.user.fullName || response.user.username, // fullName varsa o yoksa username
      email: response.user.email // backendden gelen mail
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "e posta veya şifre hatalı";
    throw new Error(errorMessage);
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  email = (email || "").trim().toLowerCase();
  if (!/.+@.+\..+/.test(email)) throw new Error("geçersiz e posta");
  //ŞİFRE SIFIRLAMA YAPMAYI UNUTMA!!!!!!!!!!!!!!!!!
  throw new Error("şifre sıfırlama özelliği henüz mevcut değil");
}

export function logout() {
  backendLogout();
}

export function useAuth() {
  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
  };

  const getCurrentUser = (): PublicUser | null => {
    return getCurrentUser();
  };

  return {
    isAuthenticated,
    getCurrentUser,
    login,
    logout,
    register
  };
}
