import { Download, Printer, Share2, RefreshCw } from "lucide-react";
import { P, PD, PL, G, GL, T1, T2, BD } from "@/constants/theme";
import { QRCodeSVG } from "@/components/common";

export function QRStoreScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "8px 16px 18px", flexShrink: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>QR Code da loja</h2>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        <p style={{ fontSize: 14, color: T2, textAlign: "center", margin: "0 0 18px", lineHeight: 1.5 }}>Peça para o cliente escanear no caixa para acumular ou resgatar pontos.</p>
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", border: `1px solid ${BD}`, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", marginBottom: 14 }}>
          <QRCodeSVG size={190} color={P} />
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: T1, margin: "0 0 2px" }}>Padaria Real</p>
            <p style={{ fontSize: 13, color: T2, margin: 0 }}>Centro – Padaria</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { Icon: Download, label: "Baixar QR Code", c: G, bg: GL },
            { Icon: Printer, label: "Imprimir QR Code", c: P, bg: PL },
            { Icon: Share2, label: "Compartilhar", c: "#1E40AF", bg: "#DBEAFE" },
            { Icon: RefreshCw, label: "Gerar novo", c: "#B45309", bg: "#FEF3C7" },
          ].map((a) => (
            <button key={a.label} style={{ background: "#fff", borderRadius: 12, padding: "14px 10px", border: `1px solid ${BD}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, background: a.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <a.Icon size={20} color={a.c} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: T1, textAlign: "center" }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
