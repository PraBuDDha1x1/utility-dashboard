import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Upload from "./Upload";

test("renders Upload page heading", () => {
  render(
    <BrowserRouter>
      <Upload />
    </BrowserRouter>
  );

  const heading = screen.getByText(/Upload Utility Bill/i);
  expect(heading).toBeInTheDocument();
});
