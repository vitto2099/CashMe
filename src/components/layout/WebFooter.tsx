import { ShoppingBag, ShieldCheck, QrCode, Sparkles } from "lucide-react";
import { G, GD } from "@/constants/theme";

export function WebFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Coluna 1: Marca & Missão */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs"
                style={{ background: `linear-gradient(135deg, ${G}, ${GD})` }}
              >
                <ShoppingBag size={14} className="text-white" />
              </div>
              <span className="text-lg font-black text-gray-900 tracking-tight">
                cash<span className="text-emerald-600">me</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Plataforma de fidelidade e cashback para o comércio local através do escaneamento de notas fiscais de consumidor (NFC-e).
            </p>
          </div>

          {/* Coluna 2: Consumidores */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Para Consumidores</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>Acumule pontos em compras</li>
              <li>Resgate cupons e prêmios</li>
              <li>Carteira digital integrada</li>
              <li>Leitura de QR Code instantânea</li>
            </ul>
          </div>

          {/* Coluna 3: Lojistas */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Para Lojistas</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>Painel de métricas e vendas</li>
              <li>Fator de pontuação customizável</li>
              <li>Campanhas promocionais ativas</li>
              <li>Base de clientes fidelizados</li>
            </ul>
          </div>

          {/* Coluna 4: Conformidade & SEFAZ */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Tecnologia & SEFAZ</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200/60 mb-2">
              <ShieldCheck size={16} />
              <span>NFC-e homologada (SC & PR)</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Validação criptografada com chave de 44 dígitos anti-fraude.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Cash Me Tecnologia S.A. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Privacidade (LGPD)</span>
            <span>Termos de Uso</span>
            <span>API Docs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
