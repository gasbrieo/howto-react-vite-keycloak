import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";

let mockInitializeAuth = vi.fn();

vi.mock("@/stores/authStore", () => ({
  useAuthStore: (selector: any) =>
    selector({
      initializeAuth: mockInitializeAuth,
    }),
}));

describe("App", () => {
  it("should render properly", async () => {
    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });
});
