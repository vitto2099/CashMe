import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { transactionsService } from "@/services/transactionsService";

interface AppContextType {
  // Estado do Consumidor
  userName: string;
  userPoints: number;
  addPoints: (amount: number, storeName: string) => void;
  redeemPoints: (amount: number, storeName: string) => boolean;

  // Estado do Comerciante
  merchantStoreName: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userName] = useState("Leandro");
  const [userPoints, setUserPoints] = useState(1250);
  const [merchantStoreName] = useState("Padaria Bella Vista");

  const addPoints = (amount: number, storeName: string) => {
    setUserPoints((prev) => {
      const next = prev + amount;
      transactionsService.add({
        type: "earn",
        store: storeName,
        pts: `+${amount} pts`,
        date: "Hoje",
        value: `R$ ${(amount * 0.8).toFixed(2)}`,
        balance: `${next.toLocaleString("pt-BR")} pts`,
      });
      return next;
    });
    toast.success(`+${amount} pontos acumulados em ${storeName}! 🎉`);
  };

  const redeemPoints = (amount: number, storeName: string): boolean => {
    if (userPoints < amount) {
      toast.error("Pontos insuficientes para este resgate!");
      return false;
    }

    setUserPoints((prev) => {
      const next = prev - amount;
      transactionsService.add({
        type: "redeem",
        store: storeName,
        pts: `-${amount} pts`,
        date: "Hoje",
        value: "Resgate",
        balance: `${next.toLocaleString("pt-BR")} pts`,
      });
      return next;
    });
    toast.success(`Resgate de ${amount} pontos concluído com sucesso! 🏷️`);
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        userName,
        userPoints,
        addPoints,
        redeemPoints,
        merchantStoreName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser utilizado dentro de um AppProvider");
  }
  return context;
}
