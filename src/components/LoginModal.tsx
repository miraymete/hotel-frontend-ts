import React from "react";
import { X } from "lucide-react";

export interface LoginModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <>
      {/* Arka plan karartma */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        role="presentation"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      ></div>

      {/* Butonun yanında açılan panel */}
      <div className="absolute right-0 mt-2 z-50 w-[400px] rounded-xl border bg-white p-6 shadow-lg">
        {/* Sağ üst X */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 text-[#3620D9] hover:text-[#4230FF] focus:outline-none"
        >
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Kapat</span>
        </button>

        <h2 className="mb-4 text-xl font-bold">Giriş Yap</h2>

        <input
          type="email"
          placeholder="E-posta"
          className="mb-3 w-full rounded-md border p-2"
        />
        <input
          type="password"
          placeholder="Şifre"
          className="mb-3 w-full rounded-md border p-2"
        />

        <button
          type="button"
          className="mb-2 w-full rounded-md bg-[#3620D9] py-2 text-white hover:bg-[#4230FF]"
        >
          Giriş Yap
        </button>

        <button
          type="button"
          onClick={() => alert("Şifre sıfırlama maili gönderildi!")}
          className="w-full py-2 text-sm text-gray-600 hover:underline"
        >
          Şifremi Unuttum
        </button>
      </div>
    </>
  );
};

export default LoginModal;
