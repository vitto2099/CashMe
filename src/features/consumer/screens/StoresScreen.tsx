import { useState } from "react";
import { Search, MapPin, Heart, Star } from "lucide-react";
import { G, GD, GL, GVL, GOLD, T1, T2, BG, BD } from "@/constants/theme";
import { stores } from "@/data/mocks";
import { BackBtn, StoreIcon } from "@/components/common";
import type { ConsumerScreen } from "@/types/navigation";

interface StoresScreenProps {
  back: () => void;
  go: (s: ConsumerScreen) => void;
}

export function StoresScreen({ back, go }: StoresScreenProps) {
  const [filter, setFilter] = useState("Todas");
  const filters = ["Todas", "Padaria", "Farmácia", "Moda", "Pet Shop"];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Lojas</h2>
        </div>
        <div style={{ margin: "0 16px 10px", background: "#F3F4F6", borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 10 }}>
          <Search size={16} color={T2} />
          <span style={{ fontSize: 14, color: "#9CA3AF" }}>Buscar lojas</span>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", overflowX: "auto" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                background: filter === f ? GL : "#fff",
                border: `1px solid ${filter === f ? G : BD}`,
                color: filter === f ? G : T2,
                fontSize: 13,
                fontWeight: filter === f ? 600 : 400,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 16px 16px", background: BG }}>
        {stores.map((s) => (
          <div
            key={s.id}
            onClick={() => go("store-detail")}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 14,
              marginBottom: 10,
              display: "flex",
              gap: 12,
              alignItems: "center",
              cursor: "pointer",
              border: `1px solid ${BD}`,
            }}
          >
            <StoreIcon name={s.name} color={s.color} bg={s.bg} size={52} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: T1, margin: "0 0 3px" }}>{s.name}</p>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: T2 }}>{s.cat}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: BD, display: "inline-block" }} />
                    <MapPin size={10} color={T2} />
                    <span style={{ fontSize: 11, color: T2 }}>{s.loc}</span>
                  </div>
                </div>
                <button
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: GVL,
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Heart size={15} color={G} />
                </button>
              </div>
              <div style={{ marginTop: 8, background: GVL, borderRadius: 8, padding: "4px 8px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Star size={11} color={GOLD} fill={GOLD} />
                <span style={{ fontSize: 11, color: GD, fontWeight: 500 }}>{s.rule}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
