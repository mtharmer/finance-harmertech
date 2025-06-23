import passwordChange from '../../src/utility/passwordChange.js';
import * as notify from '../../src/utility/notifications.js';
import { changePassword } from '../../src/api/index.js';

const email = 'user@example.com';
const password = 'somepassword';
const newPassword = 'somenewpass';

describe('passwordChange', () => {
  beforeEach(() => {
    vi.mock('../../src/api/index.js', async () => {
      return {
        changePassword: vi.fn(async () => false)
      }
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('with valid response', () => {
    describe('on successful password change', () => {
      it('removes any token from localStorage', async () => {
        localStorage.setItem('token', 'sometoken');
        const response = {status: 200};
        changePassword.mockReturnValue(response);
        await passwordChange(email, password, newPassword, newPassword);
        expect(localStorage.getItem('token')).toBeNull();
      });
      it('redirects to the login page', async () => {
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {href: '/passwordchange'};
        const response = {status: 200};
        changePassword.mockReturnValue(response);
        await passwordChange(email, password, newPassword, newPassword);
        expect(window.location.href).toEqual('/login')
      });
    });
  });

  describe('on a caught error', () => {
    describe('when a general error', () => {
      it('alerts with the error message', async () => {
        changePassword.mockRejectedValue('general error');
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await passwordChange(email, password, newPassword, newPassword);
        expect(spy).toHaveBeenCalledWith('Oops! Something went wrong.');
        spy.mockReset();
      });
    });
    describe('when a 422 error', () => {
      it('alerts with invalid credentials', async () => {
        changePassword.mockRejectedValue({status: 422});
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await passwordChange(email, password, newPassword, newPassword);
        expect(spy).toHaveBeenCalledWith('Invalid credentials, please try again!');
        spy.mockReset();
      });
    });
  });
});
