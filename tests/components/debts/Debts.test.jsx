import { render } from '@testing-library/react'
import Debts from '../../../src/components/debts/Debts'

describe('Debts page', () => {
  it('renders the page', () => {
    const { getByTestId } = render(<Debts />);
    const header = getByTestId("debts-header");
    expect(header).toBeInTheDocument();
  });

  it('renders the add button', () => {
    const { getByTestId } = render(<Debts />);
    const addButton = getByTestId("debts-add-button");
    expect(addButton).toBeInTheDocument();
  });
});
