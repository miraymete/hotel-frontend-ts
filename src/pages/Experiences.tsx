

//BURASI HENÜZ YOK 

/**
 * deneyimler sayfası en iyi yorum alan oteller
 * 
 * - son 1 hafta 1 ay 3 ay 1 sene filtresi
 * - yorum sayısı ve kalitesine göre sıralama
 * - istatistikler ve sıralama
 * - favori ekleme özelliği
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Heart, MapPin, Filter, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";

// zamana göre yorum bilgileri
interface Hotel {
  id: string;                    
  name: string;                  
  image: string;                 
  location: string;              
  price: string;                 
  rating: number;                
  reviews: number;               
  recentReviews: {               
    week: number;                
    month: number;               
    threeMonths: number;         
    year: number;                
  };
  amenities: string[];           
  description: string;         
}

export default function ExperiencesPage() {
  // contextlerden gelen fonk
  const { addToFavorites, isFavorite } = useFavorites();
  
  // zaman aralığı
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'threeMonths' | 'year'>('month');

  const hotels: Hotel[] = [
    {
      id: "grand-palace-istanbul",
      name: "Grand Palace İstanbul",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      location: "İstanbul, Türkiye",
      price: "TL 2.500",
      rating: 4.8,
      reviews: 2847,
      recentReviews: {
        week: 23,
        month: 89,
        threeMonths: 234,
        year: 567
      },
      amenities: ["WiFi", "Havuz", "Spa", "Restoran"],
      description: "Boğaz manzaralı lüks otel deneyimi"
    },
    {
      id: "bodrum-resort-spa",
      name: "Bodrum Resort & Spa",
      image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200",
      location: "Bodrum, Türkiye",
      price: "TL 3.200",
      rating: 4.9,
      reviews: 1923,
      recentReviews: {
        week: 18,
        month: 67,
        threeMonths: 189,
        year: 445
      },
      amenities: ["WiFi", "Havuz", "Spa", "Plaj", "Fitness"],
      description: "Ege Denizi kıyısında premium tatil deneyimi"
    },
    {
      id: "cappadocia-cave-hotel",
      name: "Cappadocia Cave Hotel",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
      location: "Kapadokya, Türkiye",
      price: "TL 1.800",
      rating: 4.7,
      reviews: 1456,
      recentReviews: {
        week: 12,
        month: 45,
        threeMonths: 123,
        year: 298
      },
      amenities: ["WiFi", "Spa", "Restoran", "Balon Turu"],
      description: "Tarihi mağara otelinde unutulmaz deneyim"
    },
    {
      id: "antalya-beach-resort",
      name: "Antalya Beach Resort",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      location: "Antalya, Türkiye",
      price: "TL 2.100",
      rating: 4.6,
      reviews: 3124,
      recentReviews: {
        week: 31,
        month: 112,
        threeMonths: 267,
        year: 623
      },
      amenities: ["WiFi", "Havuz", "Plaj", "Restoran", "Çocuk Kulübü"],
      description: "Aile dostu plaj tatili için ideal"
    },
    {
      id: "pamukkale-thermal-hotel",
      name: "Pamukkale Thermal Hotel",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
      location: "Pamukkale, Türkiye",
      price: "TL 1.500",
      rating: 4.5,
      reviews: 987,
      recentReviews: {
        week: 8,
        month: 34,
        threeMonths: 89,
        year: 201
      },
      amenities: ["WiFi", "Termal Havuz", "Spa", "Restoran"],
      description: "Doğal termal sularla şifa bulun"
    },
    {
      id: "trabzon-mountain-lodge",
      name: "Trabzon Mountain Lodge",
      image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200",
      location: "Trabzon, Türkiye",
      price: "TL 1.200",
      rating: 4.4,
      reviews: 756,
      recentReviews: {
        week: 5,
        month: 23,
        threeMonths: 67,
        year: 156
      },
      amenities: ["WiFi", "Doğa Yürüyüşü", "Restoran", "Şömine"],
      description: "Karadeniz'in doğal güzelliklerinde konaklama"
    }
  ];

  // zaman filtresi 
  const timeFilters = [
    { key: 'week', label: 'Son 1 Hafta', icon: '📅' },
    { key: 'month', label: 'Son 1 Ay', icon: '📆' },
    { key: 'threeMonths', label: 'Son 3 Ay', icon: '🗓️' },
    { key: 'year', label: 'Son 1 Sene', icon: '📊' }
  ] as const;

  // hem yorum hem kalite 
  const sortedHotels = [...hotels].sort((a, b) => {
    const aReviews = a.recentReviews[selectedPeriod];
    const bReviews = b.recentReviews[selectedPeriod];
    
    const aScore = aReviews * a.rating;
    const bScore = bReviews * b.rating;
    
    return bScore - aScore; 
  });

  // favorilere ekleme
  const handleHeartClick = (hotel: Hotel, e: React.MouseEvent) => {
    e.preventDefault();      // link'in varsayılan davranışını engelle
    e.stopPropagation();    // event bubbling'i durdur
    addToFavorites({
      id: hotel.id,
      name: hotel.name,
      image: hotel.image,
      location: hotel.location,
      price: hotel.price,
      rating: hotel.rating,
      reviews: hotel.reviews
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-[#3620D9] hover:text-[#4230FF] transition-colors">
              HotelBooking
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/hotels" 
                className="text-gray-700 hover:text-[#3620D9] font-medium transition-colors"
              >
                Oteller
              </Link>
              <Link 
                to="/tours" 
                className="text-gray-700 hover:text-[#3620D9] font-medium transition-colors"
              >
                Turlar
              </Link>
              <Link 
                to="/experiences" 
                className="text-[#3620D9] font-medium transition-colors"
              >
                Deneyimler
              </Link>
              <Link 
                to="/favorites" 
                className="text-gray-700 hover:text-[#3620D9] font-medium transition-colors"
              >
                Favoriler
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-[#3620D9] font-medium transition-colors"
              >
                İletişim
              </Link>
            </nav>

            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="text-[#3620D9] border-[#3620D9] hover:bg-[#3620D9] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                En İyi Deneyimler
              </h1>
              <p className="text-lg text-gray-600">
                Misafirlerimizin en çok beğendiği otelleri keşfedin
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {timeFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedPeriod(filter.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    selectedPeriod === filter.key
                      ? 'bg-[#3620D9] text-white border-[#3620D9] shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-[#3620D9]'
                  }`}
                >
                  <span className="text-lg">{filter.icon}</span>
                  <span className="font-medium">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3620D9] mb-2">
                {sortedHotels.length}
              </div>
              <div className="text-gray-600">Toplam Otel</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {sortedHotels.reduce((sum, hotel) => sum + hotel.recentReviews[selectedPeriod], 0)}
              </div>
              <div className="text-gray-600">
                {timeFilters.find(f => f.key === selectedPeriod)?.label} Yorum
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {sortedHotels.length > 0 ? (sortedHotels.reduce((sum, hotel) => sum + hotel.rating, 0) / sortedHotels.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-gray-600">Ortalama Puan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {sortedHotels.reduce((sum, hotel) => sum + hotel.reviews, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Toplam Değerlendirme</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {timeFilters.find(f => f.key === selectedPeriod)?.label} En Çok Beğenilen Oteller
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>yorum sayısı ve kalitesine göre sıralandı</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHotels.map((hotel, index) => (
              <div key={hotel.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button 
                    onClick={(e) => handleHeartClick(hotel, e)}
                    className={`absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors ${
                      isFavorite(hotel.id) ? 'text-red-500' : 'text-[#3620D9]'
                    }`}
                  >
                    
                    <Heart className={`w-4 h-4 ${isFavorite(hotel.id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  <div className="absolute top-3 left-3 bg-[#3620D9] text-white text-sm font-bold px-3 py-1 rounded-full">
                    #{index + 1}
                  </div>
                  
ü                  <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {hotel.recentReviews[selectedPeriod]} yeni yorum
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#3620D9] transition-colors text-lg">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {hotel.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{hotel.amenities.length - 3}
                      </span>
                    )}


                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({hotel.reviews.toLocaleString()} değerlendirme)</span>
                    </div>
                    <div className="text-lg font-bold text-[#3620D9]">
                      {hotel.price}

                    </div>
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>
      </div>
    </div>
  );
}
