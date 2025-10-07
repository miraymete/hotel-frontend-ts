/**
 * 
 * navigasyon menüsü
 * arama
 */
import { Button } from "@/components/ui/button";
import { Search, Globe, Heart, MapPin } from "lucide-react";
import type { PublicUser } from "@/lib/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

type Props = {
  user: PublicUser | null;        // kullanıcı bilgisi
  onLogout: () => void;           // çıkış yapma 
  onOpenLanguage: () => void;     // dil seçim 
};

export default function HomePage({
  user,
  onLogout,
  onOpenLanguage,
}: Props) {
  // contextlerden gelen fonk
  const { t, language } = useLanguage();          // çeviri ve dil
  const { currency } = useCurrency();             // para 
  
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const popularCities = [
    // tr
    "İstanbul, Türkiye","İzmir, Türkiye", "Antalya, Türkiye", "Kapadokya, Türkiye", "Bodrum, Türkiye", 
    "Marmaris, Türkiye", "Çeşme, Türkiye", "Pamukkale, Türkiye", "Fethiye, Türkiye",
    "Alanya, Türkiye", "Kuşadası, Türkiye", "Kaş, Türkiye",
    
    // avrupa
    "Paris, Fransa", "Londra, İngiltere", "Roma, İtalya", "Barcelona, İspanya",
    "Amsterdam, Hollanda", "Berlin, Almanya", "Viyana, Avusturya", "Prag, Çek Cumhuriyeti",
    "Budapest, Macaristan", "Santorini, Yunanistan", "Mykonos, Yunanistan", "Atina, Yunanistan",
    "Zürih, İsviçre", "İnterlaken, İsviçre", "Zermatt, İsviçre", "Salzburg, Avusturya",
    
    "Tokyo, Japonya", "Kyoto, Japonya", "Seoul, Güney Kore", "Bangkok, Tayland",
    "Singapur, Singapur", "Hong Kong, Çin", "Dubai, BAE", "Abu Dhabi, BAE",
    "Bali, Endonezya", "Phuket, Tayland", "Kuala Lumpur, Malezya", "Ho Chi Minh, Vietnam",
    
    "New York, ABD", "Los Angeles, ABD", "Miami, ABD", "Las Vegas, ABD",
    "San Francisco, ABD", "Toronto, Kanada", "Vancouver, Kanada", "Rio de Janeiro, Brezilya",
    "Buenos Aires, Arjantin", "Lima, Peru", "Mexico City, Meksika", "Cancun, Meksika",
    
    // afrika
    "Cape Town, Güney Afrika", "Marrakech, Fas", "Cairo, Mısır", "Sydney, Avustralya",
    "Melbourne, Avustralya", "Auckland, Yeni Zelanda", "Queenstown, Yeni Zelanda"
  ];

  // arama fonk
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (value.length > 0) {
      const filtered = popularCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 10)); // İlk 10 öneri
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setFilteredCities([]);
    }
  };

  const handleInputFocus = () => {
    if (searchValue.length > 0) {
      setShowSuggestions(true);
    } else {
      setFilteredCities(popularCities.slice(0, 15));
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
// işlem içn bekleme süresi
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleCitySelect = (city: string) => {
    setSearchValue(city);
    setShowSuggestions(false);
    console.log("Selected city:", city);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
    }
  };

// başka bir yere tıklandığında aramaları kapatanzi
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-[60] flex justify-between items-center px-8 py-4 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors">
          <span className="text-xl font-light tracking-wider">{t('brand')}</span>
        </Link>

        <nav className="hidden lg:flex space-x-8 text-white/90 font-light text-sm tracking-wide">
          <Link to="/hotels" className="px-3 py-2 hover:text-yellow-400 transition-colors uppercase tracking-wider">{t('hotels')}</Link>
          <Link to="/tours" className="px-3 py-2 hover:text-yellow-400 transition-colors uppercase tracking-wider">{t('tours')}</Link>
          <Link to="/yachts" className="px-3 py-2 hover:text-yellow-400 transition-colors uppercase tracking-wider">{t('yachts')}</Link>
          <Link to="/experiences" className="px-3 py-2 hover:text-yellow-400 transition-colors uppercase tracking-wider">{t('experiences')}</Link>
        </nav>


        <div className="flex items-center space-x-6">
          <Link to="/favorites">
            <button className="flex items-center space-x-2 text-white/80 hover:text-red-400 transition-colors text-sm">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline uppercase tracking-wide">{t('favorites')}</span>
            </button>
          </Link>

          <button
            onClick={onOpenLanguage}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase tracking-wide">
              {language === 'tr' ? 'TR' : 'EN'} · {currency}
            </span>
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
              <Link 
                to="/account" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-400 font-medium text-sm cursor-pointer hover:bg-yellow-400/30 transition-colors">
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
              </Link>
              <Button variant="ghost" onClick={onLogout} className="text-white/80 hover:text-white hover:bg-white/10 border-0">
                {t('logout')}
              </Button>
            </div>
          )}
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2017/10/six-senses-zil-payson-seychelles.jpg?fit=1300%2C731&ssl=1')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">

          <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.1em] mb-8 leading-[0.9]">
            <span className="block text-white/95">{t('newDiscoveries')}</span>
            <span className="block text-yellow-400/90 font-thin tracking-[0.15em]">{t('privileges')}</span>
            <span className="block text-white/95">{t('meetAt')} {t('point')}</span>
          </h1>

          {/* alt başlık */}
          <p className="text-xl md:text-2xl font-light text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed tracking-wide">
            {t('homeSubtitle')}
          </p>

          {/* arama */}
          <div className="max-w-2xl mx-auto relative z-[9998]">
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t('searchDestination')}
                  value={searchValue}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full bg-white/95 text-black placeholder-gray-500 px-8 py-4 text-lg rounded-none border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-3 hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  <Search className="w-6 h-6" />
                </button>
              </form>
              
              {/* öneriler */}
              {showSuggestions && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border border-gray-200 max-h-80 overflow-y-auto z-[9999] shadow-2xl">
                  {filteredCities.map((city, index) => (
                    <div
                      key={index}
                      onClick={() => handleCitySelect(city)}
                      className="px-6 py-4 hover:bg-yellow-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-800 font-medium">{city}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </section>

      <section className="relative bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* başlık */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wider">
              <span className="block">{t('newDiscoveries')}</span>
              <span className="block text-yellow-400 font-thin">{t('privileges')} {t('meetAt')} {t('point')}</span>
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
              {t('homeSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/hotels" className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Hotel"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                  {t('luxuryHotelsTitle')}
                </h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  {t('luxuryHotelsDesc')}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-light text-sm tracking-wider uppercase">
                    {t('discoverArrow')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/60 text-sm">{t('premium')}</span>
                  </div>
                </div>
              </div>
            </Link>


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
                  {t('toursTitle')}
                </h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  {t('toursDesc')}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-light text-sm tracking-wider uppercase">
                    {t('discoverArrow')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/60 text-sm">{t('adventureTag')}</span>
                  </div>
                </div>
              </div>
            </Link>


            <Link to="/yachts" className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://media.tacdn.com/media/attractions-splice-spp-674x446/10/5a/d4/bf.jpg"
                  alt="Luxury Yacht"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                  {t('yachtExperiencesTitle')}
                </h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  {t('yachtExperiencesDesc')}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-light text-sm tracking-wider uppercase">
                    {t('discoverArrow')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/60 text-sm">{t('luxuryTag')}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl font-light text-white tracking-wider">{t('brand')}</span>
              </div>
              <p className="text-white/60 font-light leading-relaxed max-w-md">
                {t('footerDesc')}
              </p>
            </div>

            <div>
              <h3 className="text-white font-light text-lg mb-6 tracking-wider uppercase">{t('services')}</h3>
              <ul className="space-y-3">
                <li><Link to="/hotels" className="text-white/60 hover:text-yellow-400 transition-colors font-light">{t('luxuryHotels')}</Link></li>
                <li><Link to="/tours" className="text-white/60 hover:text-yellow-400 transition-colors font-light">{t('specialTours')}</Link></li>
                <li><Link to="/experiences" className="text-white/60 hover:text-yellow-400 transition-colors font-light">{t('experiencesTag')}</Link></li>
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">{t('privateJet')}</a></li>              </ul>
            </div>

            <div>
              <h3 className="text-white font-light text-lg mb-6 tracking-wider uppercase">{t('contactTag')}</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">+90 533 602 07 04</a></li>
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">mirayaymete@gmail.com</a></li>
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">{t('support247')}</a></li>
                <li><a href="#" className="text-white/60 hover:text-yellow-400 transition-colors font-light">{t('reservationTag')}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 font-light text-sm">
              © 2024 {t('brand')}. {t('allRightsReserved')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/40 hover:text-yellow-400 transition-colors text-sm font-light">{t('privacyPolicy')}</a>
              <a href="#" className="text-white/40 hover:text-yellow-400 transition-colors text-sm font-light">Terms of Use</a>
              <a href="#" className="text-white/40 hover:text-yellow-400 transition-colors text-sm font-light">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



