import { useState } from "react";
import {
  ShoppingBag,
  User,
  Store,
  ChevronRight,
  QrCode,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Coins,
  CheckCircle2,
} from "lucide-react";
import { G, GD, P, PD } from "@/constants/theme";
import type { AppMode } from "@/types/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/layout/AuthModal";

interface LandingScreenProps {
  onSelect: (m: AppMode) => void;
}

export function LandingScreen({ onSelect }: LandingScreenProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="w-full bg-gradient-to-b from-emerald-50/50 via-white to-gray-50 flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Background decorative glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-200/20 via-purple-200/20 to-emerald-200/20 blur-3xl -z-10 pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold mb-6 shadow-xs">
            <Sparkles size={14} className="text-emerald-600" />
            <span>Plataforma Oficial de Fidelidade & NFC-e (SC & PR)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
            O cashback que valoriza o <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">comércio local</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Escaneie o QR Code das suas notas fiscais de compras diárias, acumule pontos automáticos e resgate recompensas exclusivas nas suas lojas favoritas.
          </p>

          {/* Quick Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
            <button
              onClick={() => onSelect("consumer")}
              className="p-5 rounded-2xl text-white shadow-xl shadow-emerald-700/20 hover:shadow-emerald-700/30 transition-all hover:-translate-y-0.5 cursor-pointer text-left flex items-center justify-between group"
              style={{ background: `linear-gradient(135deg, ${G}, ${GD})` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">Sou Consumidor</h3>
                  <p className="text-xs text-emerald-100 mt-0.5">Acumule e resgate pontos</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onSelect("merchant")}
              className="p-5 rounded-2xl text-white shadow-xl shadow-purple-700/20 hover:shadow-purple-700/30 transition-all hover:-translate-y-0.5 cursor-pointer text-left flex items-center justify-between group"
              style={{ background: `linear-gradient(135deg, ${P}, ${PD})` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Store size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">Sou Lojista</h3>
                  <p className="text-xs text-purple-100 mt-0.5">Gerencie vendas e fidelidade</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* User Session Bar or Auth Triggers */}
          {isAuthenticated && user ? (
            <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-white rounded-full border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-gray-700">
                  Conectado como <strong className="text-gray-900">{user.fullName || user.email}</strong>
                </span>
              </div>
              <button
                onClick={() => logout()}
                className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
              <span>Já possui conta no Cash Me?</span>
              <button
                onClick={() => openAuth("login")}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Fazer Login na API
              </button>
              <span>•</span>
              <button
                onClick={() => openAuth("signup")}
                className="text-gray-700 font-bold hover:underline cursor-pointer"
              >
                Cadastrar-se
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How it Works (3 Steps) */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Como funciona o Cash Me
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Tecnologia sem atrito: transforme qualquer compra do dia a dia em recompensas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Compre no Comércio Parceiro</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Faça suas compras diárias em padarias, mercados, farmácias e restaurantes locais e receba sua NFC-e impressa.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Escaneie o QR da NFC-e</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Abra a câmera do Cash Me e aponte para o QR Code da nota fiscal. O sistema valida na SEFAZ e reconhece o CNPJ da loja.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Pontos & Resgates Imediatos</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Seus pontos caem na carteira digital na hora! Troque por descontos na próxima compra ou produtos exclusivos da vitrine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Architecture Badges */}
      <section className="py-14 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white rounded-xl border border-gray-200/60 shadow-xs">
              <ShieldCheck size={28} className="mx-auto text-emerald-600 mb-2" />
              <h4 className="text-sm font-bold text-gray-900">Anti-Fraude Oficial</h4>
              <p className="text-[11px] text-gray-500 mt-1">Chave de 44 dígitos validada uma única vez</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gray-200/60 shadow-xs">
              <QrCode size={28} className="mx-auto text-emerald-600 mb-2" />
              <h4 className="text-sm font-bold text-gray-900">SEFAZ SC & PR</h4>
              <p className="text-[11px] text-gray-500 mt-1">Integração homologada para notas fiscais</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gray-200/60 shadow-xs">
              <TrendingUp size={28} className="mx-auto text-purple-600 mb-2" />
              <h4 className="text-sm font-bold text-gray-900">Fator Customizável</h4>
              <p className="text-[11px] text-gray-500 mt-1">Lojista escolhe sua própria regra de R$ para Pts</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gray-200/60 shadow-xs">
              <Coins size={28} className="mx-auto text-emerald-600 mb-2" />
              <h4 className="text-sm font-bold text-gray-900">Direito Adquirido</h4>
              <p className="text-[11px] text-gray-500 mt-1">O saldo do consumidor é vitalício e garantido</p>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode={authMode}
      />
    </div>
  );
}
