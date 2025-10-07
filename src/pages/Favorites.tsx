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
import { useLanguage } from "@/contexts/LanguageContext";

export default function FavoritesPage() {
  // favori yönetim
  const { favorites, removeFromFavorites } = useFavorites();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* header */}
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
                   <h1 className="text-2xl font-light text-white">{t('myFavorites')}</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          /* favori otel yoksa  */
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-white/60" />
              </div>
                     <h2 className="text-2xl font-semibold text-white mb-4">
                       {t('noFavoritesYet')}
                     </h2>
                     <p className="text-white/70 mb-8">
                       {t('continueExploring')}
                     </p>
                     <Link to="/hotels">
                       <button className="bg-yellow-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-yellow-700 transition-colors">
                         {t('startDiscovering')}
                       </button>
                     </Link>
            </div>
          </div>
        ) : (
          /* favroi otel liste*/
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
                     <div>
                       <h2 className="text-2xl font-semibold text-white">
                         {t('favorites')}
                       </h2>
                       <p className="text-white/70 mt-1">
                         {favorites.length} {t('itemsInFavorites')}
                       </p>
                     </div>
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {favorites.map((hotel) => (
                <div key={hotel.id} className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden hover:bg-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    {/* favoriden çıkarma */}
                    <button 
                      onClick={() => removeFromFavorites(hotel.id)}
                      className="absolute top-3 left-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors border border-white/30"
                    >
                      <Heart className="w-5 h-5 text-red-400 fill-current" />
                    </button>
                  </div>
                  
                
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {hotel.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {hotel.description || "Lüks konaklama deneyimi için mükemmel seçim."}
                    </p>

                    {/* tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-xs font-medium border border-white/30">
                        {t('favorites')}
                      </span>
                    </div>

                    {/* rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(hotel.rating) ? "text-yellow-400 fill-current" : "text-white/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-white/60">
                          ({hotel.reviews})
                        </span>
                      </div>

                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hotel.location}
                      </div>
                    </div>

                          
                           <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                             {t('details')}
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
