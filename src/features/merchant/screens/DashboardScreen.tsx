import { ShoppingBag, ChevronDown, Users, Star, Gift, Megaphone } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { P, PD, G } from "@/constants/theme";
import { chartData } from "@/data/mocks";
import { useApp } from "@/context/AppContext";
import type { MerchantScreen } from "@/types/navigation";

interface DashboardScreenProps {
  go: (s: MerchantScreen) => void;
}

export function DashboardScreen({ go }: DashboardScreenProps) {
  const { merchantStoreName } = useApp();

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F5FC]">
      {/* Header */}
      <div
        className="px-4 pt-1 pb-5 text-white"
        style={{ background: `linear-gradient(135deg,${P},${PD})` }}
      >
        <div className="flex justify-between items-center mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] bg-white/20 rounded-lg flex items-center justify-center shadow-xs">
              <ShoppingBag size={16} color="#fff" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">cash me</span>
          </div>
          <button className="bg-white/20 hover:bg-white/30 border-none rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer text-white transition-colors">
            <span className="text-xs font-medium">{merchantStoreName}</span>
            <ChevronDown size={13} color="#fff" />
          </button>
        </div>
        <h1 className="text-xl font-bold text-white mt-1 mb-0.5">Dashboard</h1>
        <p className="text-xs text-white/70 m-0">Resumo do dia · 23/07/2026</p>
      </div>

      <div className="px-4">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5 -mt-2.5 mb-3.5">
          {[
            { label: "Vendas", val: "R$ 1.850", sfx: ",00", trend: null },
            { label: "Pts gerados", val: "1.250", sfx: " pts", trend: null },
            { label: "Clientes fidel.", val: "243", sfx: "", trend: "+10%" },
            { label: "Resgates", val: "320", sfx: " pts", trend: "+12%" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-3.5 shadow-xs border border-gray-100 hover:shadow-sm transition-shadow"
            >
              <p className="text-[11px] text-gray-500 mb-1">{s.label}</p>
              <p className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                {s.val}
                <span className="text-xs font-medium text-gray-500">{s.sfx}</span>
              </p>
              {s.trend && (
                <span className="inline-block text-[11px] bg-emerald-100 text-emerald-800 rounded-md px-1.5 py-0.5 font-semibold">
                  {s.trend}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-4 pt-4 pb-2.5 border border-gray-100 shadow-xs mb-3.5">
          <h2 className="text-sm font-semibold text-gray-900 mb-2.5 pl-1.5">
            Evolução de pontos gerados
          </h2>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="agrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={P} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={P} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: "#666666" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "#666666" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
              />
              <Area type="monotone" dataKey="v" stroke={P} strokeWidth={2.5} fill="url(#agrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs mb-4">
          <div className="flex justify-between items-center mb-3.5">
            <h2 className="text-sm font-semibold text-gray-900 m-0">Atividades recentes</h2>
            <button
              onClick={() => go("campaigns")}
              className="text-xs text-[#6F35B5] bg-transparent border-none cursor-pointer font-semibold hover:underline"
            >
              Campanhas
            </button>
          </div>
          <div className="space-y-3">
            {[
              {
                Icon: Users,
                label: "Novo cliente cadastrado",
                sub: "Rafael Lima · agora há pouco",
                c: "#1E40AF",
                bg: "#DBEAFE",
              },
              {
                Icon: Star,
                label: "Pontos acumulados",
                sub: "Leandro Silva · +50 pts",
                c: G,
                bg: "#E7F5ED",
              },
              {
                Icon: Gift,
                label: "Oferta resgatada",
                sub: "Maria Oliveira · -300 pts",
                c: "#B45309",
                bg: "#FEF3C7",
              },
              {
                Icon: Megaphone,
                label: "Campanha criada",
                sub: "Aniversário da Padaria · ativa",
                c: P,
                bg: "#EEE7F7",
              },
            ].map((a) => (
              <div key={a.label} className="flex gap-3 items-center">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                  style={{ background: a.bg }}
                >
                  <a.Icon size={19} color={a.c} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 mb-0.5">{a.label}</p>
                  <p className="text-xs text-gray-500 m-0">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

