import { useState } from "react";
import { Check } from "lucide-react";
import { G, GL, GVL, ERR, T1, T2, BG, BD } from "@/constants/theme";
import { stores } from "@/data/mocks";
import { BackBtn, SegControl, QRCodeSVG, StoreIcon } from "@/components/common";

interface QRCodeScreenProps {
  back: () => void;
}

export function QRCodeScreen({ back }: QRCodeScreenProps) {
  const [mode, setMode] = useState("earn");
  const [done, setDone] = useState(false);

  if (done)
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: BG, padding: 32 }}>
        <div style={{ width: 80, height: 80, background: GL, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Check size={40} color={G} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: T1, margin: "0 0 8px", textAlign: "center" }}>Resgate realizado com sucesso!</h2>
        <p style={{ fontSize: 14, color: T2, textAlign: "center", margin: "0 0 24px" }}>Código da operação: #CM20260723-001</p>
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, width: "100%", marginBottom: 24, border: `1px solid ${BD}` }}>
          {[
            ["Loja", "Padaria Real"],
            ["Pontos utilizados", "-500 pts"],
            ["Desconto gerado", "R$ 10,00"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: T2 }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: k === "Loja" ? T1 : k.includes("Pontos") ? ERR : G }}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setDone(false)} style={{ width: "100%", padding: "14px", background: G, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Concluir</button>
      </div>
    );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0, paddingBottom: 12 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Acumular ou Resgatar</h2>
        </div>
        <SegControl tabs={[{ id: "earn", label: "Acumular" }, { id: "redeem", label: "Resgatar" }]} active={mode} onChange={setMode} />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "12px 16px 16px", background: BG }}>
        <p style={{ fontSize: 14, color: T2, textAlign: "center", margin: "0 0 16px", lineHeight: 1.5 }}>
          {mode === "earn" ? "Apresente este QR Code no caixa para acumular pontos." : "Apresente este QR Code para resgatar sua oferta."}
        </p>
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", border: `1px solid ${BD}`, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", marginBottom: 14 }}>
          <QRCodeSVG size={190} color={T1} />
          {mode === "redeem" && (
            <div style={{ marginTop: 16, background: GVL, borderRadius: 10, padding: 12, width: "100%" }}>
              <p style={{ fontSize: 12, color: T2, margin: "0 0 3px" }}>Oferta selecionada</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: G, margin: "0 0 2px" }}>500 pts = R$ 10,00 de desconto</p>
              <p style={{ fontSize: 12, color: T2, margin: 0 }}>Padaria Real · Válido até 30/06/2026</p>
            </div>
          )}
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${BD}`, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <StoreIcon name="Padaria Real" color={stores[0].color} bg={stores[0].bg} size={40} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 2px" }}>Padaria Real</p>
              <p style={{ fontSize: 12, color: G, fontWeight: 600, margin: 0 }}>850 pts disponíveis</p>
            </div>
          </div>
          <button style={{ padding: "8px 12px", background: GVL, borderRadius: 10, border: `1px solid ${GL}`, color: G, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Trocar</button>
        </div>
        {mode === "redeem" && (
          <button onClick={() => setDone(true)} style={{ width: "100%", padding: "14px", background: G, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Confirmar resgate</button>
        )}
      </div>
    </div>
  );
}
