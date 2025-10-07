import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/lib/auth";
import { Eye, EyeOff, Plane, Star, ArrowRight, Globe, Mountain, Waves } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import LanguageModal from "@/components/LanguageModal";

type Props = {
  onRegisterSuccess?: () => void;
};

export default function RegisterPage({ onRegisterSuccess }: Props) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const travelSlides = [
    {
      id: 1,
      title: t('santoriniTitle'),
      subtitle: t('santoriniSubtitle'),
      description: t('santoriniDesc'),
      price: formatPrice(14352), 
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Waves className="w-6 h-6" />
    },
    {
      id: 2,
      title: t('alpsTitle'),
      subtitle: t('alpsSubtitle'),
      description: t('alpsDesc'),
      price: formatPrice(28752), 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Mountain className="w-6 h-6" />
    },
    {
      id: 3,
      title: t('baliTitle'),
      subtitle: t('baliSubtitle'),
      description: t('baliDesc'),
      price: formatPrice(19152), 
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/f8/1c/13/padma-resort-ubud.jpg?w=1200&h=-1&s=1",
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 4,
      title: t('parisTitle'),
      subtitle: t('parisSubtitle'),
      description: t('parisDesc'),
      price: formatPrice(21552),
      image: "https://www.olielo.com/wp-content/uploads/2013/12/Shangri-La-Paris-hotel-Eiffel-Tower.jpg",
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 5,
      title: t('tokyoTitle'),
      subtitle: t('tokyoSubtitle'),
      description: t('tokyoDesc'),
      price: formatPrice(33552), 
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Plane className="w-6 h-6" />
    }
  ];

  // oto kaydırma
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % travelSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [travelSlides.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!agreedToTerms) {
      setError(t('mustAcceptTerms'));
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordsDontMatch'));
      return;
    }
    
    if (formData.password.length < 6 || !/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
      setError(t('passwordTooShort'));
      return;
    }
    
    setLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
      setLoading(false);
      
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
      
      navigate("/"); // ana sayfa
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err.message : t('registrationFailed'));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sliding Background Images */}
      <div className="absolute inset-0">
        {travelSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:flex min-h-screen relative z-10">
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-lg text-white">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                  {travelSlides[currentSlide].icon}
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Hotel Booking</h1>
                  <p className="text-blue-200">{t('joinUs')}</p>
                </div>
              </div>
              
              <h2 className="text-5xl font-bold mb-4 leading-tight">
                {travelSlides[currentSlide].title}
              </h2>
              
              <p className="text-xl text-blue-100 mb-6">
                {travelSlides[currentSlide].description}
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">{t('startingPriceLogin')}</p>
                  <p className="text-3xl font-bold">{travelSlides[currentSlide].price}</p>
                </div>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center">
                  {t('discoverLogin')} <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex space-x-2">
              {travelSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsLanguageModalOpen(true)}
                    className="flex items-center space-x-2 text-white/80 hover:text-yellow-400 transition-colors text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{t('language')} • {t('currency')}</span>
                  </button>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{t('createAccount')}</h2>
                <p className="text-blue-100">{t('joinUs')}</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg">
                  <p className="text-red-100 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    {t('fullName')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    placeholder={t('fullNamePlaceholder')}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    placeholder={t('emailPlaceholder')}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    {t('passwordLogin')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                      placeholder={t('passwordPlaceholder')}
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    {t('confirmPasswordRegister')}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                      placeholder={t('confirmPasswordPlaceholder')}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 rounded border-white/30 text-white bg-white/10 focus:ring-white/50"
                  />
                  <label htmlFor="terms" className="text-sm text-white/80">
                    {t('agreeTermsRegister')}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-white/90 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t('creatingAccountRegister') : t('registerButtonRegister')}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/80">
                  {t('haveAccountRegister')}{" "}
                  <Link to="/login" className="text-white hover:text-white/80 font-medium transition-colors">
                    {t('loginLinkRegister')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden min-h-screen relative z-10">
        <div className="h-80 relative">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
              {travelSlides[currentSlide].icon}
            </div>
            <h1 className="text-2xl font-bold mb-2">Hotel Booking</h1>
            <p className="text-center text-sm text-blue-100 mb-4">
              {travelSlides[currentSlide].title}
            </p>
            <p className="text-lg font-bold">{travelSlides[currentSlide].price}</p>
          </div>
        </div>

        <div className="px-6 py-8 bg-white/95 backdrop-blur-sm">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('registerPageTitle')}</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('fullNamePlaceholder')}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('emailAddress')}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('emailPlaceholder')}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('passwordLogin')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('passwordPlaceholder')}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('confirmPasswordRegister')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('passwordPlaceholder')}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms-mobile"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms-mobile" className="text-sm text-gray-600">
                  {t('agreeTermsRegister')}
                </label>
              </div>

              <button

                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? t('creatingAccountRegister') : t('registerButtonRegister')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {t('haveAccountRegister')}{" "}
                <Link to="/login" className="text-blue-600 font-medium">
                  {t('loginLinkRegister')}
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
      
   
      <LanguageModal 
        open={isLanguageModalOpen} 
        setOpen={setIsLanguageModalOpen} 
      />
    </div>
  );
}
