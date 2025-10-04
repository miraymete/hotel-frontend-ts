import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart, Clock, Users } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Tour {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  tags: string[];
  category: string;
  rating: number;
  reviews: number;
  duration: string;
  groupSize: string;
  price: string;
  isRecommended: boolean;
}

export default function ToursPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { t } = useLanguage();

  const toggleFavorite = (tour: Tour) => {
    if (isFavorite(tour.id)) {
      removeFromFavorites(tour.id);
    } else {
      addToFavorites(tour);
    }
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  const filters = [
    { key: "all", label: t('all') },
    { key: "nature", label: t('nature') },
    { key: "adventure", label: t('adventure') },
    { key: "city", label: t('city') },
    { key: "history", label: t('history') }
  ];

  // Türkçe metinleri İngilizce'ye çeviren fonksiyon
  const translateText = (text: string) => {
    const translations: { [key: string]: string } = {
      // Şehirler
      'Kapadokya, Türkiye': `${t('cappadocia')}, ${t('turkey')}`,
      'Pamukkale, Türkiye': `${t('pamukkale')}, ${t('turkey')}`,
      'Bursa, Türkiye': `${t('bursa')}, ${t('turkey')}`,
      'Antalya, Türkiye': `${t('antalya')}, ${t('turkey')}`,
      'Artvin, Türkiye': `${t('artvin')}, ${t('turkey')}`,
      'Fethiye, Türkiye': `${t('fethiye')}, ${t('turkey')}`,
      'İstanbul, Türkiye': `${t('istanbul')}, ${t('turkey')}`,
      'Ankara, Türkiye': `${t('ankara')}, ${t('turkey')}`,
      'Efes, Türkiye': `${t('efes')}, ${t('turkey')}`,
      'Çanakkale, Türkiye': `${t('canakkale')}, ${t('turkey')}`,
      
      // Kategoriler
      'Doğa': t('nature'),
      'Macera': t('adventure'),
      'Şehir': t('city'),
      'Tarih': t('history'),
      
      // Süre ve kişi
      'saat': t('hours'),
      'kişi': t('people'),
      '/gün': t('perDay'),
      
      // İsimler ve açıklamalar
      'Kapadokya Balon Turu': t('balloonTour'),
      'Pamukkale Doğa Turu': t('natureTour'),
      'Uludağ Dağ Turu': t('mountainTour'),
      'Antalya Jeep Safari': t('safariTour'),
      'Rafting Macera Turu': t('raftingTour'),
      'Fethiye Paragliding': t('paraglidingTour'),
      'İstanbul Boğaz Turu': t('bosphorusTour'),
      'İstanbul Tarihi Yarımada': t('historicalTour'),
      'Ankara Modern Tur': t('modernTour'),
      'Efes Antik Kenti': t('ephesusTour'),
      'Çanakkale Gelibolu': t('gallipoliTour'),
      'Pamukkale Hierapolis': t('hierapolisTour'),
    };
    
    return translations[text] || text;
  };

  const tours: Tour[] = [
    // Doğa Turları
    {
      id: "1",
      name: "Kapadokya Balon Turu",
      description: "Gün doğumunda Kapadokya'nın büyüleyici manzarasını balonla keşfedin. Unutulmaz bir deneyim.",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: `${t('cappadocia')}, ${t('turkey')}`,
      tags: ["Doğa", "Macera"],
      category: "Doğa",
      rating: 4.9,
      reviews: 1247,
      duration: "3 saat",
      groupSize: "12 kişi",
      price: "€150",
      isRecommended: true
    },
    {
      id: "2",
      name: "Pamukkale Doğa Turu",
      description: "Beyaz travertenler ve termal suların büyüleyici dünyasını keşfedin.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Pamukkale, Türkiye",
      tags: ["Doğa", "Termal"],
      category: "Doğa",
      rating: 4.7,
      reviews: 892,
      duration: "5 saat",
      groupSize: "15 kişi",
      price: "€65",
      isRecommended: false
    },
    {
      id: "3",
      name: "Uludağ Dağ Turu",
      description: "Uludağ'ın muhteşem manzarasını teleferik ve yürüyüş ile keşfedin.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Bursa, Türkiye",
      tags: ["Doğa", "Dağ"],
      category: "Doğa",
      rating: 4.5,
      reviews: 634,
      duration: "7 saat",
      groupSize: "10 kişi",
      price: "€55",
      isRecommended: false
    },

    // Macera Turları
    {
      id: "4",
      name: "Antalya Jeep Safari",
      description: "Taurus Dağları'nın doğal güzelliklerini jeep ile keşfedin. Adrenalin dolu bir macera.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Antalya, Türkiye",
      tags: ["Macera", "Doğa"],
      category: "Macera",
      rating: 4.6,
      reviews: 634,
      duration: "6 saat",
      groupSize: "8 kişi",
      price: "€75",
      isRecommended: false
    },
    {
      id: "5",
      name: "Rafting Macera Turu",
      description: "Çoruh Nehri'nde adrenalin dolu rafting deneyimi. Doğanın gücünü hissedin.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Artvin, Türkiye",
      tags: ["Macera", "Su Sporları"],
      category: "Macera",
      rating: 4.8,
      reviews: 423,
      duration: "4 saat",
      groupSize: "12 kişi",
      price: "€85",
      isRecommended: true
    },
    {
      id: "6",
      name: "Paragliding Deneyimi",
      description: "Babadağ'dan uçarak Fethiye'nin muhteşem manzarasını havadan keşfedin.",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Fethiye, Türkiye",
      tags: ["Macera", "Havacılık"],
      category: "Macera",
      rating: 4.9,
      reviews: 756,
      duration: "2 saat",
      groupSize: "6 kişi",
      price: "€120",
      isRecommended: true
    },

    // Şehir Turları
    {
      id: "7", 
      name: "İstanbul Boğaz Turu",
      description: "Avrupa ve Asya'yı ayıran boğazın eşsiz manzarasını tekneyle keşfedin.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "İstanbul, Türkiye",
      tags: ["Şehir", "Deniz"],
      category: "Şehir",
      rating: 4.7,
      reviews: 892,
      duration: "2 saat",
      groupSize: "20 kişi",
      price: "€45",
      isRecommended: true
    },
    {
      id: "8",
      name: "İstanbul Tarihi Yarımada",
      description: "Sultanahmet, Ayasofya ve Topkapı Sarayı'nı rehber eşliğinde keşfedin.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "İstanbul, Türkiye",
      tags: ["Şehir", "Tarih"],
      category: "Şehir",
      rating: 4.8,
      reviews: 1234,
      duration: "6 saat",
      groupSize: "25 kişi",
      price: "€35",
      isRecommended: false
    },
    {
      id: "9",
      name: "Ankara Modern Tur",
      description: "Ankara'nın modern yüzünü ve kültürel zenginliklerini keşfedin.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Ankara, Türkiye",
      tags: ["Şehir", "Kültür"],
      category: "Şehir",
      rating: 4.4,
      reviews: 567,
      duration: "4 saat",
      groupSize: "18 kişi",
      price: "€30",
      isRecommended: false
    },

    // Tarih Turları
    {
      id: "10",
      name: "Efes Antik Kenti Turu",
      description: "Antik dönemin en önemli şehirlerinden Efes'i rehber eşliğinde keşfedin.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Efes, Türkiye",
      tags: ["Tarih", "Kültür"],
      category: "Tarih",
      rating: 4.8,
      reviews: 2156,
      duration: "4 saat",
      groupSize: "15 kişi",
      price: "€60",
      isRecommended: false
    },
    {
      id: "11",
      name: "Troy Antik Kenti",
      description: "Homeros'un İlyada destanına konu olan Troya'yı keşfedin.",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Çanakkale, Türkiye",
      tags: ["Tarih", "Antik"],
      category: "Tarih",
      rating: 4.6,
      reviews: 789,
      duration: "3 saat",
      groupSize: "20 kişi",
      price: "€40",
      isRecommended: false
    },
    {
      id: "12",
      name: "Hierapolis Antik Kenti",
      description: "Antik dönemin sağlık merkezi Hierapolis'i keşfedin.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Pamukkale, Türkiye",
      tags: ["Tarih", "Antik"],
      category: "Tarih",
      rating: 4.7,
      reviews: 945,
      duration: "2 saat",
      groupSize: "12 kişi",
      price: "€25",
      isRecommended: false
    }
  ];

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
                 <h1 className="text-2xl font-light text-white">{t('tours')}</h1>
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
                onClick={() => handleFilter(filter.key)}
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

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {tours
            .filter(tour => {
              if (activeFilter === "all") return true;
              const filterMap: { [key: string]: string } = {
                'nature': 'Doğa',
                'adventure': 'Macera',
                'city': 'Şehir', 
                'history': 'Tarih'
              };
              return tour.category === filterMap[activeFilter];
            })
            .map((tour) => (
            <div key={tour.id} className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden hover:bg-white/20 hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-48 object-cover"
                />
                {tour.isRecommended && (
                       <div className="absolute top-3 right-3">
                         <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                           {t('recommended')}
                         </span>
                       </div>
                )}
                <button
                  onClick={() => toggleFavorite(tour)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(tour.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                     <h3 className="text-xl font-semibold text-white mb-2">
                       {translateText(tour.name)}
                     </h3>
                     <p className="text-white/70 text-sm mb-4 leading-relaxed">
                       {translateText(tour.description)}
                     </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-xs font-medium border border-white/30"
                    >
                      {translateText(tag)}
                    </span>
                  ))}
                </div>

                {/* Tour Details */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{translateText(tour.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{translateText(tour.groupSize)}</span>
                  </div>
                </div>

                {/* Rating and Location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(tour.rating)}</div>
                        <span className="text-sm text-white/60">
                          ({tour.reviews})
                        </span>
                      </div>
                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {tour.location}
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-yellow-600">
                    {translateText(tour.price)}
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