import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("should render properly", () => {
    const { getByText } = render(<App />);

    expect(getByText("MyApp")).toBeInTheDocument();
  });
});
