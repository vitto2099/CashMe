import { useState } from "react";
import {
  LayoutDashboard,
  Megaphone,
  QrCode,
  Users,
  Layers,
  Settings,
  Sliders,
  Percent,
} from "lucide-react";
import { P } from "@/constants/theme";
import type { MerchantScreen } from "@/types/navigation";
import {
  DashboardScreen,
  CampaignsScreen,
  NewCampaignScreen,
  ScoringRulesScreen,
  PointsConversionScreen,
  QRStoreScreen,
  CustomersScreen,
  CustomerDetailScreen,
  VitrineScreen,
  NewOfferScreen,
  SettingsScreen,
} from "./screens";

const mTabs = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "campaigns", label: "Campanhas", Icon: Megaphone },
  { id: "scoring-rules", label: "Regras de Pontos", Icon: Sliders },
  { id: "qr-store", label: "QR no Balcão", Icon: QrCode },
  { id: "customers", label: "Clientes", Icon: Users },
  { id: "vitrine", label: "Vitrine", Icon: Layers },
  { id: "settings", label: "Configurações", Icon: Settings },
];

export function MerchantApp() {
  const [screen, setScreen] = useState<MerchantScreen>("dashboard");

  function changeTab(t: string) {
    setScreen(t as MerchantScreen);
  }

  function go(s: MerchantScreen) {
    setScreen(s);
  }

  function back() {
    setScreen("dashboard");
  }

  return (
    <div className="flex flex-col flex-1 w-full bg-[#F8F7FB] min-h-full">
      {/* Top Secondary Navigation for Merchant Web App */}
      <div className="bg-white border-b border-purple-100 sticky top-16 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2.5 no-scrollbar">
            {mTabs.map((item) => {
              const isActive = screen === item.id;
              const Icon = item.Icon;
              return (
                <button
                  key={item.id}
                  onClick={() => changeTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-50 text-purple-900 shadow-xs border border-purple-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-purple-700" : "text-gray-400"} />
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
          {screen === "dashboard" && <DashboardScreen go={go} />}
          {screen === "campaigns" && <CampaignsScreen go={go} />}
          {screen === "new-campaign" && <NewCampaignScreen back={back} />}
          {screen === "scoring-rules" && <ScoringRulesScreen back={back} />}
          {screen === "points-conversion" && <PointsConversionScreen back={back} />}
          {screen === "qr-store" && <QRStoreScreen />}
          {screen === "customers" && <CustomersScreen go={go} />}
          {screen === "customer-detail" && <CustomerDetailScreen back={back} />}
          {screen === "vitrine" && <VitrineScreen go={go} />}
          {screen === "new-offer" && <NewOfferScreen back={back} />}
          {screen === "settings" && <SettingsScreen back={back} />}
        </div>
      </main>
    </div>
  );
}
