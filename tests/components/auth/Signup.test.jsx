import { render, screen, fireEvent } from "@testing-library/react";
import Signup from '../../../src/components/auth/Signup';
import { actWrapper } from "../../helpers";
import signUpClicked from "../../../src/utility/signUpClicked";

describe('Signup page', () => {
  beforeEach(() => {
    vi.mock('../../../src/utility/signUpClicked', async () => {
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
      render(<Signup />);
      const email = screen.getByTestId('signup-email-input');
      const pw = screen.getByTestId('signup-password-input');
      expect(email).toBeInTheDocument();
      expect(pw).toBeInTheDocument();
    });
    it('shows the submit button', () => {
      render(<Signup />);
      const btn = screen.getByTestId('signup-save-button');
      expect(btn).toBeInTheDocument();
    });
  });
  describe('on submit', () => {
    it('calls on signUpClicked with the entered inputs', async () => {
      render(<Signup />)
      const email = screen.getByTestId('signup-email-input');
      const pw = screen.getByTestId('signup-password-input');
      const btn = screen.getByTestId('signup-save-button');
      await actWrapper(fireEvent.change(email, {target: {value: 'some@example.com'}}));
      await actWrapper(fireEvent.change(pw, {target: {value: 'somepassword'}}));
      await actWrapper(fireEvent.click(btn));
      expect(signUpClicked).toHaveBeenCalledWith('some@example.com', 'somepassword');
    });
  });
});
