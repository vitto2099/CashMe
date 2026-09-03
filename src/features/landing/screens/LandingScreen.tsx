import { useState } from "react";
import { ShoppingBag, User, Store, ChevronRight, LogIn, Lock, Mail, X } from "lucide-react";
import { G, GD, P, PD, T1, T2, BG, BD } from "@/constants/theme";
import type { AppMode } from "@/types/navigation";
import { useAuth } from "@/context/AuthContext";

interface LandingScreenProps {
  onSelect: (m: AppMode) => void;
}

export function LandingScreen({ onSelect }: LandingScreenProps) {
  const { user, isAuthenticated, login, signup, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (authMode === "login") {
      const ok = await login({ email, password });
      if (ok) {
        setShowAuthModal(false);
        onSelect("consumer");
      }
    } else {
      const ok = await signup({
        fullName,
        email,
        password,
        passwordConfirmation: password,
      });
      if (ok) {
        setShowAuthModal(false);
        onSelect("consumer");
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 24, background: BG, position: "relative" }}>
      {/* Indicador de Usuário Conectado */}
      {isAuthenticated && user && (
        <div style={{ background: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
              {user.initials || "U"}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#166534" }}>{user.fullName || "Usuário"}</p>
              <p style={{ margin: 0, fontSize: 11, color: "#15803D" }}>Sessão ativa na API</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            style={{ border: "none", background: "none", color: "#B91C1C", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
          >
            Sair
          </button>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 80, height: 80, background: `linear-gradient(135deg,${G},${GD})`, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: `0 10px 28px rgba(0,141,76,0.35)` }}>
          <ShoppingBag size={40} color="#fff" />
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: T1, margin: "0 0 6px", letterSpacing: -1.5 }}>cash me</h1>
        <p style={{ fontSize: 15, color: T2, margin: "0 0 32px", textAlign: "center", lineHeight: 1.5 }}>Plataforma de fidelidade para<br />estabelecimentos locais</p>

        <p style={{ fontSize: 12, fontWeight: 700, color: T2, textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 16px" }}>Como você quer entrar?</p>

        <button onClick={() => onSelect("consumer")} style={{ width: "100%", padding: "18px 20px", background: `linear-gradient(135deg,${G},${GD})`, borderRadius: 18, border: "none", marginBottom: 12, display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: `0 6px 20px rgba(0,141,76,0.28)` }}>
          <div style={{ width: 50, height: 50, background: "rgba(255,255,255,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={24} color="#fff" />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>Sou consumidor</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>Acumule e resgate pontos</p>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.7)" style={{ marginLeft: "auto" }} />
        </button>

        <button onClick={() => onSelect("merchant")} style={{ width: "100%", padding: "18px 20px", background: `linear-gradient(135deg,${P},${PD})`, borderRadius: 18, border: "none", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: `0 6px 20px rgba(111,53,181,0.28)`, marginBottom: 14 }}>
          <div style={{ width: 50, height: 50, background: "rgba(255,255,255,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Store size={24} color="#fff" />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>Sou comerciante</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>Gerencie campanhas e clientes</p>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.7)" style={{ marginLeft: "auto" }} />
        </button>

        {!isAuthenticated && (
          <button
            onClick={() => setShowAuthModal(true)}
            style={{ width: "100%", padding: "12px", background: "#fff", borderRadius: 14, border: `1px solid ${BD}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", color: T1, fontWeight: 600, fontSize: 14 }}
          >
            <LogIn size={16} color={G} />
            Entrar ou Criar Conta na API
          </button>
        )}
      </div>

      <p style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", margin: 0 }}>Cash Me © 2026 · Projeto Unificado</p>

      {/* Modal de Autenticação */}
      {showAuthModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 350, padding: 24, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: T1 }}>
                {authMode === "login" ? "Entrar na Conta" : "Criar Conta na API"}
              </h3>
              <button onClick={() => setShowAuthModal(false)} style={{ border: "none", background: "none", cursor: "pointer" }}>
                <X size={20} color="#9CA3AF" />
              </button>
            </div>

            <div style={{ display: "flex", background: "#F3F4F6", padding: 4, borderRadius: 10, marginBottom: 16 }}>
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                style={{ flex: 1, padding: "8px", border: "none", borderRadius: 8, background: authMode === "login" ? "#fff" : "transparent", fontWeight: 600, fontSize: 13, color: authMode === "login" ? G : T2, cursor: "pointer" }}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                style={{ flex: 1, padding: "8px", border: "none", borderRadius: 8, background: authMode === "signup" ? "#fff" : "transparent", fontWeight: 600, fontSize: 13, color: authMode === "signup" ? G : T2, cursor: "pointer" }}
              >
                Cadastro
              </button>
            </div>

            <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {authMode === "signup" && (
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T2, display: "block", marginBottom: 4 }}>Nome Completo</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${BD}`, borderRadius: 10, padding: "10px 12px" }}>
                    <User size={16} color="#9CA3AF" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Ana Silva"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ border: "none", outline: "none", flex: 1, fontSize: 14 }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T2, display: "block", marginBottom: 4 }}>E-mail</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${BD}`, borderRadius: 10, padding: "10px 12px" }}>
                  <Mail size={16} color="#9CA3AF" />
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ border: "none", outline: "none", flex: 1, fontSize: 14 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T2, display: "block", marginBottom: 4 }}>Senha</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${BD}`, borderRadius: 10, padding: "10px 12px" }}>
                  <Lock size={16} color="#9CA3AF" />
                  <input
                    type="password"
                    required
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ border: "none", outline: "none", flex: 1, fontSize: 14 }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ marginTop: 8, padding: "12px", background: `linear-gradient(135deg,${G},${GD})`, color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Processando..." : authMode === "login" ? "Entrar" : "Cadastrar na API"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

