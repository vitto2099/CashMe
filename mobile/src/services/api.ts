import { Platform } from 'react-native';

// No Android Emulator, 10.0.2.2 aponta para o localhost da máquina host
// No iOS Simulator e Web, localhost funciona diretamente
export const API_BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3333' : 'http://localhost:3333';

export interface NfceSubmitResponse {
  data: {
    chaveAcesso?: string;
    uf?: string;
    isEligible?: boolean;
    pontosCalculados?: number;
    message?: string;
  };
  message: string;
}

export const mobileApi = {
  /**
   * Valida URL ou Chave na API Cash Me AdonisJS
   */
  async validateNfce(payload: { url?: string; accessKey?: string }) {
    const res = await fetch(`${API_BASE_URL}/api/v1/nfce/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  /**
   * Envia o HTML extraído ou a URL para ser processado no backend
   */
  async parseNfce(payload: { html?: string; url?: string; accessKey?: string; factor?: number }) {
    const res = await fetch(`${API_BASE_URL}/api/v1/nfce/parse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
};
