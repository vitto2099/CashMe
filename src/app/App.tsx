import { useState } from "react";
import { StatusBar } from "@/components/common";
import { LandingScreen } from "@/features/landing";
import { ConsumerApp } from "@/features/consumer";
import { MerchantApp } from "@/features/merchant";
import type { AppMode } from "@/types/navigation";

export default function App() {
  const [mode, setMode] = useState<AppMode>("landing");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-0 sm:p-5 sm:pb-20 font-sans">
      {/* Phone frame (responsivo: tela cheia no mobile, frame simulado no desktop) */}
      <div className="w-full sm:w-[390px] h-screen sm:h-[844px] sm:rounded-[50px] overflow-hidden bg-[#F7F8FA] relative flex flex-col sm:shadow-[0_50px_100px_rgba(0,0,0,0.6),0_0_0_1.5px_rgba(255,255,255,0.12),inset_0_0_0_2px_rgba(255,255,255,0.06)]">
        {/* Dynamic island notch (apenas no frame desktop) */}
        <div className="hidden sm:block absolute top-[13px] left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-[20px] z-50 pointer-events-none" />

        {/* Screen Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {mode === "landing" && (
            <>
              <div className="bg-[#F7F8FA]">
                <StatusBar light />
              </div>
              <LandingScreen onSelect={setMode} />
            </>
          )}
          {mode === "consumer" && <ConsumerApp />}
          {mode === "merchant" && <MerchantApp />}
        </div>

        {/* Home indicator (apenas no frame desktop) */}
        <div className="hidden sm:block absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black/20 rounded-[3px] pointer-events-none" />
      </div>

      {/* Mode switcher floating bar */}
      {mode !== "landing" && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-50">
          <button
            onClick={() => setMode("landing")}
            className="px-4 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-semibold cursor-pointer transition-all shadow-lg active:scale-95"
          >
            ← Início
          </button>
          <button
            onClick={() => setMode(mode === "consumer" ? "merchant" : "consumer")}
            className={`px-4 py-2.5 backdrop-blur-md border-none rounded-full text-white text-xs font-semibold cursor-pointer transition-all shadow-lg active:scale-95 ${
              mode === "consumer"
                ? "bg-[#6F35B5]/90 hover:bg-[#6F35B5]"
                : "bg-[#008D4C]/90 hover:bg-[#008D4C]"
            }`}
          >
            {mode === "consumer" ? "🏪 Modo Comerciante" : "👤 Modo Consumidor"}
          </button>
        </div>
      )}
    </div>
  );
}

