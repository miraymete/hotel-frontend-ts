import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";
import { Eye, EyeOff, Plane, Star, ArrowRight, Globe, Mountain, Waves } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Seyahat destinasyonları ve fırsatları
  const travelSlides = [
    {
      id: 1,
      title: "Santorini'de Unutulmaz Gün Batımı",
      subtitle: "Yunan Adaları",
      description: "Beyaz evler ve mavi kubbeler arasında romantik bir tatil",
      price: "€299",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Waves className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Alp Dağlarında Macera",
      subtitle: "İsviçre",
      description: "Karlı zirveler ve kristal berraklığında göller",
      price: "€599",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Mountain className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Bali'de Tropikal Cennet",
      subtitle: "Endonezya",
      description: "Yeşil çeltik tarlaları ve egzotik plajlar",
      price: "€399",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Paris'te Aşk Şehri",
      subtitle: "Fransa",
      description: "Eyfel Kulesi ve Seine Nehri kıyısında romantizm",
      price: "€449",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Tokyo'da Gelecek",
      subtitle: "Japonya",
      description: "Modern teknoloji ve geleneksel kültürün buluşması",
      price: "€699",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Plane className="w-6 h-6" />
    }
  ];

  // Otomatik kaydırma efekti
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % travelSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [travelSlides.length]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        throw new Error("Şifre en az 6 karakter, 1 büyük harf ve 1 rakam içermelidir");
      }
      
      await login(email, password);
      setLoading(false);
      navigate("/"); // Ana sayfaya yönlendir
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Giriş başarısız");
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
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen relative z-10">
        {/* Left Panel - Travel Content */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-lg text-white">
            {/* Current Slide Content */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                  {travelSlides[currentSlide].icon}
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Hotel Booking</h1>
                  <p className="text-blue-200">Dünyayı Keşfedin</p>
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
                  <p className="text-blue-200 text-sm">Başlangıç fiyatı</p>
                  <p className="text-3xl font-bold">{travelSlides[currentSlide].price}</p>
                </div>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center">
                  Keşfet <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide Indicators */}
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

        {/* Right Panel - Login Form with Glassmorphism */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            {/* Glassmorphism Login Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Hoş Geldiniz</h2>
                <p className="text-blue-100">Hesabınıza giriş yapın</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg">
                  <p className="text-red-100 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Şifreniz
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-white/30 text-white bg-white/10 focus:ring-white/50" />
                    <span className="ml-2 text-sm text-white/80">Beni hatırla</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-white/80 hover:text-white transition-colors">
                    Şifremi unuttum
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-white/90 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/80">
                  Hesabınız yok mu?{" "}
                  <Link to="/register" className="text-white hover:text-white/80 font-medium transition-colors">
                    Kayıt olun
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen relative z-10">
        {/* Mobile Header with Current Slide */}
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

        {/* Mobile Form */}
        <div className="px-6 py-8 bg-white/95 backdrop-blur-sm">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Giriş Yapın</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Hesabınız yok mu?{" "}
                <Link to="/register" className="text-blue-600 font-medium">
                  Kayıt olun
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
