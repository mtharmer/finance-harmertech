import { render, screen } from "@testing-library/react";
import Modal from "../../src/components/modal/Modal";

describe('Modal', () => {
  it('renders when included', () => {
    const portalRoot = document.createElement("div");
    portalRoot.id = "modal-root";
    document.body.appendChild(portalRoot);
    render(<Modal />);
    const modal = screen.getByTestId('modal-container');
    expect(modal).toBeInTheDocument();
  });
});
