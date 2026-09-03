import { useState } from "react";
import { X, Mail, Lock, User, LogIn, ArrowRight } from "lucide-react";
import { G, GD, T1, T2, BD } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "login") {
      const ok = await login({ email, password });
      if (ok) onClose();
    } else {
      const ok = await signup({
        fullName,
        email,
        password,
        passwordConfirmation: password,
      });
      if (ok) onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative border border-gray-100 transform transition-all scale-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-md shadow-emerald-500/20" style={{ background: `linear-gradient(135deg, ${G}, ${GD})` }}>
            <LogIn size={22} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {mode === "login" ? "Acesse sua conta" : "Criar nova conta"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Conectado diretamente à API oficial do Cash Me
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === "login" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === "signup" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Nome Completo
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/10 transition-all">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silva"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-sm outline-hidden text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              E-mail
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/10 transition-all">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm outline-hidden text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Senha
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/10 transition-all">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                required
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm outline-hidden text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 mt-2"
            style={{ background: `linear-gradient(135deg, ${G}, ${GD})` }}
          >
            {loading ? "Aguarde..." : mode === "login" ? "Entrar na Conta" : "Criar Minha Conta"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}
