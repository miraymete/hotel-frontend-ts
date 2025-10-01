/**
 * favoriler sayfası - kullanıcının favori otelleri
 * 
 * bu sayfa kullanıcının favorilerine eklediği otelleri gösterir
 * - favori oteller listesi
 * - boş durum mesajı (favori yoksa)
 * - favorilerden çıkarma özelliği
 * - ana sayfaya yönlendirme
 */
import { Button } from "@/components/ui/button";
import { Heart, Star, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function FavoritesPage() {
  // context'ten favori yönetimi fonksiyonları
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* üst navigasyon menüsü */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* logo - ana sayfaya yönlendirir */}
            <Link to="/" className="text-2xl font-bold text-[#3620D9] hover:text-[#4230FF] transition-colors">
              HotelBooking
            </Link>
            
            {/* ana navigasyon menüsü */}
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
                className="text-[#3620D9] font-medium transition-colors"  // aktif sayfa
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

            {/* geri dön butonu */}
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

      {/* ana içerik alanı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          /* boş durum - favori otel yoksa gösterilen mesaj */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Henüz favorilere eklediğiniz bir otel yok
              </h2>
              <p className="text-gray-600 mb-8">
                Keşfetmeye devam edin ve beğendiğiniz otelleri favorilerinize ekleyin
              </p>
              <Link to="/">
                <Button className="bg-[#3620D9] hover:bg-[#4230FF] text-white px-8 py-3 rounded-lg text-lg font-semibold">
                  Ana Sayfaya Dön
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* favori oteller listesi */
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Favori Otelleriniz
                </h1>
                <p className="text-gray-600 mt-1">
                  {favorites.length} otel favorilerinizde
                </p>
              </div>
            </div>

            {/* favori oteller grid'i */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((hotel) => (
                <div key={hotel.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl mb-3">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* favorilerden çıkarma butonu */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();           // event bubbling'i durdur
                        removeFromFavorites(hotel.id); // oteli favorilerden çıkar
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#3620D9] transition-colors">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({hotel.reviews} değerlendirme)</span>
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
        )}
      </div>
    </div>
  );
}
