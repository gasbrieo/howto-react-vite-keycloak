import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { keycloak } from "@/libs/keycloak";
import { useAuthStore } from "@/stores/authStore";

import App from "./App";

describe("App", () => {
  it("should render properly", async () => {
    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Home")).toBeInTheDocument();

    expect(keycloak.init).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().authenticated).toBeTruthy();
    expect(useAuthStore.getState().user).not.toBeNull();
  });
});
