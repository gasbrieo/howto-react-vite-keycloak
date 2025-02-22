import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "./Home";

describe("Home", () => {
  it("should render properly", () => {
    render(<Home />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
