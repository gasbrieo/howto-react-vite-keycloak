import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";

import router from "./router";

describe("Router", () => {
  describe("Home", () => {
    it("should allow access to Home when authenticated", async () => {
      const auth = { authenticated: true, user: null };
      const history = createMemoryHistory({ initialEntries: ["/"] });

      render(
        <RouterProvider
          context={{ auth }}
          history={history}
          router={router}
        />
      );

      expect(await screen.findByText("Logout")).toBeInTheDocument();
    });

    it("should redirect to Login when not authenticated", async () => {
      const auth = { authenticated: false, user: null };
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

  describe("Login", () => {
    it("should allow access to Login when not authenticated", async () => {
      const auth = { authenticated: false, user: null };
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
      const auth = { authenticated: true, user: null };
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
