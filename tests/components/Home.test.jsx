import Home from "../../src/components/Home";
import { render, screen } from "@testing-library/react";

describe('Home', () => {
  it('renders the main page', () => {
    render(<Home />);
    const header = screen.getByText(/Welcome to the Home Page/i);
    expect(header).toBeInTheDocument();
  });
});
