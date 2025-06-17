import { render, screen, fireEvent } from "@testing-library/react";
import Login from '../../../src/components/auth/Login';
import { actWrapper } from "../../helpers";
import signInClicked from "../../../src/utility/signIn";

describe('Login page', () => {
  beforeEach(() => {
    vi.mock('../../../src/utility/signIn', async () => {
      return {
        default: vi.fn(async () => Promise.resolve(true))
      }
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  describe('rendering', () => {
    it('shows the input fields', () => {
      render(<Login />);
      const email = screen.getByTestId('login-email-input');
      const pw = screen.getByTestId('login-password-input');
      expect(email).toBeInTheDocument();
      expect(pw).toBeInTheDocument();
    });
    it('shows the submit button', () => {
      render(<Login />);
      const btn = screen.getByTestId('login-save-button');
      expect(btn).toBeInTheDocument();
    });
  });
  describe('on submit', () => {
    it('calls on signIn with the entered inputs', async () => {
      render(<Login />)
      const email = screen.getByTestId('login-email-input');
      const pw = screen.getByTestId('login-password-input');
      const btn = screen.getByTestId('login-save-button');
      await actWrapper(fireEvent.change(email, {target: {value: 'some@example.com'}}));
      await actWrapper(fireEvent.change(pw, {target: {value: 'somepassword'}}));
      await actWrapper(fireEvent.click(btn));
      expect(signInClicked).toHaveBeenCalledWith('some@example.com', 'somepassword');
    });
  });
});
