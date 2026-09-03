import { api } from "./api";

export interface AuthUser {
  id: number;
  fullName: string | null;
  email: string;
  initials?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface SignupDTO {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export const authService = {
  /**
   * Realiza login na API AdonisJS
   */
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    const res = await api.post<any>("/auth/login", credentials);
    return res.data || res;
  },

  /**
   * Cadastra novo usuário na API AdonisJS
   */
  async signup(data: SignupDTO): Promise<AuthResponse> {
    const res = await api.post<any>("/auth/signup", data);
    return res.data || res;
  },

  /**
   * Busca perfil do usuário autenticado
   */
  async getProfile(): Promise<AuthUser> {
    const res = await api.get<any>("/account/profile");
    return res.data || res;
  },

  /**
   * Encerra sessão e revoga o token no backend
   */
  async logout(): Promise<{ message: string }> {
    const res = await api.post<any>("/account/logout");
    return res.data || res;
  },
};

