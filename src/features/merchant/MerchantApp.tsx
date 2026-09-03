import { useState } from "react";
import { LayoutDashboard, Megaphone, Package, Users, Layers } from "lucide-react";
import { P } from "@/constants/theme";
import { StatusBar, BottomNav, type NavTabItem } from "@/components/common";
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

const mTabs: NavTabItem[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "campaigns", label: "Campanhas", Icon: Megaphone },
  { id: "qr", label: "QR Code", Icon: Package },
  { id: "customers", label: "Clientes", Icon: Users },
  { id: "more", label: "Mais", Icon: Layers },
];

export function MerchantApp() {
  const [tab, setTab] = useState<string>("dashboard");
  const [screen, setScreen] = useState<MerchantScreen>("dashboard");

  function changeTab(t: string) {
    setTab(t);
    if (t === "qr") setScreen("qr-store");
    else if (t === "more") setScreen("vitrine");
    else setScreen(t as MerchantScreen);
  }

  function go(s: MerchantScreen) {
    setScreen(s);
  }

  function back() {
    if (tab === "qr") setScreen("qr-store");
    else if (tab === "more") setScreen("vitrine");
    else setScreen(tab as MerchantScreen);
  }

  const navScreens = new Set<MerchantScreen>(["dashboard", "campaigns", "qr-store", "customers", "vitrine"]);
  const activeTab = screen === "qr-store" ? "qr" : screen === "vitrine" ? "more" : navScreens.has(screen) ? screen : tab;
  const purpleHeader = navScreens.has(screen);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ background: purpleHeader ? P : "#F8F5FC" }}>
        <StatusBar light={!purpleHeader} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#F8F5FC" }}>
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
      {navScreens.has(screen) && <BottomNav tabs={mTabs} active={activeTab} onChange={changeTab} color={P} />}
    </div>
  );
}
