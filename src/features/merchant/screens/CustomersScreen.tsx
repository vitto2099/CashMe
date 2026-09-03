import { Search } from "lucide-react";
import { P, PD, G, GL, T1, T2, BD } from "@/constants/theme";
import { customers } from "@/data/mocks";
import { UserAvatar } from "@/components/common";
import type { MerchantScreen } from "@/types/navigation";

interface CustomersScreenProps {
  go: (s: MerchantScreen) => void;
}

export function CustomersScreen({ go }: CustomersScreenProps) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "8px 16px 18px", flexShrink: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Clientes fidelizados</h2>
      </div>
      <div style={{ margin: "12px 16px", background: "#F3F4F6", borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 10, flexShrink: 0 }}>
        <Search size={16} color={T2} />
        <span style={{ fontSize: 14, color: "#9CA3AF" }}>Buscar clientes</span>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 16px 16px", background: "#F8F5FC" }}>
        {customers.map((c) => (
          <div key={c.id} onClick={() => go("customer-detail")} style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, display: "flex", gap: 12, alignItems: "center", cursor: "pointer", border: `1px solid ${BD}` }}>
            <UserAvatar name={c.name} size={46} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: 0 }}>{c.name}</p>
                <span style={{ fontSize: 16, fontWeight: 700, color: P }}>{c.pts}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 11, color: T2, margin: 0 }}>Última compra: {c.last}</p>
                <span style={{ fontSize: 10, background: c.active ? GL : "#F3F4F6", color: c.active ? G : T2, borderRadius: 20, padding: "2px 8px", fontWeight: 600 }}>{c.active ? "Ativo" : "Inativo"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
