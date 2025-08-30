import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import LanguageModal from "./components/LanguageModal";
import { Search, BedDouble, Package2, Plane } from "lucide-react";
import { useRef } from "react";
import { Globe, Heart, ArrowLeft, ArrowRight } from "lucide-react";



export default function App() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [adults, setAdults] = useState(2);
const [children, setChildren] = useState(0);
const [onlyAvailable, setOnlyAvailable] = useState(false);
const [activeTab, setActiveTab] = useState<'otel' | 'paket' | 'ucak'>('otel');
const ideasRef = useRef<HTMLDivElement>(null);

const scrollIdeas = (dir: 1 | -1) => {
  const el = ideasRef.current;
  if (!el) return;
  // İlk kartın genişliğini baz alarak düzgün adım kaydır
  const firstCard = el.querySelector<HTMLElement>("a");
  const step = firstCard ? firstCard.offsetWidth + 32 /* gap-8 */ : 360;
  el.scrollBy({ left: dir * step, behavior: "smooth" });
};


  return (
<div className="min-h-screen bg-[#f1f5f9]">
{/* üst menü */}
<header className="sticky top-0 z-[60] flex justify-between items-center px-10 py-6 bg-white/90 backdrop-blur shadow-md">
  <div className="text-2xl font-bold text-[#3620D9]">HotelBooking</div>

  {/* orta menü */}
  <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
  <a href="#" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">Oteller</a>
  <a href="#" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">Turlar</a>
  <a href="#" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">Deneyimler</a>
  <a href="#" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">Favoriler</a>
  <a href="#" className="px-3 py-2 hover:border-b-2 hover:border-gray-500 transition">İletişim</a>
</nav>


  <div className="flex items-center space-x-4">
    {/* dil para */}
    <button
      onClick={() => setOpen(true)}
      className="flex items-center space-x-2 border px-3 py-2 rounded-md hover:bg-gray-100 transition"
    >
      <Globe className="w-4 h-4" />
      <span>TR · TL</span>
    </button>

    {/* giriş dropdown overlay*/}
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
  </div> 
</header>


      {/* modal */}
 <LanguageModal open={open} setOpen={setOpen} /> 
 <section className="relative pb-36 md:pb-44">
 <div
          className="w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg')",
          }}
        ></div>

{/* dikey arama kartı – merkeze sabit */}
<div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
  <div className="w-[420px] bg-white/95 rounded-2xl shadow-xl border-2 border-[#3620D9] p-5">
    {/* sekmeler */}
    <div className="grid grid-cols-3 gap-2 mb-4">
      <button
        onClick={() => setActiveTab('otel')}
        className={`flex items-center justify-center gap-2 py-2 rounded-lg border transition
          ${activeTab==='otel' ? 'bg-[#3620D9] text-white border-[#3620D9]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
      >
        <BedDouble className="w-4 h-4" /> Otel
      </button>
      <button
        onClick={() => setActiveTab('paket')}
        className={`flex items-center justify-center gap-2 py-2 rounded-lg border transition
          ${activeTab==='paket' ? 'bg-[#3620D9] text-white border-[#3620D9]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
      >
        <Package2 className="w-4 h-4" /> Turlar
      </button>
      <button
        onClick={() => setActiveTab('ucak')}
        className={`flex items-center justify-center gap-2 py-2 rounded-lg border transition
          ${activeTab==='ucak' ? 'bg-[#3620D9] text-white border-[#3620D9]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
      >
        <Plane className="w-4 h-4" /> Uçak
      </button>
    </div>

    <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
      <Search className="w-5 h-5 text-[#3620D9]" /> Tatil Ara
    </h3>

    <label className="text-sm text-gray-600">Bölge / Otel / Havaalanı /Kampanya</label>
    <input
      type="text"
      placeholder="Şehir, ilçe veya tatil bölgesi yazınız"
      className="w-full border border-gray-300 rounded-lg p-2 mt-1"
    />

    <div className="grid grid-cols-2 gap-3 mt-3">
      <div>
        <label className="text-sm text-gray-600">Giriş Tarihi</label>
        <input type="date" className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
      </div>
      <div>
        <label className="text-sm text-gray-600">Çıkış Tarihi</label>
        <input type="date" className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mt-3">
      <div>
        <label className="text-sm text-gray-600">Yetişkin</label>
        <div className="mt-1 flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setAdults(Math.max(1, adults - 1))}
            className="px-3 py-2 text-lg hover:bg-gray-100 rounded-l-lg"
            aria-label="Yetişkin azalt"
          >−</button>
          <div className="flex-1 text-center select-none">{adults}</div>
          <button
            onClick={() => setAdults(adults + 1)}
            className="px-3 py-2 text-lg hover:bg-gray-100 rounded-r-lg"
            aria-label="Yetişkin arttır"
          >+</button>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600">Çocuk</label>
        <div className="mt-1 flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setChildren(Math.max(0, children - 1))}
            className="px-3 py-2 text-lg hover:bg-gray-100 rounded-l-lg"
            aria-label="Çocuk azalt"
          >−</button>
          <div className="flex-1 text-center select-none">{children}</div>
          <button
            onClick={() => setChildren(children + 1)}
            className="px-3 py-2 text-lg hover:bg-gray-100 rounded-r-lg"
            aria-label="Çocuk arttır"
          >+</button>
        </div>
      </div>
    </div>

    <label className="flex items-center gap-2 mt-4">
      <input
        type="checkbox"
        className="accent-[#3620D9]"
        checked={onlyAvailable}
        onChange={(e) => setOnlyAvailable(e.target.checked)}
      />
      <span className="text-sm text-gray-700">Sadece Müsait Oteller</span>
    </label>

    <button className="mt-4 w-full bg-[#3620D9] hover:bg-[#4230FF] text-white font-semibold py-3 rounded-xl">
      Otel Ara
    </button>
  </div>
</div>


       {/* sol panel: Son Dakika Fırsatları */}
<div className="absolute top-20 left-10 bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 w-[340px]">
  <h2 className="text-xl font-bold mb-4 text-[#3620D9]">Son Dakika Fırsatları</h2>

  <div className="space-y-4">
    {/* 1. kart */}
    <a
      href="/otel/vogue-hotel-supreme-bodrum"
      className="flex items-start gap-3 p-3 border-b rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition"
    >
      <img
        src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Vogue Hotel Supreme Bodrum"
        className="h-14 w-14 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">Vogue Hotel Supreme Bodrum</h3>
        <p className="text-sm text-gray-500">Muğla, Bodrum</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">9.0</span>
          <span className="text-xs text-gray-700">Fevkalade</span>
        </div>
      </div>
    </a>

    {/* 2. kart */}
    <a
      href="/otel/fashiontv-luxe-resort"
      className="flex items-start gap-3 p-3 border-b rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition"
    >
      <img
        src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="FashionTV Luxe Resort"
        className="h-14 w-14 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">FashionTV Luxe Resort</h3>
        <p className="text-sm text-gray-500">Antalya, Kemer</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">9.0</span>
          <span className="text-xs text-gray-700">Fevkalade</span>
        </div>
      </div>
    </a>

    {/* 3. kart */}
    <a
      href="/otel/litore-resort-hotel-spa"
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition"
    >
      <img
        src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Litore Resort Hotel & Spa"
        className="h-14 w-14 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">Litore Resort Hotel & Spa</h3>
        <p className="text-sm text-gray-500">Antalya, Alanya</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">9.2</span>
          <span className="text-xs text-gray-700">Fevkalade</span>
        </div>
      </div>
    </a>
  </div>
</div>

{/* sağ panel: Son Aramalar */}
<div className="absolute top-20 right-10 bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 w-[340px]">
  <h2 className="text-xl font-bold mb-4 text-[#3620D9]">Son Aramalar</h2>

  <div className="space-y-4">
    {/* 1. kart */}
    <div
      role="button"
      tabIndex={0}
      onClick={() => (window.location.href = '/otel/homely-studios')}
      onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/otel/homely-studios')}
      className="flex items-start gap-3 p-3 border-b rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition cursor-pointer"
    >
      <img
        src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Homely Studios"
        className="h-14 w-14 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">Homely Studios</h3>
        <p className="text-sm text-gray-500">Sakız, Yunanistan</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">8.8</span>
          <a
            href="/otel/homely-studios/yorumlar"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-[#3620D9] underline underline-offset-2 hover:text-[#4230FF]"
          >
            506 değerlendirme
          </a>
        </div>
      </div>
    </div>

    {/* 2. kart */}
    <div
      role="button"
      tabIndex={0}
      onClick={() => (window.location.href = '/otel/sweet-cottage-in-the-city')}
      onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/otel/sweet-cottage-in-the-city')}
      className="flex items-start gap-3 p-3 border-b rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition cursor-pointer"
    >
      <img
        src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Sweet Cottage In The City"
        className="h-14 w-14 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">Sweet Cottage In The City</h3>
        <p className="text-sm text-gray-500">Sakız, Yunanistan</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">9.1</span>
          <a
            href="/otel/sweet-cottage-in-the-city/yorumlar"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-[#3620D9] underline underline-offset-2 hover:text-[#4230FF]"
          >
            12 değerlendirme
          </a>
        </div>
      </div>
    </div>

    {/* 3. kart */}
    <div
      role="button"
      tabIndex={0}
      onClick={() => (window.location.href = '/otel/grecian-castle-chios')}
      onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/otel/grecian-castle-chios')}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#3620D9] transition cursor-pointer"
    >
      <img
        src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Grecian Castle Chios"
        className="h-14 w-14 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">Grecian Castle Chios</h3>
        <p className="text-sm text-gray-500">Sakız, Yunanistan</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-white text-sm">7.9</span>
          <a
            href="/otel/grecian-castle-chios/yorumlar"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-[#3620D9] underline underline-offset-2 hover:text-[#4230FF]"
          >
            1.815 değerlendirme
          </a>
        </div>
      </div>
    </div>
  </div>
</div>



      </section>
      {/* iki görselarasındaki şerit*/}
      <div className="h-6 bg-[#f1f5f9]"></div>
{/* ========= Fikirler (2. arka plan üstünde) ========= */}
{/* ========= Fikirler (2. arka plan üstünde) ========= */}
<section
  className="relative isolate bg-fixed bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images5.alphacoders.com/438/438649.jpg')",
  }}
>
  {/* Yumuşak beyaz örtü (içerik okunabilir olsun) */}
  <div className="absolute inset-0 bg-white/90" />

  <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-16">
    {/* Başlık + Kaydırma tuşları */}
    <div className="flex items-center justify-between gap-4 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0f5132]">
        Keşfetmeye Başlayın!
      </h2>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollIdeas(-1)}
          className="rounded-full p-2 bg-white shadow hover:bg-gray-50 active:scale-95"
          aria-label="Sola kaydır"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => scrollIdeas(1)}
          className="rounded-full p-2 bg-white shadow hover:bg-gray-50 active:scale-95"
          aria-label="Sağa kaydır"
        >
          <ArrowRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>

    {/* KARTLAR: yatay kaydırılabilir grid */}
    <div
      ref={ideasRef}
      className="
        grid grid-flow-col auto-cols-[minmax(280px,420px)]
        gap-8 overflow-x-auto no-scrollbar pb-2
        snap-x snap-mandatory
      "
    >
      {/* Kart 1 */}
      <a
        href="/fikirler/yildiz-izleme"
        aria-label="Dünyanın dört bir yanında yıldızları izleyebileceğiniz yerler"
        className="group snap-start bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
      >
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="yıldızlı gökyüzü"
            className="w-full h-64 object-cover"
          />
          <button
            type="button"
            className="absolute right-3 top-3 bg-white/90 rounded-full p-2 shadow group-hover:scale-105 transition"
            aria-label="Favorilere ekle"
          >
            <Heart className="w-5 h-5 text-[#3620D9]" />
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-center text-[17px] leading-6 font-medium text-gray-800">
            Utah’tan Dubai’ye kadar yıldızları seyretmek için gidilebilecek
            yerler
          </p>
        </div>
      </a>

      {/* Kart 2 */}
      <a
        href="/fikirler/kultur-sanat"
        aria-label="Paris, New York ve popüler kültür mekânlarında sanat"
        className="group snap-start bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
      >
        <div className="relative">
          <img
            src="https://i0.wp.com/www.medievalbrick.com/wp-content/uploads/2022/03/8.jpg?w=640&ssl=1"
            alt="katedral"
            className="w-full h-64 object-cover"
          />
          <button
            type="button"
            className="absolute right-3 top-3 bg-white/90 rounded-full p-2 shadow group-hover:scale-105 transition"
            aria-label="Favorilere ekle"
          >
            <Heart className="w-5 h-5 text-[#3620D9]" />
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-center text-[17px] leading-6 font-medium text-gray-800">
            Paris’te, New York’ta ve diğer popüler kültür mekânlarında sanata
            bakın
          </p>
        </div>
      </a>

      {/* Kart 3 */}
      <a
        href="/fikirler/gurme-rotalar"
        aria-label="13 şehirde 13 inanılmaz yemek rotası"
        className="group snap-start bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
      >
        <div className="relative">
          <img
            src="https://i1.wp.com/www.cooking-sun.com/wp-content/uploads/2018/07/eating-sushi.jpg?w=1280&ssl=1"
            alt="asya yemeği"
            className="w-full h-64 object-cover"
          />
          <button
            type="button"
            className="absolute right-3 top-3 bg-white/90 rounded-full p-2 shadow group-hover:scale-105 transition"
            aria-label="Favorilere ekle"
          >
            <Heart className="w-5 h-5 text-[#3620D9]" />
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-center text-[17px] leading-6 font-medium text-gray-800">
            13 şehir, 13 inanılmaz yemek seyahati
          </p>
        </div>
      </a>
    </div> 
  </div> 
</section> 
</div>
);
}



