import { useState } from "react";
import { Home, Store, Wallet, Tag, QrCode, User } from "lucide-react";
import { G, BG } from "@/constants/theme";
import type { ConsumerScreen } from "@/types/navigation";
import {
  HomeScreen,
  CategoriesScreen,
  StoresScreen,
  StoreDetailScreen,
  OffersScreen,
  OfferDetailScreen,
  WalletScreen,
  QRCodeScreen,
  ProfileScreen,
} from "./screens";

const cTabs = [
  { id: "home", label: "Início", Icon: Home },
  { id: "stores", label: "Lojas", Icon: Store },
  { id: "offers", label: "Ofertas", Icon: Tag },
  { id: "wallet", label: "Carteira", Icon: Wallet },
  { id: "qr-code", label: "Meu QR", Icon: QrCode },
  { id: "profile", label: "Perfil", Icon: User },
];

export function ConsumerApp() {
  const [tab, setTab] = useState<string>("home");
  const [screen, setScreen] = useState<ConsumerScreen>("home");

  function changeTab(t: string) {
    setTab(t);
    setScreen(t as ConsumerScreen);
  }

  function go(s: ConsumerScreen) {
    setScreen(s);
  }

  function back() {
    setScreen(tab as ConsumerScreen);
  }

  return (
    <div className="flex flex-col flex-1 w-full bg-[#F8F9FA] min-h-full">
      {/* Top Secondary Navigation for Consumer Web App */}
      <div className="bg-white border-b border-gray-200/80 sticky top-16 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar">
            {cTabs.map((item) => {
              const isActive = (screen === item.id) || (tab === item.id && ["home", "stores", "offers", "wallet", "qr-code", "profile"].includes(screen));
              const Icon = item.Icon;
              return (
                <button
                  key={item.id}
                  onClick={() => changeTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 shadow-xs border border-emerald-200/80"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-emerald-700" : "text-gray-400"} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Screen Content Container (Fluid & Centered Web Width) */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          {screen === "home" && <HomeScreen go={go} />}
          {screen === "categories" && <CategoriesScreen back={back} go={go} />}
          {screen === "stores" && <StoresScreen back={back} go={go} />}
          {screen === "store-detail" && <StoreDetailScreen back={back} go={go} />}
          {screen === "offers" && <OffersScreen back={back} go={go} />}
          {screen === "offer-detail" && <OfferDetailScreen back={back} go={go} />}
          {screen === "wallet" && <WalletScreen back={back} />}
          {screen === "qr-code" && <QRCodeScreen back={back} />}
          {screen === "profile" && <ProfileScreen back={back} />}
        </div>
      </main>
    </div>
  );
}
