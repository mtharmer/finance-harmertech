import MortgageResults from "../../../../src/components/calculators/mortgage/MortgageResults";
import { render, screen } from "@testing-library/react";

describe('MortgageResults component', () => {
  it('displays the container', () => {
    const results = {
      numberOfPayments: 360,
      totalMonthlyPayment: 2500.25,
      totalInterest: 150000.75,
      totalCostOfLoan: 300000.50,
      totalEscrow: 20000.12,
      totalPaid: 500000,
      extra: 0
    };
    const yearly = [{year: 1, balance: 200000, principal: 5000, interest: 20000}];
    render(<MortgageResults results={results} yearly={yearly} />);
    const container = screen.getByTestId('mortgage-container-results');
    expect(container).toBeInTheDocument();
  });
  it('displays the results in paragraphs', () => {
    const results = {
      numberOfPayments: 360,
      loanTerm: 30,
      totalMonthlyPayment: 2500.25,
      totalInterest: 150000.75,
      totalCostOfLoan: 300000.50,
      totalEscrow: 20000.12,
      totalPaid: 500000,
      extra: 0
    };
    const yearly = [{year: 1, balance: 200000, principal: 5000, interest: 20000}];
    render(<MortgageResults results={results} yearly={yearly} />);
    const line1 = screen.getByText(/with a monthly payment of/i);
    const line2 = screen.getByText(/Your total loan cost will be/i);
    const line3 = screen.getByText(/Your total paid over/i);
    const line4 = screen.queryByText(/By paying an extra/i);
    const line5 = screen.queryByText(/and will pay off your loan/i);
    expect(line1).toHaveTextContent('Over 360 months, with a monthly payment of $2,500.25, you will have paid $150,000.75 in interest.');
    expect(line2).toHaveTextContent('Your total loan cost will be $300,000.50, and your total escrow payments (taxes, insurance, PMI) will be $20,000.12.');
    expect(line3).toHaveTextContent('Your total paid over the life of the loan will be $500,000.00.');
    expect(line4).not.toBeInTheDocument();
    expect(line5).not.toBeInTheDocument();
  });
  it('includes extra payment details if included', () => {
    const results = {
      numberOfPayments: 240,
      loanTerm: 30,
      totalMonthlyPayment: 2500.25,
      totalInterest: 50000.75,
      totalCostOfLoan: 300000.50,
      totalEscrow: 20000.12,
      totalPaid: 400000,
      extra: 500,
      interestSaved: 100000
    };
    const yearly = [{year: 1, balance: 200000, principal: 5000, interest: 20000}];
    render(<MortgageResults results={results} yearly={yearly} />);
    const line1 = screen.getByText(/with a monthly payment of/i);
    const line2 = screen.getByText(/Your total loan cost will be/i);
    const line3 = screen.getByText(/Your total paid over/i);
    const line4 = screen.getByText(/By paying an extra/i);
    const line5 = screen.getByText(/and will pay off your loan/i);
    expect(line1).toHaveTextContent('Over 240 months, with a monthly payment of $2,500.25, you will have paid $50,000.75 in interest.');
    expect(line2).toHaveTextContent('Your total loan cost will be $300,000.50, and your total escrow payments (taxes, insurance, PMI) will be $20,000.12.');
    expect(line3).toHaveTextContent('Your total paid over the life of the loan will be $400,000.00.');
    expect(line4).toHaveTextContent('By paying an extra $500.00 monthly, you will save $100,000.00 in interest,');
    expect(line5).toHaveTextContent('and will pay off your loan 120 months early.');
  });
});
