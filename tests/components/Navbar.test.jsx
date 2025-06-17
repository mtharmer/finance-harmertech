import Navbar from '../../src/components/Navbar';
import { render, screen } from '@testing-library/react';
import hasSession from '../../src/utility/hasSession';

describe('Navbar', () => {
  beforeEach(() => {
    vi.mock('../../src/utility/hasSession', async () => {
      return {
        default: vi.fn(async () => false)
      }
    })
  })
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('regardless of login status', () => {
    it('always renders a set of routes', () => {
      render(<Navbar />);
      const home = screen.getByText(/Home/i);
      const calculators = screen.getByText(/Calculators/i);
      expect(home).toBeInTheDocument();
      expect(calculators).toBeInTheDocument();
    });
  });

  describe('when logged in', () => {
    beforeEach(() => {
      hasSession.mockReturnValue(true);
    })
    it('shows the debts link', async () => {
      render(<Navbar />);
      const debts = await screen.findByText(/Debts/i);
      expect(debts).toBeInTheDocument();
    });
    it('shows the correct authenticated links', async () => {
      render(<Navbar />);
      const logout = await screen.findByText(/Logout/i);
      const login = screen.queryByText(/Login/i);
      const signup = screen.queryByText(/Signup/i);
      expect(logout).toBeInTheDocument();
      expect(login).not.toBeInTheDocument();
      expect(signup).not.toBeInTheDocument();
    });
  });

  describe('when logged out', () => {
    it('does not show the debts link', async () => {
      render(<Navbar />);
      const debts = screen.queryByText(/Debts/i);
      expect(debts).not.toBeInTheDocument();
    });
    it('shows the correct unauthenticated links', async () => {
      render(<Navbar />);
      const login = await screen.findByText(/Login/i);
      const signup = await screen.findByText(/Signup/i);
      const logout = screen.queryByText(/Logout/i);
      expect(logout).not.toBeInTheDocument();
      expect(login).toBeInTheDocument();
      expect(signup).toBeInTheDocument();
    });
  });
});
