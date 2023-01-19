import React from "react";

import {
  render,
  cleanup,
  getAllByTestId,
  waitForElement,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("renders application without crashing", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getAllByTestId(container, "main"));
  });
});
