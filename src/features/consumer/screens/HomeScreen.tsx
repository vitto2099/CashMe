import {
  ShoppingBag,
  Star,
  QrCode,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Percent,
} from "lucide-react";
import { G, GD, GOLD } from "@/constants/theme";
import { offers, categories, stores } from "@/data/mocks";
import { useApp } from "@/context/AppContext";
import type { ConsumerScreen } from "@/types/navigation";

interface HomeScreenProps {
  go: (s: ConsumerScreen) => void;
}

export function HomeScreen({ go }: HomeScreenProps) {
  const { userName, userPoints } = useApp();
  const estimatedCashback = (userPoints * 0.02).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
              Painel do Consumidor
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">Programa de Fidelidade NFC-e</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Olá, {userName}! 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Acumule pontos em cada nota fiscal emitida e troque por descontos nas melhores lojas locais.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go("qr-code")}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <QrCode size={18} />
            <span>Escanear Nota Fiscal</span>
          </button>
        </div>
      </div>

      {/* Hero Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Saldo de Pontos */}
        <div
          className="rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-emerald-700/15 flex flex-col justify-between"
          style={{ background: `linear-gradient(135deg, ${G}, ${GD})` }}
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
                Saldo Disponível
              </span>
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
                <Star size={18} color={GOLD} fill={GOLD} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black tracking-tight">
                {userPoints.toLocaleString("pt-BR")}
              </span>
              <span className="text-lg font-bold text-emerald-200">pts</span>
            </div>
            <p className="text-xs text-emerald-100/90 mt-1">
              Equivale a cerca de <strong className="text-white">{estimatedCashback}</strong> em descontos
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
            <button
              onClick={() => go("wallet")}
              className="text-xs font-bold text-white flex items-center gap-1 hover:underline cursor-pointer"
            >
              Ver Extrato Detalhado <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Card 2: Leitor NFC-e Instantâneo */}
        <div className="rounded-3xl p-6 bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Pontuar com Cupom
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <QrCode size={18} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Leu uma nota fiscal hoje?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Notas fiscais emitidas em Santa Catarina e Paraná acumulam pontos em até 48 horas da compra.
            </p>
          </div>

          <button
            onClick={() => go("qr-code")}
            className="mt-6 w-full py-2.5 px-4 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 text-gray-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Inserir Chave de 44 Dígitos</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Card 3: Status das Ofertas Prontas */}
        <div className="rounded-3xl p-6 bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Resgates Imediatos
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Percent size={18} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Você tem cupons disponíveis!</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Com seu saldo atual de {userPoints} pontos, você já pode resgatar ofertas na Padaria Real e Farmácia Central.
            </p>
          </div>

          <button
            onClick={() => go("offers")}
            className="mt-6 w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Explorar Vitrine de Recompensas</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <section className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Categorias em Destaque
            </h2>
            <p className="text-xs text-gray-500">Explore parceiros por segmento no comércio local</p>
          </div>
          <button
            onClick={() => go("categories")}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Ver Todas as Categorias <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => go("stores")}
              className="group flex flex-col items-center p-4 rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer bg-gray-50/50 hover:bg-white"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 shadow-xs group-hover:scale-110 transition-transform"
                style={{ background: cat.bg }}
              >
                <cat.Icon size={22} color={cat.color} />
              </div>
              <span className="text-xs font-bold text-gray-800 text-center">{cat.name}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Ver lojas</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Offers Grid */}
      <section className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Cupons & Recompensas em Destaque
            </h2>
            <p className="text-xs text-gray-500">Troque seus pontos acumulados por vantagens imediatas</p>
          </div>
          <button
            onClick={() => go("offers")}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Ver Todos os Cupons <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((o) => (
            <div
              key={o.id}
              onClick={() => go("offer-detail")}
              className="group rounded-2xl border border-gray-200/80 overflow-hidden hover:shadow-xl hover:border-emerald-400 transition-all cursor-pointer flex flex-col bg-white"
            >
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img
                  src={o.img}
                  alt={o.store}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur-xs text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {o.store}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xl font-black leading-tight drop-shadow-xs">
                    {o.discount}
                  </p>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Custo do Resgate:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {o.pts} pontos
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Válido até {o.valid}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Ver detalhes do cupom <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Stores Grid */}
      <section className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Lojas Parceiras Credenciadas
            </h2>
            <p className="text-xs text-gray-500">Estabelecimentos onde suas notas fiscais geram pontos garantidos</p>
          </div>
          <button
            onClick={() => go("stores")}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Ver Todas as Lojas <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stores.map((s) => (
            <div
              key={s.id}
              onClick={() => go("store-detail")}
              className="p-5 rounded-2xl border border-gray-200/80 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between bg-white group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base shadow-xs"
                    style={{ background: s.bg, color: s.color }}
                  >
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[11px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {s.cat}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{s.loc}</p>
                <div className="mt-3 p-2 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <p className="text-[11px] font-bold text-emerald-800">
                    {s.rule}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">Pontos disponíveis:</span>
                <span className="font-bold text-emerald-700">{s.pts} pts</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
