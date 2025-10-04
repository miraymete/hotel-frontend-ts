import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart } from "lucide-react";

export default function HotelsPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (hotelId: string) => {
    setFavorites(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const hotels = [
    {
      id: "1",
      name: "Grand Palace Resort & Spa",
      description: "Lüks deneyim ve muhteşem spa hizmetleri ile unutulmaz bir tatil.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Antalya, Türkiye",
      tags: ["Resort", "Spa"],
      rating: 4.8,
      reviews: 1247,
      isRecommended: true
    },
    {
      id: "2", 
      name: "Marina Luxury Suites",
      description: "Deniz manzaralı lüks suitler ve özel marina erişimi ile eşsiz konaklama.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Bodrum, Türkiye",
      tags: ["Lüks", "Marina"],
      rating: 4.9,
      reviews: 892,
      isRecommended: true
    },
    {
      id: "3",
      name: "Mountain View Boutique Hotel",
      description: "Dağ manzaralı butik otel, romantik atmosfer ve kişiselleştirilmiş hizmet.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Kapadokya, Türkiye",
      tags: ["Romantik", "Butik"],
      rating: 4.7,
      reviews: 634,
      isRecommended: false
    },
    {
      id: "4",
      name: "Urban Business Center",
      description: "Şehir merkezinde modern iş oteli, toplantı salonları ve ücretsiz Wi-Fi.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "İstanbul, Türkiye",
      tags: ["İş", "Şehir"],
      rating: 4.5,
      reviews: 2156,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Ana Sayfa</span>
            </Link>
            <h1 className="text-2xl font-light text-gray-900">Lüks Oteller</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-full text-sm font-medium">
              Tümü
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Resort
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Lüks
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Butik
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              İş
            </button>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                      Önerilen
                    </span>
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(hotel.id)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(hotel.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {hotel.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {hotel.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(hotel.rating)}</div>
                    <span className="text-sm text-gray-600">
                      ({hotel.reviews})
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </div>
                </div>

                {/* Learn More Button */}
                <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                  Detayları Görüntüle
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}