import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";

import { useAuthStore } from "@/stores/authStore";

import router from "./router";

describe("Router", () => {
  describe("Home", () => {
    it("should allow access to Home when authenticated", async () => {
      useAuthStore.setState({ authenticated: true, user: {} });
      const history = createMemoryHistory({ initialEntries: ["/"] });

      render(
        <RouterProvider
          context={{ auth: useAuthStore.getState() }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Home")).toBeInTheDocument();
    });

    it("should redirect to Login when not authenticated", async () => {
      useAuthStore.setState({ authenticated: false });
      const history = createMemoryHistory({ initialEntries: ["/"] });

      render(
        <RouterProvider
          context={{ auth: useAuthStore.getState() }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Login")).toBeInTheDocument();
    });
  });

  describe("Dashboard", () => {
    it("should allow access to Dashboard when authorized", async () => {
      useAuthStore.setState({ authenticated: true, user: { roles: "writer" } });
      const history = createMemoryHistory({ initialEntries: ["/dashboard"] });

      render(
        <RouterProvider
          context={{ auth: useAuthStore.getState() }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Dashboard")).toBeInTheDocument();
    });

    it("should redirect to Home when not authorized", async () => {
      useAuthStore.setState({ authenticated: true, user: { roles: "reader" } });
      const history = createMemoryHistory({ initialEntries: ["/dashboard"] });

      render(
        <RouterProvider
          context={{ auth: useAuthStore.getState() }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Home")).toBeInTheDocument();
    });

    it("should redirect to Login when not authenticated", async () => {
      useAuthStore.setState({ authenticated: false });
      const history = createMemoryHistory({ initialEntries: ["/dashboard"] });

      render(
        <RouterProvider
          context={{ auth: useAuthStore.getState() }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Login")).toBeInTheDocument();
    });
  });

  describe("Login", () => {
    it("should allow access to Login when not authenticated", async () => {
      useAuthStore.setState({ authenticated: false });
      const history = createMemoryHistory({ initialEntries: ["/login"] });

      render(
        <RouterProvider
          context={{ auth: useAuthStore.getState() }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Login")).toBeInTheDocument();
    });

    it("should redirect to Home when authenticated", async () => {
      useAuthStore.setState({ authenticated: true });
      const history = createMemoryHistory({ initialEntries: ["/login"] });

      render(
        <RouterProvider
          context={{ auth: useAuthStore.getState() }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Logout")).toBeInTheDocument();
    });
  });
});
