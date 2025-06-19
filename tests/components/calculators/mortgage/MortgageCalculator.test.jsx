import { fireEvent, render, screen } from "@testing-library/react";
import MortgageCalculator from "../../../../src/components/calculators/mortgage/MortgageCalculator";
import { actWrapper } from "../../../helpers";

describe('Mortgage Calculator page', () => {
  describe('initial rendering', () => {
    it('shows the container', () => {
      render(<MortgageCalculator />);
      const container = screen.getByTestId('mortgage-container');
      expect(container).toBeInTheDocument();
    });
    it('shows the mortgage inputs', () => {
      render(<MortgageCalculator />);
      const inputs = screen.getByTestId('mortgage-container-inputs');
      expect(inputs).toBeInTheDocument();
    });
    it('does not show any results', () => {
      render(<MortgageCalculator />);
      const results = screen.queryByTestId('mortgage-container-results');
      expect(results).not.toBeInTheDocument();
    });
    it('does not show the amortization table', () => {
      render(<MortgageCalculator />);
      const amortization = screen.getByText(/No results to display./i);
      expect(amortization).toBeInTheDocument();
    });
  });
  describe('user inputs', () => {
    it('has the expected input fields', () => {
      render(<MortgageCalculator />);
      const amountInput = screen.getByTestId('mortgage-container-loan-amount-input');
      const interestInput = screen.getByTestId('mortgage-container-interest-rate-input');
      const termInput = screen.getByTestId('mortgage-container-loan-term-input');
      const propertyTaxInput = screen.getByTestId('mortgage-container-property-tax-input');
      const insuranceInput = screen.getByTestId('mortgage-container-homeowners-insurance-input');
      const pmiInput = screen.getByTestId('mortgage-container-pmi-input');
      const extraPaymentCheckbox = screen.getByTestId('mortgage-container-add-extra-payment-checkbox');
      const extraPaymentInput = screen.getByTestId('mortgage-container-extra-payment-input');
      expect(amountInput).toBeInTheDocument();
      expect(interestInput).toBeInTheDocument();
      expect(termInput).toBeInTheDocument();
      expect(propertyTaxInput).toBeInTheDocument();
      expect(insuranceInput).toBeInTheDocument();
      expect(pmiInput).toBeInTheDocument();
      expect(extraPaymentCheckbox).toBeInTheDocument();
      expect(extraPaymentInput).toBeInTheDocument();
    });
    it('disables the extra payment input by default', async () => {
      render(<MortgageCalculator />);
      const extraPaymentInput = screen.getByTestId('mortgage-container-extra-payment-input');
      expect(extraPaymentInput).toBeDisabled();
    });
    it('enables the extra payment option when checked', async () => {
      render(<MortgageCalculator />);
      const extraPaymentCheckbox = screen.getByTestId('mortgage-container-add-extra-payment-checkbox');
      await actWrapper(fireEvent.click(extraPaymentCheckbox));
      const extraPaymentInput = screen.getByTestId('mortgage-container-extra-payment-input');
      expect(extraPaymentInput).not.toBeDisabled();
    });
  });
  describe('calculating the mortgage', () => {
    it('does not calculate if loan amount is null', async () => {
      render(<MortgageCalculator />);
      const interestInput = screen.getByTestId('mortgage-container-interest-rate-input');
      const termInput = screen.getByTestId('mortgage-container-loan-term-input');
      await actWrapper(fireEvent.change(interestInput, {target: {value: 6.5}}));
      await actWrapper(fireEvent.change(termInput, {target: {value: 360}}));
      const results = screen.queryByTestId('mortgage-container-results');
      expect(results).not.toBeInTheDocument();
      const amortization = screen.getByText(/No results to display./i);
      expect(amortization).toBeInTheDocument();
    });
    it('does not calculate if interest rate is null', async () => {
      render(<MortgageCalculator />);
      const amountInput = screen.getByTestId('mortgage-container-loan-amount-input');
      const termInput = screen.getByTestId('mortgage-container-loan-term-input');
      await actWrapper(fireEvent.change(amountInput, {target: {value: 150000.25}}));
      await actWrapper(fireEvent.change(termInput, {target: {value: 360}}));
      const results = screen.queryByTestId('mortgage-container-results');
      expect(results).not.toBeInTheDocument();
      const amortization = screen.getByText(/No results to display./i);
      expect(amortization).toBeInTheDocument();
    });
    it('does not calculate if loan term is null', async () => {
      render(<MortgageCalculator />);
      const amountInput = screen.getByTestId('mortgage-container-loan-amount-input');
      const interestInput = screen.getByTestId('mortgage-container-interest-rate-input');
      await actWrapper(fireEvent.change(interestInput, {target: {value: 6.5}}));
      await actWrapper(fireEvent.change(amountInput, {target: {value: 150000.25}}));
      const results = screen.queryByTestId('mortgage-container-results');
      expect(results).not.toBeInTheDocument();
      const amortization = screen.getByText(/No results to display./i);
      expect(amortization).toBeInTheDocument();
    });
    describe('when required fields are present', () => {
      it('displays the results details', {timeout: 10_000}, async () => {
        render(<MortgageCalculator />);
        const amountInput = screen.getByTestId('mortgage-container-loan-amount-input');
        const interestInput = screen.getByTestId('mortgage-container-interest-rate-input');
        const termInput = screen.getByTestId('mortgage-container-loan-term-input');
        await actWrapper(fireEvent.change(interestInput, {target: {value: 6.5}}));
        await actWrapper(fireEvent.change(amountInput, {target: {value: 150000.25}}));
        await actWrapper(fireEvent.change(termInput, {target: {value: 360}}));
        const results = screen.getByTestId('mortgage-container-results');
        expect(results).toBeInTheDocument();
      });
      it('displays the amortization table', {timeout: 10_000}, async () => {
        render(<MortgageCalculator />);
        const amountInput = screen.getByTestId('mortgage-container-loan-amount-input');
        const interestInput = screen.getByTestId('mortgage-container-interest-rate-input');
        const termInput = screen.getByTestId('mortgage-container-loan-term-input');
        await actWrapper(fireEvent.change(interestInput, {target: {value: 6.5}}));
        await actWrapper(fireEvent.change(amountInput, {target: {value: 150000.25}}));
        await actWrapper(fireEvent.change(termInput, {target: {value: 360}}));
        const amortization = screen.getByTestId('mortgage-container-amortization');
        expect(amortization).toBeInTheDocument();
      });
    });
  });
});
