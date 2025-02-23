import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Home from "./Home";

let mockLogout = vi.fn();

vi.mock("@/stores/authStore", () => ({
  useAuthStore: (selector: any) =>
    selector({
      logout: mockLogout,
    }),
}));

describe("Home", () => {
  beforeEach(() => {
    mockLogout = vi.fn();
  });

  it("should render properly", () => {
    render(<Home />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should trigger logout on button click", () => {
    render(<Home />);

    fireEvent.click(screen.getByText("Logout"));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
