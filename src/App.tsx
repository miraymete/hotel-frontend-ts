import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import LanguageModal from "./components/LanguageModal";




export default function App() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);


  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Üst Menü */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
  <div className="text-2xl font-bold text-[#3620D9]">HotelBooking</div>

  {/* orta menü */}
  <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
    {/* ...linkler... */}
  </nav>

  {/* >>> BURADAN AŞAĞISI: düzeltilmiş buton bölümü <<< */}
  <div className="flex items-center space-x-4">
    {/* dil & para */}
    <button
      onClick={() => setOpen(true)}
      className="flex items-center space-x-2 border px-3 py-2 rounded-md hover:bg-gray-100 transition"
    >
      <Globe className="w-4 h-4" />
      <span>TR · TL</span>
    </button>

    {/* Giriş dropdown + overlayi bu relative içinde konumlanır */}
    <div className="relative">
  <Button variant="outline" onClick={() => setLoginOpen(true)}>
    Giriş Yap
  </Button>
  <LoginModal open={loginOpen} setOpen={setLoginOpen} />
</div>

<div className="relative">
  <Button
    className="bg-[#3620D9] hover:bg-[#4230FF] text-white"
    onClick={() => setRegisterOpen(true)}
  >
    Kaydol
  </Button>
  <RegisterModal open={registerOpen} setOpen={setRegisterOpen} />
</div>
  </div> {/* <<< EKSİK OLAN KAPANIŞ BUYDU */}
</header>


      {/* Modal */}
 <LanguageModal open={open} setOpen={setOpen} /> 
<section className="relative">
        <div
          className="w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg')",
          }}
        ></div>

        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-x-0 bottom-[-40px] flex justify-center">
          <div className="max-w-4xl mx-auto bg-white/95 shadow-xl rounded-xl p-6 grid md:grid-cols-5 gap-4 mt-10 relative z-30 border-2 border-[#3620D9]">
            <div>
              <label className="text-sm text-gray-500">Konum</label>
              <input
                type="text"
                placeholder="İstanbul, Türkiye"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Giriş</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Çıkış</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Misafir</label>
              <select className="w-full border border-gray-300 rounded-lg p-2 mt-1">
                <option>1 Kişi</option>
                <option>2 Kişi</option>
                <option>3 Kişi</option>
                <option>4+ Kişi</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-[#3620D9] hover:bg-[#4230FF] text-white font-semibold py-2 px-4 rounded-lg">
                Rezervasyon Yap
              </button>
            </div>
          </div>
        </div>

        {/* Kampanya Şeridi */}
        <div className="absolute top-20 left-10 bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 w-[350px]">
          <h2 className="text-xl font-bold mb-4 text-[#3620D9]">
            Son Dakika Fırsatları
          </h2>

          <div className="space-y-4">
            <div className="p-3 border-b">
              <h3 className="font-semibold">Vogue Hotel Supreme Bodrum</h3>
              <p className="text-sm text-gray-500">Muğla, Bodrum</p>
              <span className="text-xs text-green-600 font-bold">
                9/10 Fevkalade
              </span>
            </div>

            <div className="p-3 border-b">
              <h3 className="font-semibold">FashionTV Luxe Resort</h3>
              <p className="text-sm text-gray-500">Antalya, Kemer</p>
              <span className="text-xs text-green-600 font-bold">
                9/10 Fevkalade
              </span>
            </div>

            <div className="p-3 border-b">
              <h3 className="font-semibold">Litore Resort Hotel & Spa</h3>
              <p className="text-sm text-gray-500">Antalya, Alanya</p>
              <span className="text-xs text-green-600 font-bold">
                9.2/10 Fevkalade
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
