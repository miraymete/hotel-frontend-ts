import { useState, type FormEvent } from "react";
import { register, PublicUser, validatePasswordOrThrow } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSuccess?: (user: PublicUser) => void;
};

export default function RegisterModal({ open, setOpen, onSuccess }: Props) {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (password !== confirm) {
        throw new Error(t('passwordsDontMatch'));
      }
      validatePasswordOrThrow(password);
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      const u = await register(fullName, email, password);
      setLoading(false);
      setOpen(false);
      onSuccess?.(u);
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err.message : t('registrationFailed'));
    }
  };

  const capitalizeFirst = (value: string) =>
    value.length === 0 ? "" : value.charAt(0).toUpperCase() + value.slice(1);

  const ensureTRPrefix = (value: string) => {
    const digits = value.replace(/[^\d]/g, "");
    const withoutCountry = digits.startsWith("90") ? digits.slice(2) : digits;
    const trimmed = withoutCountry.slice(0, 10);
    if (trimmed.length === 0) return "+90 ";
    const spaced = trimmed.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
    return `+90 ${spaced}`.trim();
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[80] w-[450px] rounded-xl border bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">{t('registerTitle')}</h2>
        
        {error && (
          <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">{t('firstName')}</label>
              <input
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                value={firstName}
                onChange={(e) => setFirstName(capitalizeFirst(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">{t('lastName')}</label>
              <input
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                value={lastName}
                onChange={(e) => setLastName(capitalizeFirst(e.target.value))}
              />
            </div>
          </div>
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
            <label className="text-sm text-gray-600">{t('phone')}</label>
            <div className="mt-1 flex items-center rounded-lg border border-gray-300 p-0 overflow-hidden">
              <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 text-gray-700 select-none">
                <span role="img" aria-label="Türkiye">🇹🇷</span>
                +90
              </span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="XXX XXX XX XX"
                className="flex-1 px-3 py-2 outline-none"
                value={phone}
                onChange={(e) => setPhone(ensureTRPrefix(e.target.value))}
              />
            </div>
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
            <p className="mt-1 text-xs text-gray-500">{t('passwordHint')}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">{t('confirmPassword')}</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 pr-10"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                type="button"
                aria-label={showConfirm ? "Şifreyi gizle" : "Şifreyi göster"}
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-[#3620D9] py-2 text-white hover:bg-[#4230FF] disabled:opacity-60"
          >
            {loading ? t('registering') : t('registerButton')}
          </button>
        </form>
      </div>
    </>
  );
}
