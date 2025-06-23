import { render, screen, fireEvent } from "@testing-library/react";
import ChangePassword from '../../../src/components/auth/ChangePassword';
import { actWrapper } from "../../helpers";
import passwordChange from "../../../src/utility/passwordChange";

describe('ChangePassword page', () => {
  beforeEach(() => {
    vi.mock('../../../src/utility/passwordChange', async () => {
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
      render(<ChangePassword />);
      const email = screen.getByTestId('password-change-email-input');
      const curPw = screen.getByTestId('password-change-current-password-input');
      const newPw = screen.getByTestId('password-change-new-password-input');
      const confirmPw = screen.getByTestId('password-change-confirm-password-input');
      expect(email).toBeInTheDocument();
      expect(curPw).toBeInTheDocument();
      expect(newPw).toBeInTheDocument();
      expect(confirmPw).toBeInTheDocument();
    });
    it('shows the submit button', () => {
      render(<ChangePassword />);
      const btn = screen.getByTestId('password-change-save-button');
      expect(btn).toBeInTheDocument();
    });
  });
  describe('on submit', () => {
    it('calls on signUpClicked with the entered inputs', async () => {
      render(<ChangePassword />)
      const email = screen.getByTestId('password-change-email-input');
      const curPw = screen.getByTestId('password-change-current-password-input');
      const newPw = screen.getByTestId('password-change-new-password-input');
      const confirmPw = screen.getByTestId('password-change-confirm-password-input');
      const btn = screen.getByTestId('password-change-save-button');
      await actWrapper(fireEvent.change(email, {target: {value: 'some@example.com'}}));
      await actWrapper(fireEvent.change(curPw, {target: {value: 'somepassword'}}));
      await actWrapper(fireEvent.change(newPw, {target: {value: 'newpassword'}}));
      await actWrapper(fireEvent.change(confirmPw, {target: {value: 'newpassword'}}));
      await actWrapper(fireEvent.click(btn));
      expect(passwordChange).toHaveBeenCalledWith('some@example.com', 'somepassword', 'newpassword', 'newpassword');
    });
  });
});
