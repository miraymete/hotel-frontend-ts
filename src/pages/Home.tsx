/**
 * ana sayfa bileşeni - hotelbooking
 * 
 * bu sayfa uygulamanın ana giriş noktasıdır ve şunları içerir
 * - üst navigasyon menüsü
 * - arama formu (otel, tur, deneyim)
 * - son dakika fırsatları
 * - son aramalar
 * - keşfetme kartları (favori ekleme özelliği ile)
 */
import { Button } from "@/components/ui/button";
import { Search, Globe, Heart } from "lucide-react";
import type { PublicUser } from "@/lib/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Link } from "react-router-dom";

// ana sayfa bileşeninin prop'ları
type Props = {
  user: PublicUser | null;        // giriş yapmış kullanıcı bilgisi
  onLogout: () => void;           // çıkış yapma fonksiyonu
  onOpenLanguage: () => void;     // dil seçim modal'ını açma fonksiyonu
};

export default function HomePage({
  user,
  onLogout,
  onOpenLanguage,
}: Props) {
  // context'lerden gelen fonksiyonlar
  const { t } = useLanguage();                    // çeviri fonksiyonu
  const { addToFavorites, isFavorite } = useFavorites(); // favori yönetimi
  
  // keşfetme kartları için örnek otel verileri
  const discoveryHotels = [
    {
      id: "yildiz-izleme",
      name: "Yıldız İzleme Oteli",
      image: "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&w=1200",
      location: "Utah, ABD",
      price: "TL 1.200",
      rating: 4.8,
      reviews: "156"
    },
    {
      id: "kultur-sanat",
      name: "Kültür Sanat Oteli",
      image: "https://i0.wp.com/www.medievalbrick.com/wp-content/uploads/2022/03/8.jpg?w=640&ssl=1",
      location: "Paris, Fransa",
      price: "TL 2.500",
      rating: 4.9,
      reviews: "234"
    },
    {
      id: "gurme-rotalar",
      name: "Gurme Rotalar Oteli",
      image: "https://i1.wp.com/www.cooking-sun.com/wp-content/uploads/2018/07/eating-sushi.jpg?w=1280&ssl=1",
      location: "Tokyo, Japonya",
      price: "TL 3.200",
      rating: 4.7,
      reviews: "189"
    }
  ];

  // kalp butonuna tıklandığında favorilere ekleme fonksiyonu
  const handleHeartClick = (hotel: typeof discoveryHotels[0], e: React.MouseEvent) => {
    e.preventDefault();      // link'in varsayılan davranışını engelle
    e.stopPropagation();    // event bubbling'i durdur
    addToFavorites(hotel);  // oteli favorilere ekle
  };

  return (
    <div className="min-h-screen bg-black">
      {/* üst menü - lüks koyu tema */}
      <header className="sticky top-0 z-[60] flex justify-between items-center px-8 py-4 bg-black/95 backdrop-blur-md border-b border-gray-800">
        {/* Logo - Four Seasons tarzı ağaç ikonu */}
        <Link to="/" className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 2L8 8H16L12 2Z"/>
              <path d="M8 8L4 14H20L16 8H8Z"/>
              <path d="M4 14L2 20H22L20 14H4Z"/>
            </svg>
          </div>
          <span className="text-xl font-light tracking-wider">{t('brand')}</span>
        </Link>

        {/* orta menü - minimal ve elegant */}
        <nav className="hidden lg:flex space-x-8 text-white/90 font-light text-sm tracking-wide">
          <Link to="/hotels" className="px-3 py-2 hover:text-yellow-400 transition-colors uppercase tracking-wider">{t('hotels')}</Link>
          <Link to="/tours" className="px-3 py-2 hover:text-yellow-400 transition-colors uppercase tracking-wider">{t('tours')}</Link>
          <Link to="/yachts" className="px-3 py-2 hover:text-yellow-400 transition-colors uppercase tracking-wider">YATLAR</Link>
          <Link to="/experiences" className="px-3 py-2 hover:text-yellow-400 transition-colors uppercase tracking-wider">{t('experiences')}</Link>
          <Link to="/favorites" className="px-3 py-2 hover:text-yellow-400 transition-colors uppercase tracking-wider">{t('favorites')}</Link>
        </nav>

        <div className="flex items-center space-x-6">
          {/* dil para - minimal */}
          <button
            onClick={onOpenLanguage}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase tracking-wide">TR · TL</span>
          </button>

          {!user ? (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-yellow-400 hover:bg-white/10 border-0">
                  {t('login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-white text-black hover:bg-yellow-400 hover:text-black font-medium px-6 py-2 rounded-none border-0">
                  {t('register')}
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-400 font-medium text-sm">
                {user.name
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <span className="hidden md:inline text-sm text-white/90 font-light">
                {t('hello')}, <span className="text-yellow-400">{user.name}</span>
              </span>
              <Button variant="ghost" onClick={onLogout} className="text-white/80 hover:text-white hover:bg-white/10 border-0">
                {t('logout')}
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Ultra Lüks konsept */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Arkaplan görseli - lüks yat/otel */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2017/10/six-senses-zil-payson-seychelles.jpg?fit=1300%2C731&ssl=1')",
          }}
        >
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Ana içerik */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current text-yellow-400">
                <path d="M12 2L8 8H16L12 2Z"/>
                <path d="M8 8L4 14H20L16 8H8Z"/>
                <path d="M4 14L2 20H22L20 14H4Z"/>
              </svg>
            </div>
          </div>

          {/* Ana başlık - Ultra lüks tipografi */}
          <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.1em] mb-8 leading-[0.9]">
            <span className="block text-white/95">YENİ KEŞİFLERİN</span>
            <span className="block text-yellow-400/90 font-thin tracking-[0.15em]">AYRICALIKLARLA</span>
            <span className="block text-white/95">BULUŞTUĞU NOKTA</span>
          </h1>

          {/* Alt başlık */}
          <p className="text-xl md:text-2xl font-light text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed tracking-wide">
            Dünyanın en prestijli destinasyonlarında unutulmaz deneyimler yaşayın.
          </p>

          {/* Arama çubuğu */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Destinasyonunuzu bulun"
                className="w-full bg-white/95 text-black placeholder-gray-500 px-8 py-4 text-lg rounded-none border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-3 hover:bg-yellow-400 hover:text-black transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Alt navigasyon - Four Seasons tarzı */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex justify-center space-x-12">
              <Link to="/hotels" className="flex flex-col items-center space-y-2 text-white/80 hover:text-yellow-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                    <path d="M2 17L12 22L22 17"/>
                    <path d="M2 12L12 17L22 12"/>
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-wider font-light">TÜM OTELLER</span>
              </Link>
              
              <div className="flex flex-col items-center space-y-2 text-white/80 hover:text-yellow-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"/>
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-wider font-light">KONUTLAR</span>
              </div>
              
              <Link to="/tours" className="flex flex-col items-center space-y-2 text-white/80 hover:text-yellow-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-wider font-light">TURLAR</span>
              </Link>
              
              <div className="flex flex-col items-center space-y-2 text-white/80 hover:text-yellow-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M8.1 13.34L2 9.27L13.36 1.47L21.39 6.2L8.1 13.34Z"/>
                    <path d="M22 21L2 21L2 19L22 19L22 21Z"/>
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-wider font-light">YİYECEK</span>
              </div>
              
              <div className="flex flex-col items-center space-y-2 text-white/80 hover:text-yellow-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"/>
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-wider font-light">ÖZEL JET</span>
              </div>
              
              <Link to="/yachts" className="flex flex-col items-center space-y-2 text-white/80 hover:text-yellow-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M20 21C20 19.62 19.38 19 18 19H6C4.62 19 4 19.62 4 21V22H6V21H18V22H20V21M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1H5C3.89 1 3 1.89 3 3V7C3 8.11 3.89 9 5 9V19C5 20.11 5.89 21 7 21H17C18.11 21 19 20.11 19 19V9H21M17 9H7V3H12V8H17V9Z"/>
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-wider font-light">YATLAR</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Keşfetme Bölümü - Lüks konsept */}
      <section className="relative bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Başlık */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wider">
              <span className="block">YENİ KEŞİFLERİN</span>
              <span className="block text-yellow-400 font-thin">AYRICALIKLARLA BULUŞTUĞU NOKTA</span>
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
              Dünyanın en prestijli destinasyonlarında unutulmaz deneyimler yaşayın
            </p>
          </div>

          {/* Keşfetme kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kart 1 - Lüks Oteller */}
            <Link to="/hotels" className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Lüks Otel"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                  LÜKS OTELLER
                </h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  Dünyanın en prestijli otellerinde konaklayın. Her detayda mükemmellik arayanlar için tasarlandı.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-light text-sm tracking-wider uppercase">
                    Keşfet →
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/60 text-sm">Premium</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Kart 2 - Turlar */}
            <Link to="/tours" className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://www.tailormadeafrica.com/wp-content/uploads/s2-1-1200x675.jpg"
                  alt="Turlar"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                  TURLAR
                </h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  Unutulmaz tur deneyimleri. Dünyanın en güzel yerlerini keşfedin ve anılar biriktirin.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-light text-sm tracking-wider uppercase">
                    Keşfet →
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/60 text-sm">Adventure</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Kart 3 - Yat Deneyimleri */}
            <Link to="/yachts" className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://media.tacdn.com/media/attractions-splice-spp-674x446/10/5a/d4/bf.jpg"
                  alt="Lüks Yat"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                  YAT DENEYİMLERİ
                </h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  Dünyanın en güzel koylarında lüks yatlarla seyahat edin. Denizde unutulmaz anlar.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-light text-sm tracking-wider uppercase">
                    Keşfet →
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/60 text-sm">Luxury</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Lüks konsept */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo ve açıklama */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-yellow-400">
                    <path d="M12 2L8 8H16L12 2Z"/>
                    <path d="M8 8L4 14H20L16 8H8Z"/>
                    <path d="M4 14L2 20H22L20 14H4Z"/>
                  </svg>
                </div>
                <span className="text-2xl font-light text-white tracking-wider">{t('brand')}</span>
              </div>
              <p className="text-white/60 font-light leading-relaxed max-w-md">
                Dünyanın en prestijli destinasyonlarında unutulmaz deneyimler sunuyoruz. 
                Her detayda mükemmellik arayanlar için tasarlandı.
              </p>
            </div>

            {/* Hızlı linkler */}
            <div>
              <h3 className="text-white font-light text-lg mb-6 tracking-wider uppercase">Hizmetler</h3>
              <ul className="space-y-3">
                <li><Link to="/hotels" className="text-white/60 hover:text-yellow-400 transition-colors font-light">Lüks Oteller</Link></li>
                <li><Link to="/tours" className="text-white/60 hover:text-yellow-400 transition-colors font-light">Özel Turlar</Link></li>
                <li><Link to="/experiences" className="text-white/60 hover:text-yellow-400 transition-colors font-light">Deneyimler</Link></li>
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">Özel Jet</a></li>              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h3 className="text-white font-light text-lg mb-6 tracking-wider uppercase">iletişim</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">+90 533 602 07 04</a></li>
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">mirayaymete@gmail.com</a></li>
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">7/24 Destek</a></li>
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">Rezervasyon</a></li>
              </ul>
            </div>
          </div>

          {/* Alt çizgi */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 font-light text-sm">
              © 2024 {t('brand')}. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/40 hover:text-yellow-400 transition-colors text-sm font-light">Gizlilik Politikası</a>
              <a href="#" className="text-white/40 hover:text-yellow-400 transition-colors text-sm font-light">Kullanım Şartları</a>
              <a href="#" className="text-white/40 hover:text-yellow-400 transition-colors text-sm font-light">Çerez Politikası</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



