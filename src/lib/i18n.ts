export type Language = 'tr' | 'en';

export const translations = {
  tr: {
    // baş
    brand: 'HotelBooking',
    hotels: 'Oteller',
    tours: 'Turlar',
    experiences: 'Deneyimler',
    favorites: 'Favoriler',
    contact: 'İletişim',
    login: 'Giriş Yap',
    register: 'Kaydol',
    logout: 'Çıkış Yap',
    hello: 'Merhaba',
    
    // arama 
    searchHoliday: 'Tatil Ara',
    region: 'Bölge / Otel / Havaalanı / Kampanya',
    regionPlaceholder: 'Şehir, ilçe veya tatil bölgesi yazınız',
    checkIn: 'Giriş Tarihi',
    checkOut: 'Çıkış Tarihi',
    adults: 'Yetişkin',
    children: 'Çocuk',
    onlyAvailable: 'Sadece Müsait Oteller',
    searchHotel: 'Otel Ara',
    
    // modals tr
    registerTitle: 'Kayıt Ol',
    loginTitle: 'Giriş Yap',
    firstName: 'İsim',
    lastName: 'Soyisim',
    email: 'E-posta',
    phone: 'Telefon Numarası',
    password: 'Şifre',
    confirmPassword: 'Şifre (Tekrar)',
    passwordHint: 'En az 6 karakter, 1 büyük harf ve 1 sayı içermeli.',
    registerButton: 'Kaydol',
    loginButton: 'Giriş Yap',
    forgotPassword: 'Şifremi Unuttum',
    close: 'Kapat',
    apply: 'Uygula',
    cancel: 'İptal',
    sendMail: 'Mail Gönder',
    sending: 'Gönderiliyor…',
    registering: 'Kaydediliyor…',
    loggingIn: 'Giriş yapılıyor…',
    
    // language modal tr
    languageCurrency: 'Dil ve Para Birimi',
    language: 'Lisan',
    currency: 'Para Birimi',
    
    // sections tr
    lastMinuteDeals: 'Son Dakika Fırsatları',
    recentSearches: 'Son Aramalar',
    discover: 'Keşfetmeye Başlayın!',
    excellent: 'Fevkalade',
    reviews: 'değerlendirme',
    
    // pages tr
    homePage: 'Ana Sayfa',
    luxuryHotels: 'Lüks Oteller',
    yachtExperiences: 'Yat Deneyimleri',
    myFavorites: 'Favorilerim',
    all: 'Tümü',
    recommended: 'Önerilen',
    details: 'Detayları Görüntüle',
    reservation: 'Rezervasyon',
    startDiscovering: 'Keşfetmeye Başla',
    noFavoritesYet: 'Henüz favorilere eklediğiniz bir öğe yok',
    continueExploring: 'Keşfetmeye devam edin ve beğendiğiniz oteller, turlar ve yat\'ları favorilerinize ekleyin',
    itemsInFavorites: 'öğe favorilerinizde',
    
    // errors
    invalidEmail: 'Geçersiz e-posta',
    passwordTooShort: 'Şifre en az 6 karakter, 1 büyük harf ve 1 sayı içermeli',
    passwordsDontMatch: 'Şifreler eşleşmiyor',
    emailExists: 'Bu e-posta ile zaten kayıt var',
    wrongCredentials: 'E-posta veya şifre hatalı',
    registrationFailed: 'Kayıt yapılamadı',
    loginFailed: 'Giriş yapılamadı',
    operationFailed: 'İşlem başarısız',
    passwordResetSent: 'Şifre sıfırlama maili gönderildi (simülasyon)',
  },
  en: {
    // header
    brand: 'HotelBooking',
    hotels: 'Hotels',
    tours: 'Tours',
    experiences: 'Experiences',
    favorites: 'Favorites',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    hello: 'Hello',
    
    // search
    searchHoliday: 'Search Holiday',
    region: 'Region / Hotel / Airport / Campaign',
    regionPlaceholder: 'Enter city, district or holiday region',
    checkIn: 'Check-in Date',
    checkOut: 'Check-out Date',
    adults: 'Adults',
    children: 'Children',
    onlyAvailable: 'Only Available Hotels',
    searchHotel: 'Search Hotel',
    
    // modals
    registerTitle: 'Register',
    loginTitle: 'Login',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    passwordHint: 'Must contain at least 6 characters, 1 uppercase letter and 1 number.',
    registerButton: 'Register',
    loginButton: 'Login',
    forgotPassword: 'Forgot Password',
    close: 'Close',
    apply: 'Apply',
    cancel: 'Cancel',
    sendMail: 'Send Mail',
    sending: 'Sending…',
    registering: 'Registering…',
    loggingIn: 'Logging in…',
    
    // language modal
    languageCurrency: 'Language and Currency',
    language: 'Language',
    currency: 'Currency',
    
    // sections
    lastMinuteDeals: 'Last Minute Deals',
    recentSearches: 'Recent Searches',
    discover: 'Start Discovering!',
    excellent: 'Excellent',
    reviews: 'reviews',
    
    // pages en
    homePage: 'Home',
    luxuryHotels: 'Luxury Hotels',
    yachtExperiences: 'Yacht Experiences',
    myFavorites: 'My Favorites',
    all: 'All',
    recommended: 'Recommended',
    details: 'View Details',
    reservation: 'Reservation',
    startDiscovering: 'Start Discovering',
    noFavoritesYet: 'You haven\'t added any items to your favorites yet',
    continueExploring: 'Continue exploring and add hotels, tours and yachts you like to your favorites',
    itemsInFavorites: 'items in your favorites',
    
    // errors
    invalidEmail: 'Invalid email',
    passwordTooShort: 'Password must contain at least 6 characters, 1 uppercase letter and 1 number',
    passwordsDontMatch: 'Passwords do not match',
    emailExists: 'An account with this email already exists',
    wrongCredentials: 'Email or password is incorrect',
    registrationFailed: 'Registration failed',
    loginFailed: 'Login failed',
    operationFailed: 'Operation failed',
    passwordResetSent: 'Password reset email sent (simulation)',
  }
};

export const getTranslation = (key: keyof typeof translations.tr, language: Language): string => {
  return translations[language][key] || translations.tr[key];
};
