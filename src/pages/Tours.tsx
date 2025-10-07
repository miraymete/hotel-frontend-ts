import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart, Clock, Users, Calendar } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/lib/auth";
import BookingModal, { BookingItem, BookingData } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";

interface Tour {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  tags: string[];
  category: string;
  rating: number;
  reviews: number;
  duration: string;
  groupSize: string;
  price: number;
  isRecommended: boolean;
}

export default function ToursPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { isAuthenticated } = useAuth();
  
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<BookingItem | null>(null);

  const toggleFavorite = (tour: Tour) => {
    if (isFavorite(tour.id)) {
      removeFromFavorites(tour.id);
    } else {
      addToFavorites(tour);
    }
  };

  const handleBookingClick = (tour: Tour) => {
    if (!isAuthenticated()) {
      alert('Rezervasyon yapmak için giriş yapmalısınız');
      return;
    }

    const bookingItem: BookingItem = {
      id: parseInt(tour.id),
      name: tour.name,
      location: tour.location,
      type: 'tour',
      basePrice: tour.price,
      currency: 'TRY',
      imageUrl: tour.image,
      description: tour.description,
    };

    setSelectedTour(bookingItem);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = async (bookingData: BookingData) => {
    try {
      // api çağrısı
      console.log('Tour booking data:', bookingData);
      
   
      alert('Tur rezervasyonu başarıyla oluşturuldu!');
      setBookingModalOpen(false);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Rezervasyon sırasında bir hata oluştu');
    }
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  const filters = [
    { key: "all", label: t('all') },
    { key: "nature", label: t('nature') },
    { key: "adventure", label: t('adventure') },
    { key: "city", label: t('city') },
    { key: "history", label: t('history') }
  ];

  // trden ing
  const translateText = (text: string) => {
    const translations: { [key: string]: string } = {
      'Kapadokya, Türkiye': `${t('cappadocia')}, ${t('turkey')}`,
      'Pamukkale, Türkiye': `${t('pamukkale')}, ${t('turkey')}`,
      'Bursa, Türkiye': `${t('bursa')}, ${t('turkey')}`,
      'Antalya, Türkiye': `${t('antalya')}, ${t('turkey')}`,
      'Artvin, Türkiye': `${t('artvin')}, ${t('turkey')}`,
      'Fethiye, Türkiye': `${t('fethiye')}, ${t('turkey')}`,
      'İstanbul, Türkiye': `${t('istanbul')}, ${t('turkey')}`,
      'Ankara, Türkiye': `${t('ankara')}, ${t('turkey')}`,
      'Efes, Türkiye': `${t('efes')}, ${t('turkey')}`,
      'Çanakkale, Türkiye': `${t('canakkale')}, ${t('turkey')}`,
      
      
      'Doğa': t('nature'),
      'Macera': t('adventure'),
      'Şehir': t('city'),
      'Tarih': t('history'),
      'Termal': 'Thermal',
      'Dağ': t('mountain'),
      'Su Sporları': t('waterSports'),
      'Havacılık': t('aviation'),
      'Deniz': 'Sea',
      'Kültür': 'Culture',
      'Antik': 'Ancient',
      
     
      'saat': t('hours'),
      'kişi': t('people'),
      '/gün': t('perDay'),
      
      
      'Kapadokya Balon Turu': t('balloonTour'),
      'Gün doğumunda Kapadokya\'nın büyüleyici manzarasını balonla keşfedin. Unutulmaz bir deneyim.': t('balloonDesc'),
      'Pamukkale Doğa Turu': t('natureTour'),
      'Beyaz travertenler ve termal suların büyüleyici dünyasını keşfedin.': t('natureDesc'),
      'Uludağ Dağ Turu': t('mountainTour'),
      'Dağ havası ve doğal güzelliklerle dolu bir gün.': t('mountainDesc'),
      'Antalya Jeep Safari': t('safariTour'),
      'Çam ağaçları arasında adrenalin dolu safari deneyimi.': t('safariDesc'),
      'Rafting Macera Turu': t('raftingTour'),
      'Çoruh Nehri\'nde adrenalin dolu rafting deneyimi. Doğanın gücünü hissedin.': t('raftingDesc'),
      'Fethiye Paragliding': t('paraglidingTour'),
      'Mavi suların üzerinde uçarak unutulmaz anlar yaşayın.': t('paraglidingDesc'),
      'İstanbul Boğaz Turu': t('bosphorusTour'),
      'Boğaz\'ın büyüleyici manzarasını tekne ile keşfedin.': t('bosporusDesc'),
      'İstanbul Tarihi Yarımada': t('historicalTour'),
      'Tarihi yarımadanın gizemli sokaklarında gezinti.': t('historicalDesc'),
      'Ankara Modern Tur': t('modernTour'),
      'Ankara\'nın modern yüzünü ve kültürel zenginliklerini keşfedin.': t('modernDesc'),
      'Efes Antik Kenti': t('ephesusTour'),
      'Antik dünyanın en görkemli şehirlerinden birini keşfedin.': t('ephesusDesc'),
      'Çanakkale Gelibolu': t('gallipoliTour'),
      'Tarihin en önemli savaşlarından birinin izlerini takip edin.': t('gallipoliDesc'),
      'Pamukkale Hierapolis': t('hierapolisTour'),
      'Antik şehir kalıntıları ve doğal travertenler.': t('hierapolisDesc'),
      
      'Uludağ\'ın muhteşem manzarasını teleferik ve yürüyüş ile keşfedin.': t('uludagMountainDesc'),
      'Taurus Dağları\'nın doğal güzelliklerini jeep ile keşfedin. Adrenalin dolu bir macera.': t('taurusMountainsDesc'),
      'Babadağ\'dan uçarak Fethiye\'nin muhteşem manzarasını havadan keşfedin.': t('paraglidingExperienceDesc'),
      
    };
    
    return translations[text] || text;
  };

  const tours: Tour[] = [
    // doğa
    {
      id: "1",
      name: "Kapadokya Balon Turu",
      description: "Gün doğumunda Kapadokya'nın büyüleyici manzarasını balonla keşfedin. Unutulmaz bir deneyim.",
      image: "https://kapadokyadaturlar.com/wp-content/uploads/2021/06/goreme-balon-turu-850x459.jpg",
      location: `${t('cappadocia')}, ${t('turkey')}`,
      tags: ["Doğa", "Macera"],
      category: "Doğa",
      rating: 4.9,
      reviews: 1247,
      duration: "3 saat",
      groupSize: "12 kişi",
      price: 7200, 
      isRecommended: true
    },
    {
      id: "2",
      name: "Pamukkale Doğa Turu",
      description: "Beyaz travertenler ve termal suların büyüleyici dünyasını keşfedin.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/16/4c/17/merveilleux.jpg?w=900&h=500&s=1",
      location: "Pamukkale, Türkiye",
      tags: ["Doğa", "Termal"],
      category: "Doğa",
      rating: 4.7,
      reviews: 892,
      duration: "5 saat",
      groupSize: "15 kişi",
      price: 3120,
      isRecommended: false
    },
    {
      id: "3",
      name: "Uludağ Kayak Turu",
      description: "Uludağ'ın muhteşem manzarasını teleferik ve yürüyüş ile keşfedin.",
      image: "https://panel.gezinoloji.com//uploads/tour_453/orginal/photo-453-ezMUwFmTRnp3bXx.jpg",
      location: "Bursa, Türkiye",
      tags: ["Doğa", "Dağ"],
      category: "Doğa",
      rating: 4.5,
      reviews: 634,
      duration: "7 saat",
      groupSize: "10 kişi",
      price: 2640, 
      isRecommended: false
    },

    // macera
    {
      id: "4",
      name: "Antalya Jeep Safari",
      description: "Taurus Dağları'nın doğal güzelliklerini jeep ile keşfedin. Adrenalin dolu bir macera.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/57/7f/c7/caption.jpg?w=800&h=400&s=10",
      location: "Antalya, Türkiye",
      tags: ["Macera", "Doğa"],
      category: "Macera",
      rating: 4.6,
      reviews: 634,
      duration: "6 saat",
      groupSize: "8 kişi",
      price: 3600, 
      isRecommended: false
    },
    {
      id: "5",
      name: "Rafting Macera Turu",
      description: "Çoruh Nehri'nde adrenalin dolu rafting deneyimi. Doğanın gücünü hissedin.",
      image: "https://www.melencirafting.com/wp-content/uploads/2019/06/duzce-de-yapilacak-aktiviteler.jpg",
      location: "Artvin, Türkiye",
      tags: ["Macera", "Su Sporları"],
      category: "Macera",
      rating: 4.8,
      reviews: 423,
      duration: "4 saat",
      groupSize: "12 kişi",
      price: 4080, 
      isRecommended: true
    },
    {
      id: "6",
      name: "Paragliding Deneyimi",
      description: "Babadağ'dan uçarak Fethiye'nin muhteşem manzarasını havadan keşfedin.",
      image: "https://www.gleitschirm-direkt.de/out/pictures/master/product/1/sky-aya2-orange-blue-red0.webp",
      location: "Fethiye, Türkiye",
      tags: ["Macera", "Havacılık"],
      category: "Macera",
      rating: 4.9,
      reviews: 756,
      duration: "2 saat",
      groupSize: "6 kişi",
      price: 5760, 
      isRecommended: true
    },

    // şehir
    {
      id: "7", 
      name: "İstanbul Boğaz Turu",
      description: "Avrupa ve Asya'yı ayıran boğazın eşsiz manzarasını tekneyle keşfedin.",
      image: "https://cdn.platinumlist.net/upload/event/bosphorus_boat_cruise_istanbul_2024_may_01_istanbul_turkey_92197-full-en1714478340.jpg",
      location: "İstanbul, Türkiye",
      tags: ["Şehir", "Deniz"],
      category: "Şehir",
      rating: 4.7,
      reviews: 892,
      duration: "2 saat",
      groupSize: "20 kişi",
      price: 2160, 
      isRecommended: true
    },
    {
      id: "8",
      name: "İstanbul Tarihi Yarımada",
      description: "Sultanahmet, Ayasofya ve Topkapı Sarayı'nı rehber eşliğinde keşfedin.",
      image: "https://blog.baruthotels.com/assets/imgs/upload/655f2f2acc519tarihi-yarimada-gezi-rehberi-tarihi-yarimadada-gezilecek-yerler.jpg",
      location: "İstanbul, Türkiye",
      tags: ["Şehir", "Tarih"],
      category: "Şehir",
      rating: 4.8,
      reviews: 1234,
      duration: "6 saat",
      groupSize: "25 kişi",
      price: 1680, 
      isRecommended: false
    },
    {
      id: "9",
      name: "Ankara Modern Tur",
      description: "Ankara'nın modern yüzünü ve kültürel zenginliklerini keşfedin.",
      image: "https://www.academic-tour.com/images/tour/8772_b.jpg",
      location: "Ankara, Türkiye",
      tags: ["Şehir", "Kültür"],
      category: "Şehir",
      rating: 4.4,
      reviews: 567,
      duration: "4 saat",
      groupSize: "18 kişi",
      price: 1440,
      isRecommended: false
    },

    // tarih
    {
      id: "10",
      name: "Efes Antik Kenti Turu",
      description: "Antik dönemin en önemli şehirlerinden Efes'i rehber eşliğinde keşfedin.",
      image: "https://www.etstur.com/letsgo/wp-content/uploads/2024/09/efes-antik-kenti-gezilecek-yerler-1-2.jpg",
      location: "Efes, Türkiye",
      tags: ["Tarih", "Kültür"],
      category: "Tarih",
      rating: 4.8,
      reviews: 2156,
      duration: "4 saat",
      groupSize: "15 kişi",
      price: 2880, 
      isRecommended: false
    },
    {
      id: "11",
      name: "Troy Antik Kenti",
      description: "Homeros'un İlyada destanına konu olan Troya'yı keşfedin.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Hadrianic_Odeon_in_Troy_IX_%28Ilion%29%2C_Turkey.jpg/1200px-Hadrianic_Odeon_in_Troy_IX_%28Ilion%29%2C_Turkey.jpg",
      location: "Çanakkale, Türkiye",
      tags: ["Tarih", "Antik"],
      category: "Tarih",
      rating: 4.6,
      reviews: 789,
      duration: "3 saat",
      groupSize: "20 kişi",
      price: 1920,
      isRecommended: false
    },
    {
      id: "12",
      name: "Hierapolis Antik Kenti",
      description: "Antik dönemin sağlık merkezi Hierapolis'i keşfedin.",
      image: "https://i.neredekal.com/i/neredekal/75/1280x889/658324615360fd82460dd3c7",
      location: "Pamukkale, Türkiye",
      tags: ["Tarih", "Antik"],
      category: "Tarih",
      rating: 4.7,
      reviews: 945,
      duration: "2 saat",
      groupSize: "12 kişi",
      price: 1200, 
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
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
                 <h1 className="text-2xl font-light text-white">{t('tours')}</h1>
                 <Link to="/favorites">
                   <button className="flex items-center space-x-2 text-white/80 hover:text-red-400 transition-colors">
                     <Heart className="w-5 h-5" />
                     <span className="font-medium">{t('favorites')}</span>
                   </button>
              </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* filtrre */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.key
                    ? "bg-yellow-600 text-white"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {tours
            .filter(tour => {
              if (activeFilter === "all") return true;
              const filterMap: { [key: string]: string } = {
                'nature': 'Doğa',
                'adventure': 'Macera',
                'city': 'Şehir', 
                'history': 'Tarih'
              };
              return tour.category === filterMap[activeFilter];
            })
            .map((tour) => (
            <div key={tour.id} className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden hover:bg-white/20 hover:shadow-xl transition-all duration-300">
              <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.name}
                  className="w-full h-48 object-cover"
                />
                {tour.isRecommended && (
                       <div className="absolute top-3 right-3">
                         <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                           {t('recommended')}
                         </span>
                       </div>
                )}
                <button
                  onClick={() => toggleFavorite(tour)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(tour.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                  </button>
                  </div>

              <div className="p-6">
                     <h3 className="text-xl font-semibold text-white mb-2">
                       {translateText(tour.name)}
                     </h3>
                     <p className="text-white/70 text-sm mb-4 leading-relaxed">
                       {translateText(tour.description)}
                     </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-xs font-medium border border-white/30"
                    >
                      {translateText(tag)}
                    </span>
                  ))}
                </div>
                
                {/* tur detayss*/}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{translateText(tour.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{translateText(tour.groupSize)}</span>
          </div>
        </div>

                {/* rate ve konum*/}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(tour.rating)}</div>
                        <span className="text-sm text-white/60">
                          ({tour.reviews})
                        </span>
            </div>
                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {tour.location}
                  </div>
                </div>
                
                {/* paraa ve buton */}
                  <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-yellow-600">
                    {formatPrice(tour.price)}
                  </div>
                       <Button 
                         onClick={() => handleBookingClick(tour)}
                         className="bg-yellow-400 text-black hover:bg-yellow-300 font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                       >
                         <Calendar className="w-4 h-4" />
                         {t('reservation')}
                       </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>

      {selectedTour && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          item={selectedTour}
          onBookingSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
}