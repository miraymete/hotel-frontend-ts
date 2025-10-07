import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart, Users, Calendar } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/lib/auth";
import BookingModal, { BookingItem, BookingData } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";

interface Yacht {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  tags: string[];
  category: string;
  rating: number;
  reviews: number;
  capacity: string;
  length: string;
  price: number;
  isRecommended: boolean;
}

export default function YachtsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { isAuthenticated } = useAuth();
  
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedYacht, setSelectedYacht] = useState<BookingItem | null>(null);

  const toggleFavorite = (yacht: Yacht) => {
    if (isFavorite(yacht.id)) {
      removeFromFavorites(yacht.id);
    } else {
      addToFavorites(yacht);
    }
  };

  const handleBookingClick = (yacht: Yacht) => {
    if (!isAuthenticated()) {
      alert('Rezervasyon yapmak için giriş yapmalısınız');
      return;
    }

    const bookingItem: BookingItem = {
      id: parseInt(yacht.id),
      name: yacht.name,
      location: yacht.location,
      type: 'yacht',
      basePrice: yacht.price,
      currency: 'TRY',
      imageUrl: yacht.image,
      description: yacht.description,
    };

    setSelectedYacht(bookingItem);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = async (bookingData: BookingData) => {
    try {
      // yine api çağrısı
      console.log('Yacht booking data:', bookingData);
      
      alert('Yat rezervasyonu başarıyla oluşturuldu!');
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
    { key: "luxury", label: t('luxury') },
    { key: "classic", label: t('classic') },
    { key: "catamaran", label: t('catamaran') },
    { key: "boat", label: t('boat') }
  ];

  //tr ing
  const translateText = (text: string) => {
    const translations: { [key: string]: string } = {
      'Antalya, Türkiye': `${t('antalya')}, ${t('turkey')}`,
      'Bodrum, Türkiye': `${t('bodrum')}, ${t('turkey')}`,
      'Marmaris, Türkiye': `${t('marmaris')}, ${t('turkey')}`,
      'Gökova, Türkiye': `${t('gokova')}, ${t('turkey')}`,
      'Fethiye, Türkiye': `${t('fethiye')}, ${t('turkey')}`,
      'Çeşme, Türkiye': `${t('cesme')}, ${t('turkey')}`,
      'Kaş, Türkiye': `${t('kas')}, ${t('turkey')}`,
      'Kalkan, Türkiye': `${t('kalkan')}, ${t('turkey')}`,
      'Datça, Türkiye': `${t('datca')}, ${t('turkey')}`,
      'Alanya, Türkiye': `${t('alanya')}, ${t('turkey')}`,
      'Kuşadası, Türkiye': `${t('kusadasi')}, ${t('turkey')}`,
      
      'Lüks': t('luxury'),
      'Klasik': t('classic'),
      'Katamaran': t('catamaran'),
      'Tekne': t('boat'),
      
      'Flybridge': 'Flybridge',
      'Sport': 'Sport',
      'Modern': 'Modern',
      'İngiliz': 'British',
      'Geleneksel': 'Traditional',
      'Ahşap': t('wooden'),
      'Yelkenli': t('sailboat'),
      'Stabil': t('stable'),
      'Fransız': t('french'),
      'Güvenli': t('safe'),
      'Konforlu': t('comfortable'),
      'Hızlı': t('fast'),
      
      // açıklamalar
      'Lüks ve konforun buluştuğu bu yat ile denizde unutulmaz anlar yaşayın.': t('yachtLuxuryDesc'),
      'Modern tasarımı ve güçlü performansı ile denizde fark yaratan yat.': t('yachtSportDesc'),
      'İngiliz kalitesi ve zarafeti ile denizde lüks deneyim sunan yat.': t('yachtEnglishDesc'),
      'Geleneksel Türk yatçılığının en güzel örneklerinden biri.': t('yachtClassicDesc'),
      'Ahşap işçiliği ve klasik tasarım ile özel deneyim.': t('yachtWoodDesc'),
      'Yelkenli tekne ile doğal rüzgar gücü.': t('yachtSailDesc'),
      'Katamaran\'ın stabilitesi ile konforlu seyahat.': t('yachtCatamaranDesc'),
      'Fransız tasarımı ve lüks iç mekanlar.': t('yachtFrenchDesc'),
      'Modern teknoloji ile donatılmış konforlu katamaran.': t('yachtModernDesc'),
      'Güvenli ve konforlu tekne ile deniz keyfi.': t('yachtSafeDesc'),
      'Konforlu iç mekanlar ile keyifli seyahat.': t('yachtComfortDesc'),
      'Hızlı ve modern tekne ile dinamik deneyim.': t('yachtFastDesc'),
      
      'Ahşap gövdesi ile doğal güzellik sunan klasik gulet.': t('woodenGuletDesc'),
      'Yelkenli klasik yat ile rüzgarın gücünü hissedin.': t('traditionalSailingDesc'),
      'Geniş ve stabil katamaran ile konforlu deniz yolculuğu.': t('lagoonCatamaranDesc'),
      'Fransız kalitesi katamaran ile lüks deniz deneyimi.': t('fountainePajotDesc'),
      'Modern tasarım katamaran ile denizde rahatlık.': t('baliCatamaranDesc'),
      'Güvenilir ve dayanıklı tekne ile denizde güvenli yolculuk.': t('bostonWhalerDesc'),
      'Konforlu ve şık tekne ile denizde keyifli vakit geçirin.': t('seaRayDesc'),
      'Hızlı ve çevik tekne ile denizde özgürlüğü yaşayın.': t('regalExpressDesc'),
      
      
      // süre ve kişi
      'kişi': t('people'),
      '/gün': t('perDay'),
    };
    
    return translations[text] || text;
  };

  const yachts = [
    // lüks yatlar
    {
      id: "1",
      name: "Azimut 78 Fly",
      description: "Lüks ve konforun buluştuğu bu yat ile denizde unutulmaz anlar yaşayın.",
      image: "https://abc-yacht.com/wp-content/uploads/2023/08/2023-AZIMUT-78_3.jpg",
      location: "Antalya, Türkiye",
      tags: ["Lüks", "Flybridge"],
      category: "Lüks",
      rating: 4.9,
      reviews: 1247,
      capacity: "12 kişi",
      length: "24m",
      price: 120000, 
      isRecommended: true
    },
    {
      id: "2",
      name: "Sunseeker 68 Sport Yacht",
      description: "Modern tasarımı ve güçlü performansı ile denizde fark yaratan yat.",
      image: "https://www.rightboat.com/boat_images/image_26396912/91b7fc0345b34c3abd5020365c5f37bc43cb080f04c14567b87f9f6ae0d345aa.webp",
      location: "Bodrum, Türkiye",
      tags: ["Sport", "Modern"],
      category: "Lüks",
      rating: 4.8,
      reviews: 892,
      capacity: "10 kişi",
      length: "21m",
      price: 105600, 
      isRecommended: true
    },
    {
      id: "3",
      name: "Princess V78",
      description: "İngiliz kalitesi ve zarafeti ile denizde lüks deneyim sunan yat.",
      image: "https://clearwatermarine.eu/wp-content/uploads/2021/04/v78-exterior-foredeck.jpg",
      location: "Marmaris, Türkiye",
      tags: ["Lüks", "İngiliz"],
      category: "Lüks",
      rating: 4.7,
      reviews: 634,
      capacity: "8 kişi",
      length: "24m",
      price: 134400, 
      isRecommended: false
    },

    // klasik
    {
      id: "4",
      name: "Gület Klasik",
      description: "Geleneksel Türk yatçılığının en güzel örneklerinden biri.",
      image: "https://cdn.guletbookers.org/wp-content/uploads/2023/03/gulet-yacht-tutta-1-1024x640.jpeg",
      location: "Gökova, Türkiye",
      tags: ["Klasik", "Geleneksel"],
      category: "Klasik",
      rating: 4.6,
      reviews: 423,
      capacity: "16 kişi",
      length: "18m",
      price: 38400, 
      isRecommended: false
    },
    {
      id: "5",
      name: "Wooden Gulet",
      description: "Ahşap gövdesi ile doğal güzellik sunan klasik gulet.",
      image: "https://www.goldenyachting.com/templates/goldenyachting/uploads/2019/11/18/goldenyachting_gulet-wood-(14)-jpg-r6R.jpg",
      location: "Fethiye, Türkiye",
      tags: ["Ahşap", "Klasik"],
      category: "Klasik",
      rating: 4.5,
      reviews: 756,
      capacity: "14 kişi",
      length: "16m",
      price: 31200, 
      isRecommended: false
    },
    {
      id: "6",
      name: "Traditional Sailing Yacht",
      description: "Yelkenli klasik yat ile rüzgarın gücünü hissedin.",
      image: "https://www.classicboat.co.uk/wp-content/uploads/C74A0382-1024x683.jpg",
      location: "Çeşme, Türkiye",
      tags: ["Yelkenli", "Klasik"],
      category: "Klasik",
      rating: 4.4,
      reviews: 345,
      capacity: "12 kişi",
      length: "14m",
      price: 24000, 
      isRecommended: false
    },

    // katamaran
    {
      id: "7",
      name: "Lagoon 450 Catamaran",
      description: "Geniş ve stabil katamaran ile konforlu deniz yolculuğu.",
      image: "https://luxurycatamarans.com/wp-content/uploads/2020/03/lagoon-450-F-2019.jpg",
      location: "Kaş, Türkiye",
      tags: ["Katamaran", "Stabil"],
      category: "Katamaran",
      rating: 4.8,
      reviews: 567,
      capacity: "12 kişi",
      length: "14m",
      price: 57600, 
      isRecommended: true
    },
    {
      id: "8",
      name: "Fountaine Pajot 44",
      description: "Fransız kalitesi katamaran ile lüks deniz deneyimi.",
      image: "https://www.poseidoncharters.com/fleet/fountaine-pajot-helia-44/Fountaine-Pajot-Helia-44-01.jpg",
      location: "Kalkan, Türkiye",
      tags: ["Katamaran", "Fransız"],
      category: "Katamaran",
      rating: 4.7,
      reviews: 234,
      capacity: "10 kişi",
      length: "13m",
      price: 52800, 
      isRecommended: false
    },
    {
      id: "9",
      name: "Bali 4.1 Catamaran",
      description: "Modern tasarım katamaran ile denizde rahatlık.",
      image: "https://sailingblue.gr/wp-content/uploads/2020/04/BALI4.1_h-1024x512-1.jpg",
      location: "Datça, Türkiye",
      tags: ["Katamaran", "Modern"],
      category: "Katamaran",
      rating: 4.6,
      reviews: 178,
      capacity: "8 kişi",
      length: "12m",
      price: 45600, 
      isRecommended: false
    },

    // tekne
    {
      id: "10",
      name: "Boston Whaler 315",
      description: "Güvenilir ve dayanıklı tekne ile denizde güvenli yolculuk.",
      image: "https://www.wcyachts.com/wp-content/uploads/2023/09/Boston-Whaler-315-Conquest-for-sale-74.jpg",
      location: "Alanya, Türkiye",
      tags: ["Tekne", "Güvenli"],
      category: "Tekne",
      rating: 4.5,
      reviews: 445,
      capacity: "6 kişi",
      length: "9m",
      price: 14400, 
      isRecommended: false
    },
    {
      id: "11",
      name: "Sea Ray 370 Sundancer",
      description: "Konforlu ve şık tekne ile denizde keyifli vakit geçirin.",
      image: "https://images.boatsgroup.com/images/1/40/44/2024-sea-ray-370-sundancer-outboard-power-9794044-978622973-0-200520251115-8.png",
      location: "Kuşadası, Türkiye",
      tags: ["Tekne", "Konforlu"],
      category: "Tekne",
      rating: 4.4,
      reviews: 312,
      capacity: "8 kişi",
      length: "11m",
      price: 19200, 
      isRecommended: false
    },
    {
      id: "12",
      name: "Regal 28 Express",
      description: "Hızlı ve çevik tekne ile denizde özgürlüğü yaşayın.",
      image: "https://itboat.com/uploads/9973/e14a100582b4.jpg",
      location: "Çeşme, Türkiye",
      tags: ["Tekne", "Hızlı"],
      category: "Tekne",
      rating: 4.3,
      reviews: 267,
      capacity: "6 kişi",
      length: "8m",
      price: 12000, 
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
                 <h1 className="text-2xl font-light text-white">{t('yachtExperiences')}</h1>
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
          {yachts
            .filter(yacht => {
              if (activeFilter === "all") return true;
              const filterMap: { [key: string]: string } = {
                'luxury': 'Lüks',
                'classic': 'Klasik',
                'catamaran': 'Katamaran',
                'boat': 'Tekne'
              };
              return yacht.category === filterMap[activeFilter];
            })
            .map((yacht) => (
            <div key={yacht.id} className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden hover:bg-white/20 hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={yacht.image}
                  alt={yacht.name}
                  className="w-full h-48 object-cover"
                />
                {yacht.isRecommended && (
                       <div className="absolute top-3 right-3">
                         <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                           {t('recommended')}
                         </span>
                       </div>
                )}
                <button
                  onClick={() => toggleFavorite(yacht)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(yacht.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                     <h3 className="text-xl font-semibold text-white mb-2">
                       {translateText(yacht.name)}
                     </h3>
                     <p className="text-white/70 text-sm mb-4 leading-relaxed">
                       {translateText(yacht.description)}
                     </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {yacht.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-xs font-medium border border-white/30"
                    >
                      {translateText(tag)}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{translateText(yacht.capacity)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{yacht.length}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(yacht.rating)}</div>
                        <span className="text-sm text-white/60">
                          ({yacht.reviews})
                        </span>
                      </div>


                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {yacht.location}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-yellow-600">
                    {formatPrice(yacht.price)}/gün
                  </div>
                       <Button 
                         onClick={() => handleBookingClick(yacht)}
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

      {selectedYacht && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          item={selectedYacht}
          onBookingSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
}
