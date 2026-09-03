import { useState } from "react";
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Store,
} from "lucide-react";
import { G, GD } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import { QRCodeSVG } from "@/components/common";
import { toast } from "sonner";

interface QRCodeScreenProps {
  back: () => void;
}

export function QRCodeScreen({ back }: QRCodeScreenProps) {
  const { addPoints } = useApp();
  const [activeTab, setActiveTab] = useState<"scan" | "show">("scan");
  const [accessKey, setAccessKey] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessed, setLastProcessed] = useState<{
    store: string;
    value: string;
    points: number;
    key: string;
  } | null>(null);

  // Simulação rápida com notas pré-configuradas de teste
  const sampleNotes = [
    {
      store: "Padaria Real",
      value: "R$ 48,50",
      amount: 48.5,
      points: 48,
      key: "42260700012345000189650010000123451000485001",
      uf: "SC",
    },
    {
      store: "Supermercado Paraná",
      value: "R$ 132,00",
      amount: 132.0,
      points: 132,
      key: "41260700098765000112650010000987651001320002",
      uf: "PR",
    },
    {
      store: "Farmácia Central",
      value: "R$ 75,20",
      amount: 75.2,
      points: 75,
      key: "42260700045678000134650010000456781000752003",
      uf: "SC",
    },
  ];

  const handleProcessNote = (note: (typeof sampleNotes)[0]) => {
    setIsProcessing(true);
    setTimeout(() => {
      addPoints(note.points, note.store);
      setLastProcessed({
        store: note.store,
        value: note.value,
        points: note.points,
        key: note.key,
      });
      setIsProcessing(false);
      toast.success(
        `NFC-e processada com sucesso! +${note.points} pontos creditados na sua carteira! 🎉`
      );
    }, 600);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = accessKey.replace(/\D/g, "");
    if (cleanKey.length !== 44) {
      toast.error("A chave de acesso da NFC-e deve conter exatamente 44 dígitos numéricos (RN02).");
      return;
    }
    const ufCode = cleanKey.substring(0, 2);
    if (ufCode !== "42" && ufCode !== "41") {
      toast.error("Apenas notas fiscais emitidas em Santa Catarina (42) ou Paraná (41) são aceitas no MVP (RN07).");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const generatedPoints = 95;
      addPoints(generatedPoints, "Padaria Real");
      setLastProcessed({
        store: "Padaria Real",
        value: "R$ 95,00",
        points: generatedPoints,
        key: cleanKey,
      });
      setAccessKey("");
      setIsProcessing(false);
      toast.success(`NFC-e validada na SEFAZ! +${generatedPoints} pontos creditados! 🚀`);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
            Módulo Fiscal NFC-e
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Leitura de Cupom & QR Code
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Pontue automaticamente através das suas notas fiscais ou apresente seu QR Code pessoal no balcão.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab("scan")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "scan"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Escanear NFC-e (Ganhar Pontos)
          </button>
          <button
            onClick={() => setActiveTab("show")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "show"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Meu QR Code (No Balcão)
          </button>
        </div>
      </div>

      {activeTab === "scan" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1 & 2: Simulador e Entrada Manual */}
          <div className="lg:col-span-2 space-y-6">
            {/* Box 1: Formulário de Entrada da Chave */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Digitar ou Colar Chave da NFC-e</h2>
                  <p className="text-xs text-gray-500">
                    Insira a chave de 44 dígitos impressa no rodapé do seu cupom fiscal
                  </p>
                </div>
              </div>

              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Chave de Acesso (44 dígitos)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Ex: 4226 0700 0123 4500 0189 6500 1000 0123 4510 0048 5001"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-mono tracking-wider rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 outline-hidden transition-all bg-gray-50/50"
                  />
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    Formatos aceitos: SEFAZ Santa Catarina (UF 42) e Paraná (UF 41).
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 cursor-pointer disabled:opacity-70 transition-all"
                  style={{ background: `linear-gradient(135deg, ${G}, ${GD})` }}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Validando junto à SEFAZ...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Processar Cupom e Acumular Pontos</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Box 2: Teste Rápido com 1 Clique */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs">
              <div className="mb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
                  Ambiente de Simulação Rápida
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-2">
                  Teste o fluxo com notas fiscais demonstrativas:
                </h3>
                <p className="text-xs text-gray-500">
                  Clique em qualquer cupom abaixo para simular a leitura do QR Code na SEFAZ instantaneamente:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sampleNotes.map((note) => (
                  <button
                    key={note.key}
                    onClick={() => handleProcessNote(note)}
                    disabled={isProcessing}
                    className="p-4 rounded-2xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-gray-400">{note.uf}</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                          +{note.points} pts
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-800">
                        {note.store}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">Valor da nota: {note.value}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                      <span>Simular leitura</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 3: Regras Fiscais & Último Resultado */}
          <div className="space-y-6">
            {/* Card de Último Processamento */}
            {lastProcessed ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl shadow-xs animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  <span>Última Nota Computada</span>
                </div>
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estabelecimento:</span>
                    <strong className="text-gray-900">{lastProcessed.store}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Valor da Compra:</span>
                    <strong className="text-gray-900">{lastProcessed.value}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pontos Creditados:</span>
                    <strong className="text-emerald-700 text-sm">+{lastProcessed.points} pts</strong>
                  </div>
                  <div className="pt-2 border-t border-emerald-200/60 text-[10px] text-gray-400 font-mono truncate">
                    Chave: {lastProcessed.key}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-3xl text-center">
                <QrCode size={36} className="mx-auto text-gray-400 mb-2" />
                <h4 className="text-sm font-bold text-gray-800">Nenhum cupom lido nesta sessão</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Seus pontos serão adicionados automaticamente ao saldo após a validação.
                </p>
              </div>
            )}

            {/* Checklist de Conformidade Fiscal */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                <span>Regras de Validação (SEFAZ)</span>
              </h3>
              <ul className="space-y-3 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>RN01 (Tempo de Emissão):</strong> Cupons devem ter sido emitidos há menos de 48 horas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>RN02 (Anti-Fraude):</strong> Chaves de 44 dígitos já computadas não geram nova pontuação.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>RN07 (Geografia):</strong> Compatível exclusivamente com notas do Paraná e Santa Catarina.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Aba 2: Meu QR Code no Balcão */
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/80 shadow-xs max-w-xl mx-auto text-center space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Seu QR Code de Fidelidade</h2>
            <p className="text-xs text-gray-500 mt-1">
              Apresente esta identificação no caixa caso o estabelecimento pontue diretamente pelo leitor do operador.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-200 inline-block shadow-inner">
            <QRCodeSVG size={220} color="#111827" />
            <p className="font-mono text-xs text-gray-500 mt-4 tracking-widest">
              ID: CM-2026-98421
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 max-w-md mx-auto">
            💡 <strong>Dica:</strong> Se você recebeu a NFC-e impressa, prefira escanear pelo formulário para pontuação imediata garantida pela SEFAZ.
          </div>
        </div>
      )}
    </div>
  );
}
