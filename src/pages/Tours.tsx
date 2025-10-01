/**
 * turlar sayfası - tur arama ve listeleme
 * 
 * bu sayfa kullanıcıların tur araması yapabileceği sayfadır
 * - tur arama formu (konum, tarih, misafir sayısı)
 * - kültür turları ve yurt dışı turları
 * - tur türü filtreleme
 * - responsive tasarım
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Heart, Calendar, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ToursPage() {
  // arama formu state'leri
  const [location, setLocation] = useState("");                    // konum
  const [checkIn, setCheckIn] = useState("");                     // tarih
  const [guests, setGuests] = useState("2 yetişkin · 0 çocuk");   // misafir sayısı
  const [tourType, setTourType] = useState("all");                // tur türü

  // kültür turları verisi
  const culturalTours = [
    {
      id: 1,
      name: "Karadeniz Turları",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "5 Gün 4 Gece",
      price: "TL 2.500",
      rating: 4.8,
      reviews: "156"
    },
    {
      id: 2,
      name: "Uçaklı Turlar",
      image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "7 Gün 6 Gece",
      price: "TL 4.200",
      rating: 4.9,
      reviews: "89"
    },
    {
      id: 3,
      name: "Gap Turları",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "6 Gün 5 Gece",
      price: "TL 3.800",
      rating: 4.7,
      reviews: "203"
    },
    {
      id: 4,
      name: "Hafta Sonu Turları",
      image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "2 Gün 1 Gece",
      price: "TL 1.200",
      rating: 4.6,
      reviews: "312"
    },
    {
      id: 5,
      name: "Kapadokya Turları",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "3 Gün 2 Gece",
      price: "TL 1.800",
      rating: 4.9,
      reviews: "445"
    },
    {
      id: 6,
      name: "Günübirlik Turlar",
      image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "1 Gün",
      price: "TL 450",
      rating: 4.5,
      reviews: "678"
    }
  ];

  // yurt dışı turları verisi
  const internationalTours = [
    {
      id: 1,
      name: "Balkan Turları",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "8 Gün 7 Gece",
      price: "€ 899",
      rating: 4.8,
      reviews: "234",
      visaFree: true
    },
    {
      id: 2,
      name: "Uzakdoğu Turları",
      image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "10 Gün 9 Gece",
      price: "€ 1.299",
      rating: 4.9,
      reviews: "156",
      visaFree: false
    },
    {
      id: 3,
      name: "İspanya Turları",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "7 Gün 6 Gece",
      price: "€ 799",
      rating: 4.7,
      reviews: "189",
      visaFree: false
    },
    {
      id: 4,
      name: "Avrupa Turları",
      image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "12 Gün 11 Gece",
      price: "€ 1.599",
      rating: 4.8,
      reviews: "267",
      visaFree: false
    },
    {
      id: 5,
      name: "İtalya Turları",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "9 Gün 8 Gece",
      price: "€ 1.099",
      rating: 4.9,
      reviews: "334",
      visaFree: false
    },
    {
      id: 6,
      name: "Yurt Dışı Balayı Turları",
      image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200",
      duration: "14 Gün 13 Gece",
      price: "€ 2.199",
      rating: 4.9,
      reviews: "89",
      visaFree: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-[#3620D9] hover:text-[#4230FF] transition-colors">HotelBooking</Link>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/hotels" 
                className="text-gray-700 hover:text-[#3620D9] font-medium transition-colors"
              >
                Oteller
              </Link>
              <Link 
                to="/tours" 
                className="text-[#3620D9] font-medium transition-colors"
              >
                Turlar
              </Link>
              <Link 
                to="/experiences" 
                className="text-gray-700 hover:text-[#3620D9] font-medium transition-colors"
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
              ← Geri Dön
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mükemmel tur deneyimini keşfedin!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Yurt içi ve yurt dışı turlar, kültür gezileri ve macera dolu seyahatler
          </p>

          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl mb-6">
            {/* Destination */}
            <div className="flex-1">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Nereye gitmek istiyorsunuz?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 outline-none text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Tour Type */}
            <div className="flex-1">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <select
                  value={tourType}
                  onChange={(e) => setTourType(e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                >
                  <option value="all">Tüm Tur Türleri</option>
                  <option value="cultural">Kültür Turları</option>
                  <option value="international">Yurt Dışı Turları</option>
                  <option value="adventure">Macera Turları</option>
                  <option value="relaxation">Dinlence Turları</option>
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="flex-1">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex-1">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Users className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Misafir sayısı"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="flex-1 outline-none text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Search Button */}
            <Button className="bg-[#3620D9] hover:bg-[#4230FF] text-white px-8 py-3 rounded-lg text-lg font-semibold">
              Tur Ara
            </Button>
          </div>
        </div>

        {/* Cultural Tours Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Kültür Turları</h2>
              <p className="text-gray-600 mt-1">
                Türkiye'nin en güzel destinasyonlarını keşfedin
              </p>
            </div>
            <Button variant="outline" className="border-[#3620D9] text-[#3620D9] hover:bg-[#3620D9] hover:text-white">
              Tümünü Gör
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Tour Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalTours.map((tour) => (
              <div key={tour.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-3">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Heart className="w-4 h-4 text-[#3620D9]" />
                  </button>
                  <div className="absolute top-3 left-3 bg-[#3620D9] text-white text-xs px-2 py-1 rounded-full">
                    Popüler
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#3620D9] transition-colors">
                    {tour.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{tour.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({tour.reviews} değerlendirme)</span>
                    </div>
                    <div className="text-lg font-bold text-[#3620D9]">
                      {tour.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* International Tours Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Yurt Dışı Turları</h2>
              <p className="text-gray-600 mt-1">
                Dünyanın en güzel destinasyonlarına unutulmaz seyahatler
              </p>
            </div>
            <Button variant="outline" className="border-[#3620D9] text-[#3620D9] hover:bg-[#3620D9] hover:text-white">
              Tümünü Gör
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Tour Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalTours.map((tour) => (
              <div key={tour.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-3">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Heart className="w-4 h-4 text-[#3620D9]" />
                  </button>
                  {tour.visaFree && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Vizesiz
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-[#3620D9] text-white text-xs px-2 py-1 rounded-full">
                    Popüler
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#3620D9] transition-colors">
                    {tour.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{tour.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({tour.reviews} değerlendirme)</span>
                    </div>
                    <div className="text-lg font-bold text-[#3620D9]">
                      {tour.price}
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
