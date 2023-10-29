import create from "zustand";
import { setCookie, getCookies, deleteCookie } from "cookies-next";

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  initialize: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  // Outros dados do usuário
}

export const useAuthStore = create<AuthState>((set) => {
  return {
    user: null,
    token: null,

    setUser: (user) => {
      set({ user });
    },

    setToken: (token) => {
      if (token) {
        // Define o cookie 'token' para a validade que você precisa
        setCookie("token", token, { path: "/", maxAge: 3600 }); // MaxAge em segundos
      } else {
        // Remove o cookie se o token for nulo
        deleteCookie("token", { path: "/" });
      }
      set({ token });
    },

    initialize: () => {
      // Recupere os dados do usuário e token do cookie aqui
      const storedToken = getCookies().token;
      // Adapte conforme necessário para recuperar os dados do usuário
      const user: User | null = null;

      set({ user, token: storedToken });
    },
  };
});
