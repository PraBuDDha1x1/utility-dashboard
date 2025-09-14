import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

test("renders Dashboard heading", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  const heading = screen.getByText(/Dashboard/i);
  expect(heading).toBeInTheDocument();
});
