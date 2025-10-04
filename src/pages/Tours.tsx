import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart, Clock, Users } from "lucide-react";

export default function ToursPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (tourId: string) => {
    setFavorites(prev => 
      prev.includes(tourId) 
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    );
  };

  const tours = [
    {
      id: "1",
      name: "Kapadokya Balon Turu",
      description: "Gün doğumunda Kapadokya'nın büyüleyici manzarasını balonla keşfedin. Unutulmaz bir deneyim.",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Kapadokya, Türkiye",
      tags: ["Doğa", "Macera"],
      rating: 4.9,
      reviews: 1247,
      duration: "3 saat",
      groupSize: "12 kişi",
      price: "€150",
      isRecommended: true
    },
    {
      id: "2", 
      name: "İstanbul Boğaz Turu",
      description: "Avrupa ve Asya'yı ayıran boğazın eşsiz manzarasını tekneyle keşfedin.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "İstanbul, Türkiye",
      tags: ["Şehir", "Deniz"],
      rating: 4.7,
      reviews: 892,
      duration: "2 saat",
      groupSize: "20 kişi",
      price: "€45",
      isRecommended: true
    },
    {
      id: "3",
      name: "Antalya Jeep Safari",
      description: "Taurus Dağları'nın doğal güzelliklerini jeep ile keşfedin. Adrenalin dolu bir macera.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Antalya, Türkiye",
      tags: ["Macera", "Doğa"],
      rating: 4.6,
      reviews: 634,
      duration: "6 saat",
      groupSize: "8 kişi",
      price: "€75",
      isRecommended: false
    },
    {
      id: "4",
      name: "Efes Antik Kenti Turu",
      description: "Antik dönemin en önemli şehirlerinden Efes'i rehber eşliğinde keşfedin.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Efes, Türkiye",
      tags: ["Tarih", "Kültür"],
      rating: 4.8,
      reviews: 2156,
      duration: "4 saat",
      groupSize: "15 kişi",
      price: "€60",
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
            <h1 className="text-2xl font-light text-gray-900">Turlar</h1>
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
              Doğa
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Macera
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Şehir
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Tarih
            </button>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                      Önerilen
                    </span>
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(tour.id)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(tour.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tour.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {tour.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tour Details */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>

                {/* Rating and Location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(tour.rating)}</div>
                    <span className="text-sm text-gray-600">
                      ({tour.reviews})
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tour.location}
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-yellow-600">
                    {tour.price}
                  </div>
                  <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                    Rezervasyon
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