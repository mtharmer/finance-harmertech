import Home from "../../src/components/Home";
import { render, screen } from "@testing-library/react";

describe('Home', () => {
  it('renders the main page', () => {
    render(<Home />);
    const header = screen.getByText(/Sign up free to get full access/i);
    expect(header).toBeInTheDocument();
  });
});
