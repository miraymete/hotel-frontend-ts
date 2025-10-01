/**
 * oteller sayfası - otel arama ve listeleme
 * 
 * bu sayfa kullanıcıların otel araması yapabileceği sayfadır
 * - gelişmiş arama filtreleri (konum, tarih, misafir sayısı)
 * - fiyat, yıldız, otel türü ve özellik filtreleri
 * - popüler destinasyonlar listesi
 * - responsive tasarım
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Heart, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function HotelsPage() {
  // arama formu state'leri
  const [location, setLocation] = useState("");        // konum
  const [checkIn, setCheckIn] = useState("");          // giriş tarihi
  const [checkOut, setCheckOut] = useState("");        // çıkış tarihi
  const [rooms, setRooms] = useState("1");             // oda sayısı
  const [adults, setAdults] = useState("2");           // yetişkin sayısı
  const [children, setChildren] = useState("0");       // çocuk sayısı
  
  // filtre state'leri
  const [priceRange, setPriceRange] = useState("all");     // fiyat aralığı
  const [starRating, setStarRating] = useState("all");     // yıldız sayısı
  const [hotelType, setHotelType] = useState("all");       // otel türü
  const [amenities, setAmenities] = useState("all");       // otel özellikleri

  // popüler destinasyonlar verisi
  const popularDestinations = [
    {
      id: 1,
      name: "Paris, Fransa",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
      price: "TL 7.030",
      rating: 4.8,
      reviews: "12.5K",
      popular: true
    },
    {
      id: 2,
      name: "İstanbul, Türkiye",
      image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200",
      price: "TL 2.876",
      rating: 4.9,
      reviews: "8.9K",
      popular: true
    },
    {
      id: 3,
      name: "Málaga, İspanya",
      image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200",
      price: "TL 7.873",
      rating: 4.7,
      reviews: "6.2K",
      popular: true
    },
    {
      id: 4,
      name: "Bodrum, Türkiye",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      price: "TL 3.245",
      rating: 4.8,
      reviews: "15.3K",
      popular: true
    },
    {
      id: 5,
      name: "Antalya, Türkiye",
      image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200",
      price: "TL 2.156",
      rating: 4.6,
      reviews: "18.7K",
      popular: true
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
                className="text-gray-700 hover:text-[#3620D9] font-medium transition-colors"
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
            HotelBooking'de aradığınız oteli bulun!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Uygun fiyatlı otellerden lüks odalara kadar her şey burada
          </p>

          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl mb-6">
            {/* Destination */}
            <div className="flex-1">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Nereye gidiyorsunuz?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 outline-none text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Check-in Date */}
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

            {/* Check-out Date */}
            <div className="flex-1">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Rooms & Guests */}
            <div className="flex-1">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Users className="w-5 h-5 text-gray-500" />
                <div className="flex-1 flex gap-2">
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className="flex-1 outline-none text-gray-700"
                  >
                    <option value="1">1 Oda</option>
                    <option value="2">2 Oda</option>
                    <option value="3">3 Oda</option>
                    <option value="4">4 Oda</option>
                  </select>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="flex-1 outline-none text-gray-700"
                  >
                    <option value="1">1 Yetişkin</option>
                    <option value="2">2 Yetişkin</option>
                    <option value="3">3 Yetişkin</option>
                    <option value="4">4 Yetişkin</option>
                  </select>
                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="flex-1 outline-none text-gray-700"
                  >
                    <option value="0">0 Çocuk</option>
                    <option value="1">1 Çocuk</option>
                    <option value="2">2 Çocuk</option>
                    <option value="3">3 Çocuk</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">
              Ara
            </Button>
          </div>

          {/* Filtering Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat Aralığı</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3620D9] focus:border-[#3620D9]"
              >
                <option value="all">Tüm Fiyatlar</option>
                <option value="0-500">0 - 500 TL</option>
                <option value="500-1000">500 - 1000 TL</option>
                <option value="1000-2000">1000 - 2000 TL</option>
                <option value="2000+">2000+ TL</option>
              </select>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yıldız Sayısı</label>
              <select 
                value={starRating}
                onChange={(e) => setStarRating(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3620D9] focus:border-[#3620D9]"
              >
                <option value="all">Tüm Yıldızlar</option>
                <option value="5">5 Yıldız</option>
                <option value="4">4 Yıldız</option>
                <option value="3">3 Yıldız</option>
                <option value="2">2 Yıldız</option>
                <option value="1">1 Yıldız</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Otel Türü</label>
              <select 
                value={hotelType}
                onChange={(e) => setHotelType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3620D9] focus:border-[#3620D9]"
              >
                <option value="all">Tüm Türler</option>
                <option value="hotel">Otel</option>
                <option value="resort">Resort</option>
                <option value="pansiyon">Pansiyon</option>
                <option value="villa">Villa</option>
                <option value="apart">Apart</option>
              </select>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Özellikler</label>
              <select 
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3620D9] focus:border-[#3620D9]"
              >
                <option value="all">Tüm Özellikler</option>
                <option value="wifi">WiFi</option>
                <option value="pool">Havuz</option>
                <option value="spa">Spa</option>
                <option value="restaurant">Restoran</option>
                <option value="fitness">Fitness</option>
              </select>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Popüler otel destinasyonları
              </h2>
              <p className="text-gray-600 mt-1">
                Diğer gezginler arasında şu anda popüler olan seyahat noktalarını keşfedin
              </p>
            </div>
            <Button variant="outline" className="border-[#3620D9] text-[#3620D9] hover:bg-[#3620D9] hover:text-white">
              <MapPin className="w-4 h-4 mr-2" />
              Tümünü Gör
            </Button>
          </div>

          {/* Destination Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularDestinations.map((destination) => (
              <div key={destination.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-3">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Heart className="w-4 h-4 text-[#3620D9]" />
                  </button>
                  {destination.popular && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Popüler
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#3620D9] transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    3 yıldızlı bir otel için gecelik ortalama fiyat: {destination.price}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({destination.reviews} değerlendirme)</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <MapPin className="w-3 h-3" />
                      Popüler
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
