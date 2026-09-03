import { useState } from "react";
import { ShoppingBag, Bell, Star, ChevronRight } from "lucide-react";
import { G, GD, GOLD } from "@/constants/theme";
import { offers, categories } from "@/data/mocks";
import { useApp } from "@/context/AppContext";
import type { ConsumerScreen } from "@/types/navigation";

interface HomeScreenProps {
  go: (s: ConsumerScreen) => void;
}

export function HomeScreen({ go }: HomeScreenProps) {
  const [slide, setSlide] = useState(0);
  const { userName, userPoints } = useApp();

  return (
    <div className="flex-1 overflow-y-auto bg-[#F7F8FA]">
      {/* Header */}
      <div className="bg-white px-4 pb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] bg-[#008D4C] rounded-lg flex items-center justify-center shadow-xs">
              <ShoppingBag size={16} color="#fff" />
            </div>
            <span className="text-lg font-bold text-[#008D4C] tracking-tight">cash me</span>
          </div>
          <button
            aria-label="Notificações"
            className="w-10 h-10 rounded-full bg-[#F4FAF6] border-none flex items-center justify-center cursor-pointer relative hover:bg-emerald-100/50 transition-colors"
          >
            <Bell size={20} color={G} />
            <div className="absolute top-[9px] right-[9px] w-2 h-2 bg-[#F5B800] rounded-full border-2 border-white" />
          </button>
        </div>
        <h1 className="text-[22px] font-bold text-gray-900 mb-1">Olá, {userName}! 👋</h1>
        <p className="text-xs text-gray-500 m-0 leading-relaxed">
          Descubra ofertas incríveis e acumule pontos nas melhores lojas da cidade.
        </p>
      </div>

      {/* Points Card */}
      <div
        className="mx-4 my-4 rounded-2xl p-5 relative overflow-hidden shadow-md"
        style={{ background: `linear-gradient(135deg,${G},${GD})` }}
      >
        <div className="absolute -right-6 -top-6 w-[120px] h-[120px] rounded-full bg-white/10 pointer-events-none" />
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-xs text-white/80 mb-1 font-medium">Seus pontos totais</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white leading-none">
                {userPoints.toLocaleString("pt-BR")}
              </span>
              <span className="text-base font-semibold text-white/80">pts</span>
            </div>
            <p className="text-xs text-white/70 mt-1 mb-0">em todas as lojas</p>
          </div>
          <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xs">
            <Star size={24} color={GOLD} fill={GOLD} />
          </div>
        </div>
      </div>

      {/* Highlights Carousel */}
      <div className="mb-4">
        <div className="flex justify-between items-center px-4 pb-2.5">
          <h2 className="text-base font-semibold text-gray-900 m-0">Destaques para você</h2>
          <button
            onClick={() => go("offers")}
            className="text-xs text-[#008D4C] bg-transparent border-none cursor-pointer font-semibold hover:underline"
          >
            Ver todos
          </button>
        </div>
        <div className="pl-4 overflow-hidden">
          <div
            className="flex gap-3 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${slide * 308}px)` }}
          >
            {offers.map((o) => (
              <div
                key={o.id}
                onClick={() => go("offer-detail")}
                className="w-[296px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer shrink-0 bg-white border border-gray-100"
              >
                <div className="h-[130px] relative overflow-hidden" style={{ background: o.bg }}>
                  <img
                    src={o.img}
                    alt={o.store}
                    className="w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-xs rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs">
                      {o.store}
                    </span>
                  </div>
                </div>
                <div className="p-3 px-3.5 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">
                      {o.pts} pts = {o.discount}
                    </p>
                    <p className="text-[11px] text-gray-500 m-0">Válido até {o.valid}</p>
                  </div>
                  <ChevronRight size={18} color={G} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-1.5 mt-2.5">
          {offers.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-200 ${
                slide === i ? "w-5 bg-[#008D4C]" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mx-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold text-gray-900 m-0">Categorias</h2>
          <button
            onClick={() => go("categories")}
            className="text-xs text-[#008D4C] bg-transparent border-none cursor-pointer font-semibold hover:underline"
          >
            Ver todas
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => go("stores")}
              className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-[#008D4C]/40 hover:shadow-xs transition-all active:scale-95"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                style={{ background: cat.bg }}
              >
                <cat.Icon size={20} color={cat.color} />
              </div>
              <span className="text-[10px] font-medium text-gray-800 text-center leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

