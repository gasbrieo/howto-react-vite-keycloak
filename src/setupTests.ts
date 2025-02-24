import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import { useAuthStore } from "@/stores/authStore";

import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();

  useAuthStore.setState(useAuthStore.getInitialState());
});

vi.mock("@/libs/keycloak", () => ({
  keycloak: {
    init: vi.fn().mockResolvedValue(true),
    login: vi.fn(),
    logout: vi.fn(),
  },
  keycloakInitOptions: {},
}));
