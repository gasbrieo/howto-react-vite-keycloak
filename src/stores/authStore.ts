import { create } from "zustand";
import { persist } from "zustand/middleware";

import { keycloak, keycloakInitOptions } from "@/libs/keycloak";

export type AuthState = {
  authenticated: boolean;
  user: Keycloak.KeycloakTokenParsed | null;
};

export type AuthAction = {
  initializeAuth: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean;
};

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set, get) => ({
      authenticated: false,
      user: null,

      initializeAuth: async () => {
        const authenticated = await keycloak.init(keycloakInitOptions);

        if (authenticated) {
          set({ authenticated: true, user: keycloak.tokenParsed });
        }
      },

      login: async () => {
        await keycloak.login({ redirectUri: window.location.origin });
      },

      logout: () => {
        keycloak.logout();
        set({ authenticated: false, user: null });
      },

      hasRole: (role: string) => {
        const user = get().user;
        return user?.roles?.includes(role);
      },
    }),
    { name: "authStore" }
  )
);
