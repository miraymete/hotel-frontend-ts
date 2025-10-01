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
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search, BedDouble, Package2, Plane, Globe, Heart, ArrowLeft, ArrowRight } from "lucide-react";
import type { PublicUser } from "@/lib/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Link } from "react-router-dom";

// ana sayfa bileşeninin prop'ları
type Props = {
  user: PublicUser | null;        // giriş yapmış kullanıcı bilgisi
  onLogout: () => void;           // çıkış yapma fonksiyonu
  onOpenLogin: () => void;        // giriş modal'ını açma fonksiyonu
  onOpenRegister: () => void;     // kayıt modal'ını açma fonksiyonu
  onOpenLanguage: () => void;     // dil seçim modal'ını açma fonksiyonu
};

export default function HomePage({
  user,
  onLogout,
  onOpenLogin,
  onOpenRegister,
  onOpenLanguage,
}: Props) {
  // context'lerden gelen fonksiyonlar
  const { t } = useLanguage();                    // çeviri fonksiyonu
  const { addToFavorites, isFavorite } = useFavorites(); // favori yönetimi

  // arama formu state'leri
  const [adults, setAdults] = useState(2);        // yetişkin sayısı
  const [children, setChildren] = useState(0);    // çocuk sayısı
  const [onlyAvailable, setOnlyAvailable] = useState(false); // sadece müsait oteller
  const [activeTab, setActiveTab] = useState<'otel' | 'paket' | 'ucak'>('otel'); // aktif sekme

  // keşfetme kartları için scroll referansı
  const ideasRef = useRef<HTMLDivElement>(null);

  // keşfetme kartlarını yatay olarak kaydırma fonksiyonu
  const scrollIdeas = (dir: 1 | -1) => {
    const el = ideasRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("a");
    const step = firstCard ? firstCard.offsetWidth + 32 /* gap-8 */ : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

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
    <div className="min-h-screen">
      {/* üst menü */}
      <header className="sticky top-0 z-[60] flex justify-between items-center px-10 py-6 bg-white/90 backdrop-blur shadow-md">
        <Link to="/" className="text-2xl font-bold text-[#3620D9] hover:text-[#4230FF] transition-colors">{t('brand')}</Link>

        {/* orta menü */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/hotels" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">{t('hotels')}</Link>
          <Link to="/tours" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">{t('tours')}</Link>
          <Link to="/experiences" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">{t('experiences')}</Link>
          <Link to="/favorites" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">{t('favorites')}</Link>
          <Link to="/contact" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">{t('contact')}</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* dil para */}
          <button
            onClick={onOpenLanguage}
            className="flex items-center space-x-2 border px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <Globe className="w-4 h-4" />
            <span>TR · TL</span>
          </button>

          {!user ? (
            <>
              <div className="relative">
                <Link to="/login">
                  <Button variant="outline">
                    {t('login')}
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <Link to="/register">
                  <Button className="bg-[#3620D9] hover:bg-[#4230FF] text-white">
                    {t('register')}
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3620D9]/10 text-[#3620D9] font-bold">
                {user.name
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <span className="hidden md:inline text-sm text-gray-700">
                {t('hello')}, <b>{user.name}</b>
              </span>
              <Button variant="outline" onClick={onLogout}>
                {t('logout')}
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* modal tetikleyiciler App seviyesinde yönetiliyor */}
      <section className="relative pb-36 md:pb-44">
        <div
          className="w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg')",
          }}
        ></div>

        {/* dikey rezervasyon arama kartı*/}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
          <div className="w-[420px] bg-white/95 rounded-2xl shadow-xl border-2 border-[#3620D9] p-5">
            {/* sekmeler */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setActiveTab('otel')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border transition
                  ${activeTab==='otel' ? 'bg-[#3620D9] text-white border-[#3620D9]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
              >
                <BedDouble className="w-4 h-4" /> {t('hotels')}
              </button>
              <button
                onClick={() => setActiveTab('paket')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border transition
                  ${activeTab==='paket' ? 'bg-[#3620D9] text-white border-[#3620D9]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
              >
                <Package2 className="w-4 h-4" /> {t('tours')}
              </button>
              <button
                onClick={() => setActiveTab('ucak')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border transition
                  ${activeTab==='ucak' ? 'bg-[#3620D9] text-white border-[#3620D9]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
              >
                <Plane className="w-4 h-4" /> {t('experiences')}
              </button>
            </div>

            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <Search className="w-5 h-5 text-[#3620D9]" /> {t('searchHoliday')}
            </h3>

            <label className="text-sm text-gray-600">{t('region')}</label>
            <input
              type="text"
              placeholder={t('regionPlaceholder')}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-sm text-gray-600">{t('checkIn')}</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
              </div>
              <div>
                <label className="text-sm text-gray-600">{t('checkOut')}</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-sm text-gray-600">{t('adults')}</label>
                <div className="mt-1 flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="px-3 py-2 text-lg hover:bg-gray-100 rounded-l-lg"
                    aria-label="Yetişkin azalt"
                  >−</button>
                  <div className="flex-1 text-center select-none">{adults}</div>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="px-3 py-2 text-lg hover:bg-gray-100 rounded-r-lg"
                    aria-label="Yetişkin arttır"
                  >+</button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">{t('children')}</label>
                <div className="mt-1 flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="px-3 py-2 text-lg hover:bg-gray-100 rounded-l-lg"
                    aria-label="Çocuk azalt"
                  >−</button>
                  <div className="flex-1 text-center select-none">{children}</div>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="px-3 py-2 text-lg hover:bg-gray-100 rounded-r-lg"
                    aria-label="Çocuk arttır"
                  >+</button>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                className="accent-[#3620D9]"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
              />
              <span className="text-sm text-gray-700">{t('onlyAvailable')}</span>
            </label>

            <button className="mt-4 w-full bg-[#3620D9] hover:bg-[#4230FF] text-white font-semibold py-3 rounded-xl">
              {t('searchHotel')}
            </button>
          </div>
        </div>

        {/* sol panel son dakika fırsatlar*/}
        <div className="absolute top-20 left-10 bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 w-[340px]">
          <h2 className="text-xl font-bold mb-4 text-[#3620D9]">{t('lastMinuteDeals')}</h2>

          <div className="space-y-4">
            {/* 1. kart */}
            <a
              href="/otel/vogue-hotel-supreme-bodrum"
              className="flex items-start gap-3 p-3 border-b rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition"
            >
              <img
                src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Vogue Hotel Supreme Bodrum"
                className="h-14 w-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">Vogue Hotel Supreme Bodrum</h3>
                <p className="text-sm text-gray-500">Muğla, Bodrum</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">9.0</span>
                  <span className="text-xs text-gray-700">{t('excellent')}</span>
                </div>
              </div>
            </a>

            {/* 2. kart */}
            <a
              href="/otel/fashiontv-luxe-resort"
              className="flex items-start gap-3 p-3 border-b rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition"
            >
              <img
                src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="FashionTV Luxe Resort"
                className="h-14 w-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">FashionTV Luxe Resort</h3>
                <p className="text-sm text-gray-500">Antalya, Kemer</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">9.0</span>
                  <span className="text-xs text-gray-700">{t('excellent')}</span>
                </div>
              </div>
            </a>

            {/* 3. kart */}
            <a
              href="/otel/litore-resort-hotel-spa"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition"
            >
              <img
                src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Litore Resort Hotel & Spa"
                className="h-14 w-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">Litore Resort Hotel & Spa</h3>
                <p className="text-sm text-gray-500">Antalya, Alanya</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">9.2</span>
                  <span className="text-xs text-gray-700">{t('excellent')}</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* sağ panelson Aramalar */}
        <div className="absolute top-20 right-10 bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 w-[340px]">
          <h2 className="text-xl font-bold mb-4 text-[#3620D9]">{t('recentSearches')}</h2>

          <div className="space-y-4">
            {/* 1. kart */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => (window.location.href = '/otel/homely-studios')}
              onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/otel/homely-studios')}
              className="flex items-start gap-3 p-3 border-b rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition cursor-pointer"
            >
              <img
                src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Homely Studios"
                className="h-14 w-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">Homely Studios</h3>
                <p className="text-sm text-gray-500">Sakız, Yunanistan</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">8.8</span>
                  <a
                    href="/otel/homely-studios/yorumlar"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-[#3620D9] underline underline-offset-2 hover:text-[#4230FF]"
                  >
                    506 {t('reviews')}
                  </a>
                </div>
              </div>
            </div>

            {/* 2. kart */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => (window.location.href = '/otel/sweet-cottage-in-the-city')}
              onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/otel/sweet-cottage-in-the-city')}
              className="flex items-start gap-3 p-3 border-b rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition cursor-pointer"
            >
              <img
                src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sweet Cottage In The City"
                className="h-14 w-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">Sweet Cottage In The City</h3>
                <p className="text-sm text-gray-500">Sakız, Yunanistan</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">9.1</span>
                  <a
                    href="/otel/sweet-cottage-in-the-city/yorumlar"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-[#3620D9] underline underline-offset-2 hover:text-[#4230FF]"
                  >
                    12 {t('reviews')}
                  </a>
                </div>
              </div>
            </div>

            {/* 3. kart */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => (window.location.href = '/otel/grecian-castle-chios')}
              onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/otel/grecian-castle-chios')}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition cursor-pointer"
            >
              <img
                src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Grecian Castle Chios"
                className="h-14 w-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">Grecian Castle Chios</h3>
                <p className="text-sm text-gray-500">Sakız, Yunanistan</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">7.9</span>
                  <a
                    href="/otel/grecian-castle-chios/yorumlar"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-[#3620D9] underline underline-offset-2 hover:text-[#4230FF]"
                  >
                    1.815 {t('reviews')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İkinci arkaplan görseli - Keşfetme kartları üzerinde */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images5.alphacoders.com/438/438649.jpg')" }}
      >
        <div className="w-full h-[600px]" />
        
        {/* Keşfetme kartları bu arkaplan üzerinde */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-16">
            {/* Başlık + Kaydırma tuşları */}
            <div className="flex items-center justify-between gap-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3620D9] drop-shadow-2xl text-center flex-1">
                {t('discover')}
              </h2>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollIdeas(-1)}
                  className="rounded-full p-3 bg-white/95 shadow-lg hover:bg-white active:scale-95 transition-all duration-200"
                  aria-label="Sola kaydır"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollIdeas(1)}
                  className="rounded-full p-3 bg-white/95 shadow-lg hover:bg-white active:scale-95 transition-all duration-200"
                  aria-label="Sağa kaydır"
                >
                  <ArrowRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* yatay kaydırma kartları */}
            <div
              ref={ideasRef}
              className="
                grid grid-flow-col auto-cols-[minmax(300px,450px)]
                gap-10 overflow-x-auto no-scrollbar pb-4
                snap-x snap-mandatory
              "
            >
              {/* kart 1 - Yıldız İzleme */}
              <a
                href="/fikirler/yildiz-izleme"
                aria-label="Dünyanın dört bir yanında yıldızları izleyebileceğiniz yerler"
                className="group snap-start bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={discoveryHotels[0].image}
                    alt="Yıldızlı gökyüzü"
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleHeartClick(discoveryHotels[0], e)}
                    className={`absolute right-4 top-4 bg-white/95 rounded-full p-3 shadow-lg group-hover:scale-110 transition-all duration-200 ${
                      isFavorite(discoveryHotels[0].id) ? 'text-red-500' : 'text-[#3620D9]'
                    }`}
                    aria-label="Favorilere ekle"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite(discoveryHotels[0].id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="px-6 py-6">
                  <p className="text-center text-lg leading-7 font-semibold text-gray-800">
                    Utah'tan Dubai'ye kadar yıldızları seyretmek için gidilebilecek
                    yerleri keşfedin!
                  </p>
                </div>
              </a>

              {/* kart 2 - Kültür Sanat */}
              <a
                href="/fikirler/kultur-sanat"
                aria-label="Paris, New York ve popüler kültür mekanlarında sanat"
                className="group snap-start bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={discoveryHotels[1].image}
                    alt="Gothic katedral"
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleHeartClick(discoveryHotels[1], e)}
                    className={`absolute right-4 top-4 bg-white/95 rounded-full p-3 shadow-lg group-hover:scale-110 transition-all duration-200 ${
                      isFavorite(discoveryHotels[1].id) ? 'text-red-500' : 'text-[#3620D9]'
                    }`}
                    aria-label="Favorilere ekle"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite(discoveryHotels[1].id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="px-6 py-6">
                  <p className="text-center text-lg leading-7 font-semibold text-gray-800">
                    Paris'te, New York'ta ve diğer popüler kültür mekanlarında sanatla ilgilenin!
                  </p>
                </div>
              </a>

              {/* kart 3 - Gurme Rotalar */}
              <a
                href="/fikirler/gurme-rotalar"
                aria-label="10 şehirde 10 yemek rotası"
                className="group snap-start bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={discoveryHotels[2].image}
                    alt="Asya mutfağı"
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleHeartClick(discoveryHotels[2], e)}
                    className={`absolute right-4 top-4 bg-white/95 rounded-full p-3 shadow-lg group-hover:scale-110 transition-all duration-200 ${
                      isFavorite(discoveryHotels[2].id) ? 'text-red-500' : 'text-[#3620D9]'
                    }`}
                    aria-label="Favorilere ekle"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite(discoveryHotels[2].id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="px-6 py-6">
                  <p className="text-center text-lg leading-7 font-semibold text-gray-800">
                    10 şehir, 10 inanılmaz yemek kültürü!
                  </p>
                </div>
              </a>
            </div> 
          </div> 
        </div>
      </section>
    </div>
  );
}



