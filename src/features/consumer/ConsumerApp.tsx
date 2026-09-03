import { useState } from "react";
import { Home, Store, Wallet, Tag, QrCode, User } from "lucide-react";
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
  { id: "stores", label: "Lojas Parceiras", Icon: Store },
  { id: "offers", label: "Ofertas & Cupons", Icon: Tag },
  { id: "wallet", label: "Minha Carteira", Icon: Wallet },
  { id: "qr-code", label: "NFC-e & QR Code", Icon: QrCode },
  { id: "profile", label: "Meu Perfil", Icon: User },
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
    <div className="flex flex-col flex-1 w-full bg-gray-50/70 min-h-full">
      {/* Sub-Header Navigation Tabs (Responsive & Sticky) */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto py-3 no-scrollbar">
            {cTabs.map((item) => {
              const isActive =
                screen === item.id ||
                (tab === item.id &&
                  ["home", "stores", "offers", "wallet", "qr-code", "profile"].includes(screen));
              const Icon = item.Icon;
              return (
                <button
                  key={item.id}
                  onClick={() => changeTab(item.id)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area (Fluid for Desktop & Mobile) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full">
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
