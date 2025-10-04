/**
 * favoriler sayfası - kullanıcının favori otelleri
 * 
 * bu sayfa kullanıcının favorilerine eklediği otelleri gösterir
 * - favori oteller listesi
 * - boş durum mesajı (favori yoksa)
 * - favorilerden çıkarma özelliği
 * - ana sayfaya yönlendirme
 */
import { Heart, Star, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function FavoritesPage() {
  // context'ten favori yönetimi fonksiyonları
  const { favorites, removeFromFavorites } = useFavorites();

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
            <h1 className="text-2xl font-light text-gray-900">Favorilerim</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          /* boş durum - favori otel yoksa gösterilen mesaj */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Henüz favorilere eklediğiniz bir otel yok
              </h2>
              <p className="text-gray-600 mb-8">
                Keşfetmeye devam edin ve beğendiğiniz otelleri favorilerinize ekleyin
              </p>
              <Link to="/hotels">
                <button className="bg-yellow-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-yellow-700 transition-colors">
                  Otelleri Keşfet
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* favori oteller listesi */
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Favori Otelleriniz
                </h2>
                <p className="text-gray-600 mt-1">
                  {favorites.length} otel favorilerinizde
                </p>
              </div>
            </div>

            {/* favori oteller grid'i */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {favorites.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    {/* favorilerden çıkarma butonu */}
                    <button 
                      onClick={() => removeFromFavorites(hotel.id)}
                      className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {hotel.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {hotel.description || "Lüks konaklama deneyimi için mükemmel seçim."}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Favori
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(hotel.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
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
          </div>
        )}
      </main>
    </div>
  );
}
