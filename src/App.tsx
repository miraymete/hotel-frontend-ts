/**
 * ana uygulama bileşeni - hotelbooking
 * 
 * bu dosya uygulamanın ana yapısını oluşturur
 * - sayfa routing'ini yönetir
 * - modal'ları kontrol eder
 * - kullanıcı oturum durumunu takip eder
 * - favoriler context'ini sağlar
 */
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// sayfa bileşenleri
import HomePage from "@/pages/Home";
import HotelsPage from "@/pages/Hotels";
import ToursPage from "@/pages/Tours";
import FavoritesPage from "@/pages/Favorites";
import ExperiencesPage from "@/pages/Experiences";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

// modal bileşenleri
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import LanguageModal from "@/components/LanguageModal";

// context ve auth utilities
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { getCurrentUser, logout, type PublicUser } from "@/lib/auth";

export default function App() {
  // modal durumlarını yöneten state'ler
  const [openLang, setOpenLang] = useState(false);      // dil seçim modal'ı
  const [loginOpen, setLoginOpen] = useState(false);    // giriş modal'ı
  const [registerOpen, setRegisterOpen] = useState(false); // kayıt modal'ı

  // kullanıcı oturum durumu - localStorage'dan mevcut kullanıcıyı al
  const [user, setUser] = useState<PublicUser | null>(getCurrentUser());

  return (
    // favoriler context'ini tüm uygulamaya sağla
    <FavoritesProvider>
      {/* sayfa routing'i - react router ile sayfa yönlendirmeleri */}
      <Routes>
        {/* ana sayfa - kullanıcı bilgileri ve modal açma fonksiyonları prop olarak geçiliyor */}
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              onLogout={() => {
                logout();           // localStorage'dan kullanıcıyı sil
                setUser(null);      // state'i temizle
              }}
              onOpenLogin={() => {}} // Artık kullanılmıyor - yeni sayfalar kullanılıyor
              onOpenRegister={() => {}} // Artık kullanılmıyor - yeni sayfalar kullanılıyor
              onOpenLanguage={() => setOpenLang(true)}
            />
          }
        />
        {/* diğer sayfalar - modal fonksiyonlarına ihtiyaç duymazlar */}
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* modal bileşenleri - en üstte render edilir, tüm sayfalarda kullanılabilir */}
      <LoginModal
        open={loginOpen}
        setOpen={setLoginOpen}
        onSuccess={(u) => setUser(u)}  // başarılı giriş sonrası kullanıcı state'ini güncelle
      />
      <RegisterModal
        open={registerOpen}
        setOpen={setRegisterOpen}
        onSuccess={(u) => setUser(u)}  // başarılı kayıt sonrası kullanıcı state'ini güncelle
      />
      <LanguageModal 
        open={openLang} 
        setOpen={setOpenLang} 
      />
    </FavoritesProvider>
  );
}