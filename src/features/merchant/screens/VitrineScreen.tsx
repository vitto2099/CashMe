import { useState } from "react";
import { Tag, Plus } from "lucide-react";
import { P, PD, PL, T1, T2, BD } from "@/constants/theme";
import { merchantOffers } from "@/data/mocks";
import { SwitchToggle } from "@/components/common";
import type { MerchantScreen } from "@/types/navigation";

interface VitrineScreenProps {
  go: (s: MerchantScreen) => void;
}

export function VitrineScreen({ go }: VitrineScreenProps) {
  const [items, setItems] = useState(merchantOffers.map((o) => ({ ...o })));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "8px 16px 18px", flexShrink: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>Vitrine da loja</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", margin: 0 }}>Mostre suas ofertas para todos os clientes.</p>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        {items.map((o, i) => (
          <div key={o.id} style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${BD}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 52, height: 52, background: PL, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Tag size={22} color={P} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: T1, margin: 0 }}>{o.name}</p>
                  <SwitchToggle on={o.active} onChange={() => setItems(items.map((x, j) => (j === i ? { ...x, active: !x.active } : x)))} />
                </div>
                <p style={{ fontSize: 13, color: T2, margin: "0 0 3px" }}>{o.desc}</p>
                <p style={{ fontSize: 12, color: T2, margin: 0 }}>Válido até {o.valid}</p>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => go("new-offer")} style={{ width: "100%", padding: "14px", background: P, borderRadius: 12, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Plus size={18} color="#fff" /> Nova oferta
        </button>
      </div>
    </div>
  );
}
