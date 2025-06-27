import { render, screen, fireEvent } from '@testing-library/react';
import ResetPassword from '../../../src/components/auth/ResetPassword';
import { actWrapper } from '../../helpers';
import * as api from '../../../src/api';
import * as notify from '../../../src/utility/notifications';

describe('Reset Password page', () => {
  beforeEach(() => {
    vi.mock('../../../src/api', async () => {
      return {
        resetPassword: vi.fn(async () => Promise.resolve(true))
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('rendering', () => {
    it('shows the input fields', () => {
      render(<ResetPassword />);
      const passwordInput = screen.getByPlaceholderText('Enter your new password');
      expect(passwordInput).toBeInTheDocument();
    });

    it('shows the submit button', () => {
      render(<ResetPassword />);
      const btn = screen.getByTestId('reset-password-submit-button');
      expect(btn).toBeInTheDocument();
    });
  });

  describe('on submit', () => {
    it('calls resetPassword with the entered inputs', async () => {
      const mockGet = vi.fn((param) => {
        if (param === 'reset_password_token') return 'some-token';
        return null;
      });
      global.URLSearchParams = vi.fn(() => ({
        get: mockGet,
      }));
      const spy = vi.spyOn(api, 'resetPassword');
      render(<ResetPassword />);
      const passwordInput = screen.getByPlaceholderText('Enter your new password');
      const btn = screen.getByTestId('reset-password-submit-button');
      
      await actWrapper(fireEvent.change(passwordInput, {target: {value: 'newpassword123'}}));
      await actWrapper(fireEvent.click(btn));
      
      expect(spy).toHaveBeenCalledWith(expect.any(String), 'newpassword123');
    });

    it('shows success message after successful reset', async () => {
      render(<ResetPassword />);
      const passwordInput = screen.getByPlaceholderText('Enter your new password');
      const btn = screen.getByTestId('reset-password-submit-button');
      
      await actWrapper(fireEvent.change(passwordInput, {target: {value: 'newpassword123'}}));
      await actWrapper(fireEvent.click(btn));
      
      const message = screen.getByText('Your password has been reset successfully. You can now log in with your new password.');
      expect(message).toBeInTheDocument();
    });

    it('shows an error message if reset fails', async () => {
      api.resetPassword.mockRejectedValue('Reset failed');
      const spy = vi.spyOn(notify, 'alert');
      render(<ResetPassword />);
      const passwordInput = screen.getByPlaceholderText('Enter your new password');
      const btn = screen.getByTestId('reset-password-submit-button');
      
      await actWrapper(fireEvent.change(passwordInput, {target: {value: 'newpassword123'}}));
      await actWrapper(fireEvent.click(btn));
      
      expect(screen.queryByText('Your password has been reset successfully. You can now log in with your new password.')).not.toBeInTheDocument();
      expect(spy).toHaveBeenCalledWith('Reset failed');
    });
  });

  describe('on login clicked', () => {
    it('navigates to login page', async () => {
      api.resetPassword.mockResolvedValue(true);
      render(<ResetPassword />);
      const passwordInput = screen.getByPlaceholderText('Enter your new password');
      const btn = screen.getByTestId('reset-password-submit-button');
      
      await actWrapper(fireEvent.change(passwordInput, {target: {value: 'newpassword123'}}));
      await actWrapper(fireEvent.click(btn));
      const login = screen.getByTestId('reset-password-login-button');
      const mockLocation = { href: '' };
      Object.defineProperty(window, 'location', {
        value: mockLocation,
        writable: true,
      });
      await actWrapper(fireEvent.click(login));
      expect(mockLocation.href).toBe('/login');
    });
  });
});
