import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Reports from "./Reports";

test("renders Reports page heading", () => {
  render(
    <BrowserRouter>
      <Reports />
    </BrowserRouter>
  );

  const heading = screen.getByText(/Reports/i);
  expect(heading).toBeInTheDocument();
});
