import { useState, type FormEvent } from "react";
import { login, PublicUser, requestPasswordReset } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSuccess?: (user: PublicUser) => void;
};

export default function LoginModal({ open, setOpen, onSuccess }: Props) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // login içinde de kontrol var ama kullanıcıya erken ve net mesaj vermek için ek kontrol
      if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        throw new Error(t('passwordTooShort'));
      }
      const u = await login(email, password);
      setLoading(false);
      setOpen(false);
      onSuccess?.(u);
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err.message : t('loginFailed'));
    }
  };

  return (
    <>
      {/* Arka plan karartma */}
      <div
        className="fixed inset-0 z-[70] bg-black/50"
        role="presentation"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      ></div>

      {/* Modal panel */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[80] w-[400px] rounded-xl border bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">{t('loginTitle')}</h2>
        
        {error && (
          <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">{t('email')}</label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">{t('password')}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="mb-2 w-full rounded-md bg-[#3620D9] py-2 text-white hover:bg-[#4230FF] disabled:opacity-60"
          >
            {loading ? t('loggingIn') : t('loginButton')}
          </button>

          <button
            type="button"
            onClick={() => setForgotOpen(true)}
            className="w-full py-2 text-sm text-gray-600 hover:underline"
          >
            {t('forgotPassword')}
          </button>
        </form>
      </div>

      {forgotOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/50"
            role="button"
            tabIndex={0}
            aria-label="Kapat"
            onClick={() => setForgotOpen(false)}
            onKeyDown={(e) => e.key === 'Enter' && setForgotOpen(false)}
          />
          <ForgotPassword onClose={() => setForgotOpen(false)} />
        </div>
      )}
    </>
  );
}

function ForgotPassword({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setMessage(t('passwordResetSent'));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('operationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-[95] w-[420px] rounded-xl border bg-white p-6 shadow-lg">
      <h3 className="mb-3 text-lg font-semibold">Şifre Sıfırlama</h3>
      {message && (
        <div className="mb-3 rounded-md bg-green-50 p-2 text-sm text-green-700">{message}</div>
      )}
      {error && (
        <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm text-gray-600">{t('email')}</label>
          <input
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md border border-gray-300 py-2 hover:bg-gray-50"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-md bg-[#3620D9] py-2 text-white hover:bg-[#4230FF] disabled:opacity-60"
          >
            {loading ? t('sending') : t('sendMail')}
          </button>
        </div>
      </form>
    </div>
  );
}
