/**
 * Hesap Bilgileri Sayfası
 * 
 * Bu sayfa kullanıcının hesap bilgilerini görüntüler:
 * - Profil bilgileri
 * - Rezervasyon geçmişi
 * - Hesap ayarları
 * - Çıkış yapma
 */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Calendar, 
  MapPin, 
  Settings, 
  LogOut,
  ArrowLeft,
  Edit,
  Heart,
  Star
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PublicUser } from "@/lib/auth";

type Props = {
  user: PublicUser | null;
  onLogout: () => void;
};

export default function AccountPage({ user, onLogout }: Props) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock veriler - gerçek uygulamada API'den gelecek
  // Şu anda boş bırakıyoruz, dinamik içerik için
  interface Reservation {
    id: number;
    type: string;
    name: string;
    location: string;
    checkIn?: string;
    checkOut?: string;
    date?: string;
    status: string;
    price: string;
  }
  
  const mockReservations: Reservation[] = [];
  const mockFavorites = 0; // Gerçek uygulamada API'den gelecek

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors">
          <span className="text-xl font-light tracking-wider">{t('brand')}</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-400 font-medium text-sm">
            {user.name
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>
          <span className="text-sm text-white/90 font-light">
            {t('hello')}, <span className="text-yellow-400">{user.name}</span>
          </span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Geri Dön Butonu */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">{t('backToHome')}</span>
          </Link>
        </div>

        {/* Sayfa Başlığı */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-light text-white mb-4">
            {t('myAccount')}
          </h1>
          <p className="text-white/70 text-lg font-light">
            {t('accountDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon - Profil Bilgileri */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profil Kartı */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-400 font-medium text-2xl">
                    {user.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                </div>
                <CardTitle className="text-white text-xl font-light">
                  {user.name}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {t('memberSince')} 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-white/90">
                  <Mail className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Heart className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">
                    {mockFavorites === 0 
                      ? t('noFavoritesYet') 
                      : `${mockFavorites} ${t('favorites')}`
                    }
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {t('editProfile')}
                </Button>
              </CardContent>
            </Card>

            {/* Hızlı İşlemler */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg font-light">
                  {t('quickActions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white/90 hover:text-yellow-400 hover:bg-yellow-400/10"
                >
                  <Heart className="w-4 h-4 mr-3" />
                  {mockFavorites === 0 ? t('startAddingFavorites') : t('myFavorites')}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white/90 hover:text-yellow-400 hover:bg-yellow-400/10"
                >
                  <Star className="w-4 h-4 mr-3" />
                  {t('myReviews')}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white/90 hover:text-yellow-400 hover:bg-yellow-400/10"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  {t('settings')}
                </Button>
                <hr className="border-gray-700 my-3" />
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  {t('logout')}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sağ Kolon - Rezervasyon Geçmişi */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-xl font-light">
                  {t('reservationHistory')}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {t('reservationDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockReservations.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-yellow-400/30 mx-auto mb-4" />
                    <p className="text-white/70 text-lg mb-2">{t('noReservations')}</p>
                    <p className="text-white/50 text-sm mb-6">{t('noReservationsDescription')}</p>
                    <Button 
                      className="bg-yellow-400 text-black hover:bg-yellow-300 font-medium px-6 py-2"
                      onClick={() => navigate('/')}
                    >
                      {t('startExploring')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockReservations.map((reservation) => (
                      <div 
                        key={reservation.id}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-400/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-400/20">
                            {reservation.type === 'Hotel' && <MapPin className="w-6 h-6 text-yellow-400" />}
                            {reservation.type === 'Tour' && <Star className="w-6 h-6 text-yellow-400" />}
                            {reservation.type === 'Yacht' && <Calendar className="w-6 h-6 text-yellow-400" />}
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{reservation.name}</h3>
                            <p className="text-white/70 text-sm">{reservation.location}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-white/60 text-xs">
                                {reservation.checkIn && reservation.checkOut 
                                  ? `${reservation.checkIn} - ${reservation.checkOut}`
                                  : reservation.date
                                }
                              </span>
                              <Badge 
                                variant={reservation.status === 'confirmed' ? 'default' : 'secondary'}
                                className={`text-xs ${
                                  reservation.status === 'confirmed' 
                                    ? 'bg-green-500/20 text-green-400 border-green-400/30' 
                                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
                                }`}
                              >
                                {reservation.status === 'confirmed' ? t('confirmed') : t('pending')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{reservation.price}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                          >
                            {t('viewDetails')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-light text-yellow-400 mb-2">{mockReservations.length}</div>
                  <div className="text-white/70 text-sm">{t('totalBookings')}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-light text-yellow-400 mb-2">{mockFavorites}</div>
                  <div className="text-white/70 text-sm">{t('favoritePlaces')}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-light text-yellow-400 mb-2">₺0</div>
                  <div className="text-white/70 text-sm">{t('totalSpent')}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
