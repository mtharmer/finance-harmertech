import MortgageAmortization from "../../../../src/components/calculators/mortgage/MortgageAmortization";
import { render, screen } from "@testing-library/react";
import calculateMortgage from "../../../../src/utility/calculateMortgage";

describe('MortgageAmortization component', () => {
  it('renders a message when there are no results', () => {
    render(<MortgageAmortization results={[]} />);
    const table = screen.queryByTestId('mortgage-container-amortization-table');
    const message = screen.getByText(/No results to display./i);
    expect(table).not.toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  describe('when there is amortization data', () => {
    it('renders the table and not the message', () => {
      const data = {
        month: 1,
        startBalance: 100000,
        principal: 100,
        interest: 1000,
        endBalance: 99900,
        totalInterestPaid: 1000,
        totalPrincipalPaid: 100,
        percentPaid: 0.1
      }
      render(<MortgageAmortization results={[data]} />);
      const table = screen.getByTestId('mortgage-container-amortization-table');
      const message = screen.queryByText(/No results to display./i);
      expect(table).toBeInTheDocument();
      expect(message).not.toBeInTheDocument();
    });
    it('renders the expected table headers', () => {
      const [_, amortizationData] = calculateMortgage({loanAmount: 300000, interestRate: 6.5, loanTerm: 30});
      render(<MortgageAmortization results={amortizationData} />);
      const header = screen.getByTestId('mortgage-container-amortization-table-header');
      expect(header).toHaveTextContent(/payment #/i);
      expect(header).toHaveTextContent(/start balance/i);
      expect(header).toHaveTextContent(/principal/i);
      expect(header).toHaveTextContent(/interest/i);
      expect(header).toHaveTextContent(/end balance/i);
      expect(header).toHaveTextContent(/cum. interest/i);
      expect(header).toHaveTextContent(/cum. principal/i);
      expect(header).toHaveTextContent(/percent paid/i);
    });
    it('renders the expected number of rows', () => {
      const [_, amortizationData] = calculateMortgage({loanAmount: 300000, interestRate: 6.5, loanTerm: 30});
      render(<MortgageAmortization results={amortizationData} />);
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(361); // Add 1 for the header row
    });
  });
});
