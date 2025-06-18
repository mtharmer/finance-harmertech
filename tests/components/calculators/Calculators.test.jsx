import { fireEvent, render, screen } from "@testing-library/react";
import Calculators from "../../../src/components/calculators/Calculators";
import { actWrapper } from "../../helpers";

describe('Calculators page', () => {
  describe('rendering', () => {
    it('shows general content on initial load', () => {
      render(<Calculators />);
      const header = screen.getByText(/Welcome to the Calculators Page/i);
      expect(header).toBeInTheDocument();
    });
    it('shows a sidebar with links', () => {
      render(<Calculators />);
      const sidebar = screen.getByTestId('calculator-sidebar');
      const mortgageLink = screen.getByTestId('sidebar-mortgage-link'); //screen.getByText(/mortgage/i);
      const loanLink = screen.getByTestId('sidebar-loan-link'); // screen.getByText(/loan/i);
      expect(sidebar).toBeInTheDocument();
      expect(mortgageLink).toBeInTheDocument();
      expect(loanLink).toBeInTheDocument();
    });
  });
  describe('selecting tabs', () => {
    it('renders the Mortgage calculator when selected', async () => {
      render(<Calculators />);
      const mortgageLink = screen.getByTestId('sidebar-mortgage-link');
      await actWrapper(fireEvent.click(mortgageLink));
      const container = screen.getByTestId('mortgage-container');
      expect(container).toBeInTheDocument();
    });
    it('renders the Mortgage calculator when selected', async () => {
      render(<Calculators />);
      const loanLink = screen.getByTestId('sidebar-loan-link');
      await actWrapper(fireEvent.click(loanLink));
      const container = screen.getByTestId('loan-container');
      expect(container).toBeInTheDocument();
    });
  });
});
