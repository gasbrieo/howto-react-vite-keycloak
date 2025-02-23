import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Login from "./Login";

let mockLogin = vi.fn();

vi.mock("@/stores/authStore", () => ({
  useAuthStore: (selector: any) =>
    selector({
      login: mockLogin,
    }),
}));

describe("Login", () => {
  beforeEach(() => {
    mockLogin = vi.fn();
  });

  it("should render properly", () => {
    render(<Login />);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should trigger login on button click", () => {
    render(<Login />);

    fireEvent.click(screen.getByText("Login"));

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
