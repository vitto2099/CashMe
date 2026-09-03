import { Plus, Star } from "lucide-react";
import { P, PD, PL, G, GL, T1, T2, BD } from "@/constants/theme";
import type { MerchantScreen } from "@/types/navigation";

interface CampaignsScreenProps {
  go: (s: MerchantScreen) => void;
}

export function CampaignsScreen({ go }: CampaignsScreenProps) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "8px 16px 18px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Campanhas</h2>
          <button onClick={() => go("new-campaign")} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Plus size={20} color="#fff" />
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        {[
          { name: "Campanha Padrão", period: "Permanente", rule: "1 pt / R$ 1,00", active: true },
          { name: "Aniversário da Padaria", period: "01/07 – 31/07/2026", rule: "2 pts / R$ 1,00", active: false },
          { name: "Promoção de Inverno", period: "01/06 – 30/06/2026", rule: "1 pt / R$ 1,00", active: false },
        ].map((c) => (
          <div key={c.name} style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: T1, margin: "0 0 3px" }}>{c.name}</p>
                <p style={{ fontSize: 12, color: T2, margin: 0 }}>{c.period}</p>
              </div>
              <span style={{ background: c.active ? GL : "#F3F4F6", color: c.active ? G : T2, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{c.active ? "Ativa" : "Inativa"}</span>
            </div>
            <div style={{ background: PL, borderRadius: 8, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
              <Star size={11} color={P} />
              <span style={{ fontSize: 12, color: P, fontWeight: 500 }}>{c.rule}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => go("scoring-rules")} style={{ flex: 1, padding: "8px", background: PL, borderRadius: 8, border: "none", color: P, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Regras</button>
              <button onClick={() => go("points-conversion")} style={{ flex: 1, padding: "8px", background: PL, borderRadius: 8, border: "none", color: P, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Conversão</button>
              <button style={{ flex: 1, padding: "8px", background: P, borderRadius: 8, border: "none", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Editar</button>
            </div>
          </div>
        ))}
        <button onClick={() => go("new-campaign")} style={{ width: "100%", padding: "14px", background: P, borderRadius: 12, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Plus size={18} color="#fff" /> Nova campanha
        </button>
      </div>
    </div>
  );
}
