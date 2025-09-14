import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Prediction from "./Prediction";

test("renders Prediction page heading", () => {
  render(
    <BrowserRouter>
      <Prediction />
    </BrowserRouter>
  );

  const heading = screen.getByText(/Bill Prediction/i);
  expect(heading).toBeInTheDocument();
});
