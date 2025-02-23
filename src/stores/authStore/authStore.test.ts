import { beforeEach, describe, expect, it, vi } from "vitest";

import { keycloak } from "@/libs/keycloak";

import { useAuthStore } from "./authStore";

vi.mock("@/libs/keycloak", () => ({
  keycloak: {
    init: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    tokenParsed: { name: "Test User" },
  },
  keycloakInitOptions: {
    onLoad: "check-sso",
    silentCheckSsoRedirectUri: "silent-check-sso.html",
    checkLoginIframe: true,
  },
}));

describe("AuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({ authenticated: false, user: null });
  });

  it("should have initial state", () => {
    const state = useAuthStore.getState();
    expect(state.authenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  describe("initializeAuth", () => {
    it("should authenticate and set user when keycloak.init resolves true", async () => {
      vi.mocked(keycloak.init).mockResolvedValue(true);

      await useAuthStore.getState().initializeAuth();

      const state = useAuthStore.getState();
      expect(state.authenticated).toBe(true);
      expect(state.user).toEqual({ name: "Test User" });
    });

    it("should not authenticate when keycloak.init resolves false", async () => {
      vi.mocked(keycloak.init).mockResolvedValue(false);

      await useAuthStore.getState().initializeAuth();

      const state = useAuthStore.getState();
      expect(state.authenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    it("should handle errors without changing state", async () => {
      vi.mocked(keycloak.init).mockRejectedValue(new Error("Failed to init"));

      await useAuthStore.getState().initializeAuth();

      const state = useAuthStore.getState();
      expect(state.authenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe("login", () => {
    it("should call keycloak login", async () => {
      await useAuthStore.getState().login();
      expect(keycloak.login).toHaveBeenCalledWith({
        redirectUri: window.location.origin,
      });
    });
  });

  describe("logout", () => {
    it("should call keycloak.logout and reset state", () => {
      useAuthStore.setState({ authenticated: true, user: { name: "Test User" } });

      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(keycloak.logout).toHaveBeenCalled();
      expect(state.authenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });
});
