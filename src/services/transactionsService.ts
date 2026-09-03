import { history } from "@/data/mocks";
import type { Transacao } from "@/types/consumer";

let localHistory = [...history];

export const transactionsService = {
  /**
   * Obtém o extrato de movimentações e transações
   */
  async getAll(): Promise<Transacao[]> {
    return Promise.resolve([...localHistory]);
  },

  /**
   * Registra uma nova transação (resgate ou acúmulo de pontos)
   */
  async add(transaction: Omit<Transacao, "id">): Promise<Transacao> {
    const newTx: Transacao = {
      ...transaction,
      id: Date.now(),
    };
    localHistory = [newTx, ...localHistory];
    return Promise.resolve(newTx);
  },
};
