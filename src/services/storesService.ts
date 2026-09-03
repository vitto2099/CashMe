import { stores } from "@/data/mocks";
import type { Loja } from "@/types/consumer";

export const storesService = {
  /**
   * Obtém todas as lojas parceiras cadastradas
   */
  async getAll(): Promise<Loja[]> {
    return Promise.resolve([...stores]);
  },

  /**
   * Busca uma loja específica pelo identificador
   */
  async getById(id: number): Promise<Loja | undefined> {
    return Promise.resolve(stores.find((s) => s.id === id));
  },
};
