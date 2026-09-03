import { useState } from "react";
import { Star } from "lucide-react";
import { G, GOLD, T1, T2, BG } from "@/constants/theme";
import { offers } from "@/data/mocks";
import { BackBtn, SegControl } from "@/components/common";
import type { ConsumerScreen } from "@/types/navigation";

interface OffersScreenProps {
  back: () => void;
  go: (s: ConsumerScreen) => void;
}

export function OffersScreen({ back, go }: OffersScreenProps) {
  const [tab, setTab] = useState("all");

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0, paddingBottom: 12 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Ofertas para você</h2>
        </div>
        <SegControl tabs={[{ id: "all", label: "Todas" }, { id: "mine", label: "Minhas lojas" }, { id: "new", label: "Novas" }]} active={tab} onChange={setTab} />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "12px 16px 16px", background: BG }}>
        {offers.map((o) => (
          <div key={o.id} onClick={() => go("offer-detail")} style={{ borderRadius: 16, overflow: "hidden", marginBottom: 14, boxShadow: "0 4px 14px rgba(0,0,0,0.1)", cursor: "pointer" }}>
            <div style={{ height: 168, background: o.bg, position: "relative" }}>
              <img src={o.img} alt={o.store} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.38 }} />
              <div style={{ position: "absolute", top: 14, left: 14 }}>
                <span style={{ background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: T1 }}>{o.store}</span>
              </div>
              <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
                <p style={{ fontSize: 19, fontWeight: 700, color: "#fff", margin: "0 0 3px", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{o.pts} pontos = {o.discount} de desconto</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", margin: 0 }}>Válido até {o.valid}</p>
              </div>
            </div>
            <div style={{ background: "#fff", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <Star size={13} color={GOLD} fill={GOLD} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T1 }}>Você tem 1.250 pts</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); go("qr-code"); }} style={{ padding: "8px 16px", background: G, borderRadius: 20, border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Resgatar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
