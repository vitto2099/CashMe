import { useState } from "react";
import { Star, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { G, GD, GL, GVL, GOLD, ERR, T1, T2, BG, BD } from "@/constants/theme";
import { stores, history } from "@/data/mocks";
import { BackBtn, SegControl, StoreIcon } from "@/components/common";

interface WalletScreenProps {
  back: () => void;
}

export function WalletScreen({ back }: WalletScreenProps) {
  const [tab, setTab] = useState("stores");

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0, paddingBottom: 8 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Minha carteira</h2>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", background: BG }}>
        <div style={{ margin: "0 16px 16px", borderRadius: 18, background: `linear-gradient(135deg,${G},${GD})`, padding: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -24, top: -24, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: "0 0 4px" }}>Seus pontos totais</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1 }}>1.250</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>pts</span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", margin: "4px 0 0" }}>Em todas as lojas</p>
            </div>
            <Star size={24} color={GOLD} fill={GOLD} />
          </div>
        </div>
        <div style={{ padding: "0 16px 12px" }}>
          <SegControl tabs={[{ id: "stores", label: "Por loja" }, { id: "history", label: "Histórico" }]} active={tab} onChange={setTab} />
        </div>
        <div style={{ padding: "0 16px 16px" }}>
          {tab === "stores" ? (
            <>
              {stores.slice(0, 4).map((s) => (
                <div key={s.id} style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${BD}` }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                    <StoreIcon name={s.name} color={s.color} bg={s.bg} size={44} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 2px" }}>{s.name}</p>
                      <p style={{ fontSize: 12, color: T2, margin: 0 }}>{s.cat}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 20, fontWeight: 700, color: G, margin: 0 }}>{s.pts}</p>
                      <p style={{ fontSize: 11, color: T2, margin: 0 }}>pts</p>
                    </div>
                  </div>
                  <div style={{ background: "#F3F4F6", borderRadius: 4, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${Math.min((s.pts / 1000) * 100, 100)}%`, height: "100%", background: G, borderRadius: 4 }} />
                  </div>
                  <p style={{ fontSize: 11, color: T2, margin: "4px 0 0" }}>{1000 - s.pts > 0 ? `Faltam ${1000 - s.pts} pts para o próximo resgate` : "Pronto para resgatar!"}</p>
                </div>
              ))}
              <div style={{ background: GVL, borderRadius: 12, padding: 14, border: `1px solid ${GL}` }}>
                <p style={{ fontSize: 13, color: GD, margin: 0, lineHeight: 1.5 }}>💡 Cada loja tem suas próprias regras de acúmulo e troca. Consulte a página da loja.</p>
              </div>
            </>
          ) : (
            history.map((h, i) => (
              <div key={h.id} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: h.type === "earn" ? GL : "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {h.type === "earn" ? <ArrowUpRight size={18} color={G} /> : <ArrowDownLeft size={18} color={ERR} />}
                  </div>
                  {i < history.length - 1 && <div style={{ width: 1, flex: 1, background: BD, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, background: "#fff", borderRadius: 12, padding: "10px 14px", border: `1px solid ${BD}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: "0 0 2px" }}>{h.store}</p>
                      <p style={{ fontSize: 11, color: T2, margin: "0 0 3px" }}>{h.date} · {h.value}</p>
                      <p style={{ fontSize: 11, color: T2, margin: 0 }}>Saldo: {h.balance}</p>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: h.type === "earn" ? G : ERR }}>{h.pts} pts</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
