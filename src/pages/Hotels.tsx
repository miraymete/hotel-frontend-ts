import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart, Calendar } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/lib/auth";
import BookingModal, { BookingItem, BookingData } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";

interface Hotel {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  tags: string[];
  category: string;
  rating: number;
  reviews: number;
  price: number;
  isRecommended: boolean;
}

export default function HotelsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  
  // Booking modal state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<BookingItem | null>(null);

  const toggleFavorite = (hotel: Hotel) => {
    if (isFavorite(hotel.id)) {
      removeFromFavorites(hotel.id);
    } else {
      addToFavorites(hotel);
    }
  };

  const handleBookingClick = (hotel: Hotel) => {
    if (!isAuthenticated()) {
      alert('Rezervasyon yapmak için giriş yapmalısınız');
      return;
    }

    const bookingItem: BookingItem = {
      id: parseInt(hotel.id),
      name: hotel.name,
      location: hotel.location,
      type: 'hotel',
      basePrice: hotel.price,
      currency: 'TRY',
      imageUrl: hotel.image,
      description: hotel.description,
    };

    setSelectedHotel(bookingItem);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = async (bookingData: BookingData) => {
    try {
      // Burada API çağrısı yapılacak
      console.log('Hotel booking data:', bookingData);
      
      // Mock success
      alert('Rezervasyon başarıyla oluşturuldu!');
      setBookingModalOpen(false);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Rezervasyon sırasında bir hata oluştu');
    }
  };

  const filters = [
    { key: "all", label: t('all') },
    { key: "resort", label: t('resort') },
    { key: "luxury", label: t('luxury') },
    { key: "boutique", label: t('boutique') },
    { key: "business", label: t('business') }
  ];

  // Türkçe metinleri İngilizce'ye çeviren fonksiyon
  const translateText = (text: string) => {
    const translations: { [key: string]: string } = {
      // Şehirler
      'Antalya, Türkiye': `${t('antalya')}, ${t('turkey')}`,
      'Bodrum, Türkiye': `${t('bodrum')}, ${t('turkey')}`,
      'Kapadokya, Türkiye': `${t('cappadocia')}, ${t('turkey')}`,
      'İstanbul, Türkiye': `${t('istanbul')}, ${t('turkey')}`,
      'Çeşme, Türkiye': `${t('cesme')}, ${t('turkey')}`,
      'Safranbolu, Türkiye': `${t('safranbolu')}, ${t('turkey')}`,
      'Ankara, Türkiye': `${t('ankara')}, ${t('turkey')}`,
      'Alanya, Türkiye': `${t('alanya')}, ${t('turkey')}`,
      'İzmir, Türkiye': `${t('izmir')}, ${t('turkey')}`,
      
      // Kategoriler
      'Resort': t('resort'),
      'Lüks': t('luxury'),
      'Butik': t('boutique'),
      'İş': t('business'),
      
      // Tags
      'Spa': 'Spa',
      'Marina': 'Marina',
      'Romantik': 'Romantic',
      'Şehir': t('city'),
      'All-Inclusive': 'All-Inclusive',
      'Tarihi': 'Historical',
      'Modern': 'Modern',
      'Casino': 'Casino',
      'VIP': 'VIP',
      
      // Açıklamalar
      'Lüks deneyim ve muhteşem spa hizmetleri ile unutulmaz bir tatil.': t('palaceDesc'),
      'Deniz manzaralı lüks suitler ve özel marina erişimi ile eşsiz konaklama.': t('marinaDesc'),
      'Dağ manzaralı butik otel, romantik atmosfer ve kişiselleştirilmiş hizmet.': t('mountainDescHotel'),
      'Şehir merkezinde modern iş oteli, toplantı salonları ve ücretsiz Wi-Fi.': t('businessDesc'),
      'Plaj kenarında all-inclusive resort, çocuk kulübü ve su sporları.': t('beachDesc'),
      'Osmanlı mimarisinde lüks saray oteli, özel butler hizmeti ve spa.': t('royalDesc'),
      'Tarihi binada restore edilmiş butik otel, antika mobilyalar ve özel atmosfer.': t('historicDesc'),
      'İş merkezinde modern otel, 24 saat oda servisi ve toplantı salonları.': t('corporateDesc'),
      'Tropikal bahçeler içinde casino\'lu resort, eğlence ve dinlence bir arada.': t('tropicalDesc'),
      'Elmas standartlarında lüks otel, şampanya servisi ve özel concierge.': t('diamondDesc'),
    };
    
    return translations[text] || text;
  };

  const hotels: Hotel[] = [
    {
      id: "1",
      name: "Grand Palace Resort & Spa",
      description: "Lüks deneyim ve muhteşem spa hizmetleri ile unutulmaz bir tatil.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Antalya, Türkiye",
      tags: ["Resort", "Spa"],
      category: "Resort",
      rating: 4.8,
      reviews: 1247,
      price: 8500,
      isRecommended: true
    },
    {
      id: "2", 
      name: "Marina Luxury Suites",
      description: "Deniz manzaralı lüks suitler ve özel marina erişimi ile eşsiz konaklama.",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/564876518.jpg?k=90ce52c9e440223867f84d1dea0ad2776b0fbbde28e425d5c82fb5d96b4f8757&o=&hp=1",
      location: "Bodrum, Türkiye",
      tags: ["Lüks", "Marina"],
      category: "Lüks",
      rating: 4.9,
      reviews: 892,
      price: 12000,
      isRecommended: true
    },
    {
      id: "3",
      name: "Mountain View Boutique Hotel",
      description: "Dağ manzaralı butik otel, romantik atmosfer ve kişiselleştirilmiş hizmet.",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/713043359.jpg?k=bd4d69727d80c9c7d88600f643b829774fa58c4ad94d58bb76c83cfb6fc27bab&o=&hp=1",
      location: "Kapadokya, Türkiye",
      tags: ["Romantik", "Butik"],
      category: "Butik",
      rating: 4.7,
      reviews: 634,
      price: 6500,
      isRecommended: false
    },
    {
      id: "4",
      name: "Urban Business Center",
      description: "Şehir merkezinde modern iş oteli, toplantı salonları ve ücretsiz Wi-Fi.",
      image: "https://alutech-group.com/upload/iblock/aae/1.webp",
      location: "İstanbul, Türkiye",
      tags: ["İş", "Şehir"],
      category: "İş",
      rating: 4.5,
      reviews: 2156,
      price: 3200,
      isRecommended: false
    },
    {
      id: "5",
      name: "Beach Paradise Resort",
      description: "Plaj kenarında all-inclusive resort, çocuk kulübü ve su sporları.",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/266488982.jpg?k=3cd6685bf34b9eaa24fb09124d4f7dfcef3372c2f49b16f29d317e83c41f4eb0&o=&hp=1",
      location: "Çeşme, Türkiye",
      tags: ["Resort", "All-Inclusive"],
      category: "Resort",
      rating: 4.6,
      reviews: 1876,
      price: 7200,
      isRecommended: true
    },
    {
      id: "6",
      name: "Royal Luxury Palace",
      description: "Osmanlı mimarisinde lüks saray oteli, özel butler hizmeti ve spa.",
      image: "https://i.ytimg.com/vi/iLcvkunVR6Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAhA27KJRVhFQNAWGPHRYgWT6Hv_g",
      location: "İstanbul, Türkiye",
      tags: ["Lüks", "Tarihi"],
      category: "Lüks",
      rating: 4.9,
      reviews: 1123,
      price: 15000,
      isRecommended: true
    },
    {
      id: "7",
      name: "Historic Boutique Inn",
      description: "Tarihi binada restore edilmiş butik otel, antika mobilyalar ve özel atmosfer.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/53/d8/9b/historic-boutique-hotel.jpg?w=900&h=500&s=1",
      location: "Safranbolu, Türkiye",
      tags: ["Butik", "Tarihi"],
      category: "Butik",
      rating: 4.8,
      reviews: 445,
      price: 4800,
      isRecommended: false
    },
    {
      id: "8",
      name: "Corporate Plaza Hotel",
      description: "İş merkezinde modern otel, 24 saat oda servisi ve toplantı salonları.",
      image: "https://images.myguide-cdn.com/seoul/companies/the-plaza-hotel-seoul/large/the-plaza-hotel-seoul-94216.jpg",
      location: "Ankara, Türkiye",
      tags: ["İş", "Modern"],
      category: "İş",
      rating: 4.4,
      reviews: 987,
      price: 2800,
      isRecommended: false
    },
    {
      id: "9",
      name: "Tropical Resort & Casino",
      description: "Tropikal bahçeler içinde casino'lu resort, eğlence ve dinlence bir arada.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-KC9RhrP6tbu15o0O5Df3n8ObyPW24hOOZg&s",
      location: "Alanya, Türkiye",
      tags: ["Resort", "Casino"],
      category: "Resort",
      rating: 4.3,
      reviews: 2341,
      price: 9500,
      isRecommended: false
    },
    {
      id: "10",
      name: "Diamond Luxury Collection",
      description: "Elmas standartlarında lüks otel, şampanya servisi ve özel concierge.",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/205974284.jpg?k=466aa2fa2cc891dd7889aab034b861ae96419befe1506fc400dccfefe48065cc&o=&hp=1",
      location: "İzmir, Türkiye",
      tags: ["Lüks", "VIP"],
      category: "Lüks",
      rating: 4.9,
      reviews: 567,
      price: 18000,
      isRecommended: true
    }
  ];

  // filtreleme mantığı
  const filteredHotels = activeFilter === "all" 
    ? hotels 
    : hotels.filter(hotel => {
        const filterMap: { [key: string]: string } = {
          'luxury': 'Lüks',
          'resort': 'Resort', 
          'boutique': 'Butik',
          'business': 'İş'
        };
        return hotel.category === filterMap[activeFilter];
      });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* header */}
      <header className="bg-black/80 backdrop-blur-md shadow-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
                 <Link 
                   to="/" 
                   className="flex items-center space-x-2 text-white/80 hover:text-yellow-400 transition-colors"
                 >
                   <ArrowLeft className="w-5 h-5" />
                   <span className="font-medium">{t('homePage')}</span>
                 </Link>
                 <h1 className="text-2xl font-light text-white">{t('luxuryHotels')}</h1>
                 <Link to="/favorites">
                   <button className="flex items-center space-x-2 text-white/80 hover:text-red-400 transition-colors">
                     <Heart className="w-5 h-5" />
                     <span className="font-medium">{t('favorites')}</span>
                   </button>
                 </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-none text-sm font-medium transition-colors ${
                  activeFilter === filter.key
                    ? "bg-yellow-600 text-white"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white/5 backdrop-blur-sm rounded-none shadow-lg border border-white/10 overflow-hidden hover:bg-white/10 hover:shadow-xl hover:border-yellow-400/50 transition-all duration-300">
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                {hotel.isRecommended && (
                       <div className="absolute top-3 right-3">
                         <span className="bg-yellow-600 text-white px-3 py-1 rounded-none text-xs font-medium">
                           {t('recommended')}
                         </span>
                       </div>
                )}
                <button
                  onClick={() => toggleFavorite(hotel)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-none hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(hotel.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                  </button>
                    </div>

              <div className="p-6">
                     <h3 className="text-xl font-semibold text-white mb-2">
                       {translateText(hotel.name)}
                     </h3>
                     <p className="text-white/70 text-sm mb-4 leading-relaxed">
                       {translateText(hotel.description)}
                     </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 text-white/90 rounded-none text-xs font-medium border border-white/30"
                    >
                      {translateText(tag)}
                    </span>
                  ))}
                </div>
                
                {/* rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(hotel.rating)}</div>
                        <span className="text-sm text-white/60">
                          ({hotel.reviews})
                        </span>
                      </div>
                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {translateText(hotel.location)}
                      </div>
                </div>

                {/* price ve button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-yellow-400">
                    {formatPrice(hotel.price)}
                  </div>
                  <Button 
                    onClick={() => handleBookingClick(hotel)}
                    className="bg-yellow-400 text-black hover:bg-yellow-300 font-medium px-6 py-2 rounded-none transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    {t('reservation')}
                  </Button>
                </div>
                </div>
              </div>
            ))}
        </div>
      </main>

      {selectedHotel && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          item={selectedHotel}
          onBookingSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
}