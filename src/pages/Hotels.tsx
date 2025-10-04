import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";

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

  const toggleFavorite = (hotel: Hotel) => {
    if (isFavorite(hotel.id)) {
      removeFromFavorites(hotel.id);
    } else {
      addToFavorites(hotel);
    }
  };

  const filters = [
    { key: "all", label: t('all') },
    { key: "resort", label: t('resort') },
    { key: "luxury", label: t('luxury') },
    { key: "boutique", label: t('boutique') },
    { key: "business", label: t('business') }
  ];

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
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "İzmir, Türkiye",
      tags: ["Lüks", "VIP"],
      category: "Lüks",
      rating: 4.9,
      reviews: 567,
      price: 18000,
      isRecommended: true
    }
  ];

  // Filtreleme mantığı
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
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden hover:bg-white/20 hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                {hotel.isRecommended && (
                       <div className="absolute top-3 right-3">
                         <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                           {t('recommended')}
                         </span>
                       </div>
                )}
                <button
                  onClick={() => toggleFavorite(hotel)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
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

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {hotel.name}
                </h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {hotel.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-xs font-medium border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(hotel.rating)}</div>
                        <span className="text-sm text-white/60">
                          ({hotel.reviews})
                        </span>
                      </div>
                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hotel.location}
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-yellow-400">
                    {formatPrice(hotel.price)}
                  </div>
                  <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                    {t('reservation')}
                  </button>
                </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}