import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../modal";

const setup = (ui: React.ReactElement) => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);

  return render(ui);
};

describe("Modal", () => {
  it("does not render when isOpen is false", () => {
    setup(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Content</div>
      </Modal>,
    );

    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    setup(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();

    setup(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when clicking inside modal content", () => {
    const onClose = vi.fn();

    setup(
      <Modal isOpen={true} onClose={onClose}>
        <div>Inner content</div>
      </Modal>,
    );

    fireEvent.click(screen.getByText("Inner content"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on Escape key press", () => {
    const onClose = vi.fn();

    setup(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal</div>
      </Modal>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});