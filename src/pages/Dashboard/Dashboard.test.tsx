import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("should render properly", () => {
    render(<Dashboard />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
