import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { keycloak } from "@/libs/keycloak";

import Login from "./Login";

describe("Login", () => {
  it("should render properly", () => {
    render(<Login />);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should trigger login on button click", () => {
    render(<Login />);

    fireEvent.click(screen.getByText("Login"));

    expect(keycloak.login).toHaveBeenCalledTimes(1);
  });
});
