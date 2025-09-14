import { render, fireEvent } from "@testing-library/react";
import FileUpload from "./FileUpload";

test("calls onFileSelected when a file is uploaded", () => {
  const mockHandler = jest.fn();

  const { getByLabelText } = render(
    <FileUpload onFileSelected={mockHandler} />
  );

  // Find the file input by label or role
  const fileInput = getByLabelText(/upload/i) || document.querySelector("input[type='file']");

  // Create a fake file
  const testFile = new File(["hello"], "test-bill.pdf", { type: "application/pdf" });

  // Simulate file selection
  fireEvent.change(fileInput, { target: { files: [testFile] } });

  // Expect handler to be called with the file
  expect(mockHandler).toHaveBeenCalledTimes(1);
  expect(mockHandler).toHaveBeenCalledWith(testFile);
});
