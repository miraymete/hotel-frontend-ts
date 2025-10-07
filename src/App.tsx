/*
 ana uygulama bileşeni
 sayfa routing modal kontrolü ve oturum durumu buradan yönetilir
 favoriler ve para birimi context sağlanır
*/
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// sayfa bileşenleri
import HomePage from "@/pages/Home";
import HotelsPage from "@/pages/Hotels";
import ToursPage from "@/pages/Tours";
import YachtsPage from "@/pages/Yachts";
import FavoritesPage from "@/pages/Favorites";
import ExperiencesPage from "@/pages/Experiences";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AccountPage from "@/pages/Account";

// modal bileşenleri
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import LanguageModal from "@/components/LanguageModal";

// context ve auth utilities
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { getCurrentUser, logout, type PublicUser } from "@/lib/auth";

export default function App() {
  // modal durumları
  const [openLang, setOpenLang] = useState(false);      // dil seçim modalı
  const [loginOpen, setLoginOpen] = useState(false);    // giriş modalı
  const [registerOpen, setRegisterOpen] = useState(false); // kayıt modalı

  // mevcut kullanıcıyı localStorage'dan al
  const [user, setUser] = useState<PublicUser | null>(getCurrentUser());

  // kullanıcı durumunu güncellemek için callback
  const updateUserState = () => {
    setUser(getCurrentUser());
  };

  return (
    // favoriler ve para birimi context sağla
    <FavoritesProvider>
      <CurrencyProvider>
      {/* sayfa routing react router ile */}
      <Routes>
        {/* ana sayfa kullanıcı bilgileri ve modal açma fonksiyonları prop olarak geçer */}
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              onLogout={() => {
                logout();           // localStorage'dan kullanıcıyı sil
                setUser(null);      // state'i temizle
              }}
              onOpenLanguage={() => setOpenLang(true)}
            />
          }
        />
        {/* diğer sayfalar */}
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/yachts" element={<YachtsPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={updateUserState} />} />
        <Route path="/register" element={<RegisterPage onRegisterSuccess={updateUserState} />} />
        <Route 
          path="/account" 
          element={
            <AccountPage
              user={user}
              onLogout={() => {
                logout();
                setUser(null);
              }}
            />
          } 
        />
      </Routes>

      {/* modal bileşenleri en üste render edilir tüm sayfalarda kullanılır */}
      <LoginModal
        open={loginOpen}
        setOpen={setLoginOpen}
        onSuccess={(u) => setUser(u)}  // başarılı giriş sonrası kullanıcı state güncelle
      />
      <RegisterModal
        open={registerOpen}
        setOpen={setRegisterOpen}
        onSuccess={(u) => setUser(u)}  // başarılı kayıt sonrası kullanıcı state güncelle
      />
      <LanguageModal 
        open={openLang} 
        setOpen={setOpenLang} 
      />
      </CurrencyProvider>
    </FavoritesProvider>
  );
}