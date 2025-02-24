import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { keycloak } from "@/libs/keycloak";
import { useAuthStore } from "@/stores/authStore";

import Home from "./Home";

describe("Home", () => {
  it("should render properly", () => {
    render(<Home />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should trigger logout on button click", () => {
    useAuthStore.setState({ authenticated: true, user: {} });

    render(<Home />);

    fireEvent.click(screen.getByText("Logout"));

    expect(keycloak.logout).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().authenticated).toBeFalsy();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
