import { useState } from "react";
import { ShoppingBag, Star, User, Store, LogOut, LogIn, ChevronDown } from "lucide-react";
import { G, GD, P, PD, GOLD } from "@/constants/theme";
import type { AppMode } from "@/types/navigation";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { AuthModal } from "./AuthModal";

interface WebNavbarProps {
  mode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

export function WebNavbar({ mode, onSelectMode }: WebNavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { userPoints, merchantStoreName } = useApp();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const displayName = user?.fullName || "Leandro Bona";
  const displayEmail = user?.email || "leandro.bona@email.com";
  const displayInitials = user?.initials || displayName.slice(0, 2).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectMode("landing")}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20"
              style={{ background: `linear-gradient(135deg, ${G}, ${GD})` }}
            >
              <ShoppingBag size={20} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-gray-900 block leading-tight">
                cash<span className="text-emerald-600">me</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block -mt-0.5">
                Plataforma de Fidelidade
              </span>
            </div>
          </div>

          {/* Center: Mode Switcher */}
          <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-full border border-gray-200/60 shadow-inner">
            <button
              onClick={() => onSelectMode("consumer")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mode === "consumer"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <User size={14} />
              Área do Consumidor
            </button>
            <button
              onClick={() => onSelectMode("merchant")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mode === "merchant"
                  ? "bg-purple-700 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Store size={14} />
              Área do Comerciante
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Consumer Points Pill */}
            {mode === "consumer" && (
              <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-full shadow-xs">
                <Star size={14} color={GOLD} fill={GOLD} />
                <span className="text-xs font-bold text-emerald-800">
                  {userPoints.toLocaleString("pt-BR")} pts
                </span>
              </div>
            )}

            {/* Merchant Store Badge */}
            {mode === "merchant" && (
              <div className="hidden sm:flex items-center gap-1.5 bg-purple-50 border border-purple-200/80 px-3 py-1.5 rounded-full shadow-xs">
                <Store size={14} className="text-purple-700" />
                <span className="text-xs font-bold text-purple-900 truncate max-w-[140px]">
                  {merchantStoreName}
                </span>
              </div>
            )}

            {/* User Profile / Auth Action */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {displayInitials}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-gray-900 leading-none">{displayName}</p>
                    <p className="text-[10px] text-gray-400 leading-tight truncate max-w-[120px]">{displayEmail}</p>
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900">{displayName}</p>
                      <p className="text-[11px] text-gray-500 truncate">{displayEmail}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded-full">
                        API Conectada
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onSelectMode("consumer");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <User size={14} />
                      Meu Perfil & Carteira
                    </button>
                    <button
                      onClick={() => {
                        onSelectMode("merchant");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Store size={14} />
                      Painel do Comerciante
                    </button>
                    <div className="my-1 border-t border-gray-100" />
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                    >
                      <LogOut size={14} />
                      Sair da Conta
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <LogIn size={14} />
                Entrar / Cadastrar
              </button>
            )}
          </div>
        </div>

        {/* Mobile Switcher Bar */}
        <div className="flex md:hidden border-t border-gray-100 px-4 py-2 bg-gray-50/80 justify-around">
          <button
            onClick={() => onSelectMode("consumer")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
              mode === "consumer" ? "bg-emerald-600 text-white" : "text-gray-600"
            }`}
          >
            <User size={12} /> Consumidor
          </button>
          <button
            onClick={() => onSelectMode("merchant")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
              mode === "merchant" ? "bg-purple-700 text-white" : "text-gray-600"
            }`}
          >
            <Store size={12} /> Comerciante
          </button>
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
