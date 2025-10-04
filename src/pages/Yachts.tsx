import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart, Users, Calendar } from "lucide-react";

export default function YachtsPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("Tümü");

  const toggleFavorite = (yachtId: string) => {
    setFavorites(prev => 
      prev.includes(yachtId) 
        ? prev.filter(id => id !== yachtId)
        : [...prev, yachtId]
    );
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  const yachts = [
    // Lüks Yatlar
    {
      id: "1",
      name: "Azimut 78 Fly",
      description: "Lüks ve konforun buluştuğu bu yat ile denizde unutulmaz anlar yaşayın.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Antalya, Türkiye",
      tags: ["Lüks", "Flybridge"],
      category: "Lüks",
      rating: 4.9,
      reviews: 1247,
      capacity: "12 kişi",
      length: "24m",
      price: "€2,500/gün",
      isRecommended: true
    },
    {
      id: "2",
      name: "Sunseeker 68 Sport Yacht",
      description: "Modern tasarımı ve güçlü performansı ile denizde fark yaratan yat.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Bodrum, Türkiye",
      tags: ["Sport", "Modern"],
      category: "Lüks",
      rating: 4.8,
      reviews: 892,
      capacity: "10 kişi",
      length: "21m",
      price: "€2,200/gün",
      isRecommended: true
    },
    {
      id: "3",
      name: "Princess V78",
      description: "İngiliz kalitesi ve zarafeti ile denizde lüks deneyim sunan yat.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Marmaris, Türkiye",
      tags: ["Lüks", "İngiliz"],
      category: "Lüks",
      rating: 4.7,
      reviews: 634,
      capacity: "8 kişi",
      length: "24m",
      price: "€2,800/gün",
      isRecommended: false
    },

    // Klasik Yatlar
    {
      id: "4",
      name: "Gület Klasik",
      description: "Geleneksel Türk yatçılığının en güzel örneklerinden biri.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Gökova, Türkiye",
      tags: ["Klasik", "Geleneksel"],
      category: "Klasik",
      rating: 4.6,
      reviews: 423,
      capacity: "16 kişi",
      length: "18m",
      price: "€800/gün",
      isRecommended: false
    },
    {
      id: "5",
      name: "Wooden Gulet",
      description: "Ahşap gövdesi ile doğal güzellik sunan klasik gulet.",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Fethiye, Türkiye",
      tags: ["Ahşap", "Klasik"],
      category: "Klasik",
      rating: 4.5,
      reviews: 756,
      capacity: "14 kişi",
      length: "16m",
      price: "€650/gün",
      isRecommended: false
    },
    {
      id: "6",
      name: "Traditional Sailing Yacht",
      description: "Yelkenli klasik yat ile rüzgarın gücünü hissedin.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Çeşme, Türkiye",
      tags: ["Yelkenli", "Klasik"],
      category: "Klasik",
      rating: 4.4,
      reviews: 345,
      capacity: "12 kişi",
      length: "14m",
      price: "€500/gün",
      isRecommended: false
    },

    // Katamaran
    {
      id: "7",
      name: "Lagoon 450 Catamaran",
      description: "Geniş ve stabil katamaran ile konforlu deniz yolculuğu.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Kaş, Türkiye",
      tags: ["Katamaran", "Stabil"],
      category: "Katamaran",
      rating: 4.8,
      reviews: 567,
      capacity: "12 kişi",
      length: "14m",
      price: "€1,200/gün",
      isRecommended: true
    },
    {
      id: "8",
      name: "Fountaine Pajot 44",
      description: "Fransız kalitesi katamaran ile lüks deniz deneyimi.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Kalkan, Türkiye",
      tags: ["Katamaran", "Fransız"],
      category: "Katamaran",
      rating: 4.7,
      reviews: 234,
      capacity: "10 kişi",
      length: "13m",
      price: "€1,100/gün",
      isRecommended: false
    },
    {
      id: "9",
      name: "Bali 4.1 Catamaran",
      description: "Modern tasarım katamaran ile denizde rahatlık.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Datça, Türkiye",
      tags: ["Katamaran", "Modern"],
      category: "Katamaran",
      rating: 4.6,
      reviews: 178,
      capacity: "8 kişi",
      length: "12m",
      price: "€950/gün",
      isRecommended: false
    },

    // Tekne
    {
      id: "10",
      name: "Boston Whaler 315",
      description: "Güvenilir ve dayanıklı tekne ile denizde güvenli yolculuk.",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Alanya, Türkiye",
      tags: ["Tekne", "Güvenli"],
      category: "Tekne",
      rating: 4.5,
      reviews: 445,
      capacity: "6 kişi",
      length: "9m",
      price: "€300/gün",
      isRecommended: false
    },
    {
      id: "11",
      name: "Sea Ray 370 Sundancer",
      description: "Konforlu ve şık tekne ile denizde keyifli vakit geçirin.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Kuşadası, Türkiye",
      tags: ["Tekne", "Konforlu"],
      category: "Tekne",
      rating: 4.4,
      reviews: 312,
      capacity: "8 kişi",
      length: "11m",
      price: "€400/gün",
      isRecommended: false
    },
    {
      id: "12",
      name: "Regal 28 Express",
      description: "Hızlı ve çevik tekne ile denizde özgürlüğü yaşayın.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Çeşme, Türkiye",
      tags: ["Tekne", "Hızlı"],
      category: "Tekne",
      rating: 4.3,
      reviews: 267,
      capacity: "6 kişi",
      length: "8m",
      price: "€250/gün",
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
            <h1 className="text-2xl font-light text-gray-900">Yat Deneyimleri</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleFilter("Tümü")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Tümü" 
                  ? "bg-yellow-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Tümü
            </button>
            <button 
              onClick={() => handleFilter("Lüks")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Lüks" 
                  ? "bg-yellow-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Lüks
            </button>
            <button 
              onClick={() => handleFilter("Klasik")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Klasik" 
                  ? "bg-yellow-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Klasik
            </button>
            <button 
              onClick={() => handleFilter("Katamaran")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Katamaran" 
                  ? "bg-yellow-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Katamaran
            </button>
            <button 
              onClick={() => handleFilter("Tekne")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "Tekne" 
                  ? "bg-yellow-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Tekne
            </button>
          </div>
        </div>

        {/* Yachts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {yachts
            .filter(yacht => activeFilter === "Tümü" || yacht.category === activeFilter)
            .map((yacht) => (
            <div key={yacht.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Image */}
              <div className="relative">
                <img
                  src={yacht.image}
                  alt={yacht.name}
                  className="w-full h-48 object-cover"
                />
                {yacht.isRecommended && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Önerilen
                    </span>
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(yacht.id)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(yacht.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {yacht.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {yacht.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {yacht.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Yacht Details */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{yacht.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{yacht.length}</span>
                  </div>
                </div>

                {/* Rating and Location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(yacht.rating)}</div>
                    <span className="text-sm text-gray-600">
                      ({yacht.reviews})
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {yacht.location}
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-yellow-600">
                    {yacht.price}
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
