import { render, screen, fireEvent } from '@testing-library/react';
import RequestPasswordReset from '../../../src/components/auth/RequestPasswordReset';
import { actWrapper } from '../../helpers';
import * as api from '../../../src/api';
import * as notify from '../../../src/utility/notifications';

describe('Request Password Reset', () => {
  beforeEach(() => {
    vi.mock('../../../src/api', async () => {
      return {
        requestPasswordReset: vi.fn(async () => Promise.resolve(true))
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('rendering', () => {
    it('shows the input fields', () => {
      render(<RequestPasswordReset />);
      const emailInput = screen.getByPlaceholderText('Enter your email');
      expect(emailInput).toBeInTheDocument();
    });

    it('shows the submit button', () => {
      render(<RequestPasswordReset />);
      const btn = screen.getByText('Request Reset');
      expect(btn).toBeInTheDocument();
    });
  });

  describe('on submit', () => {
    it('calls requestPasswordReset with the entered email', async () => {
      const spy = vi.spyOn(api, 'requestPasswordReset');
      render(<RequestPasswordReset />);
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const btn = screen.getByText('Request Reset');
      
      await actWrapper(fireEvent.change(emailInput, { target: { value: 'some@email.com' } }));
      await actWrapper(fireEvent.click(btn));
      expect(spy).toHaveBeenCalledWith('some@email.com');
      const message = await screen.findByText('If that email address is registered, you will receive a password reset link shortly.');
      expect(message).toBeInTheDocument();
    });
  });
});
