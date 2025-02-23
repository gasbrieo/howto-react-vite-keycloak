import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";

import router from "./router";
import { AuthAction, AuthState } from "./stores/authStore";

vi.mock("@/stores/authStore", () => ({
  useAuthStore: (selector: any) =>
    selector({
      login: vi.fn(),
      logout: vi.fn(),
    }),
}));

describe("Router", () => {
  let auth: AuthState & AuthAction;

  beforeEach(() => {
    auth = {
      authenticated: false,
      user: null,
      hasRole: vi.fn(),
      logout: vi.fn(),
      login: vi.fn(),
      initializeAuth: vi.fn(),
    };
  });

  describe("Home", () => {
    it("should allow access to Home when authenticated", async () => {
      auth.authenticated = true;
      const history = createMemoryHistory({ initialEntries: ["/"] });

      render(
        <RouterProvider
          context={{ auth }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Home")).toBeInTheDocument();
    });

    it("should redirect to Login when not authenticated", async () => {
      auth.authenticated = false;
      const history = createMemoryHistory({ initialEntries: ["/"] });

      render(
        <RouterProvider
          context={{ auth }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Login")).toBeInTheDocument();
    });
  });

  describe("Dashboard", () => {
    it("should allow access to Dashboard when authorized", async () => {
      auth.authenticated = true;
      auth.hasRole = vi.fn().mockReturnValue(true);
      const history = createMemoryHistory({ initialEntries: ["/dashboard"] });

      render(
        <RouterProvider
          context={{ auth }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Dashboard")).toBeInTheDocument();
    });

    it("should redirect to Home when not authorized", async () => {
      auth.authenticated = true;
      auth.hasRole = vi.fn().mockReturnValue(false);
      const history = createMemoryHistory({ initialEntries: ["/dashboard"] });

      render(
        <RouterProvider
          context={{ auth }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Home")).toBeInTheDocument();
    });

    it("should redirect to Login when not authenticated", async () => {
      auth.authenticated = false;
      const history = createMemoryHistory({ initialEntries: ["/dashboard"] });

      render(
        <RouterProvider
          context={{ auth }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Login")).toBeInTheDocument();
    });
  });

  describe("Login", () => {
    it("should allow access to Login when not authenticated", async () => {
      auth.authenticated = false;
      const history = createMemoryHistory({ initialEntries: ["/login"] });

      render(
        <RouterProvider
          context={{ auth }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Login")).toBeInTheDocument();
    });

    it("should redirect to Home when authenticated", async () => {
      auth.authenticated = true;
      const history = createMemoryHistory({ initialEntries: ["/login"] });

      render(
        <RouterProvider
          context={{ auth }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Logout")).toBeInTheDocument();
    });
  });
});
