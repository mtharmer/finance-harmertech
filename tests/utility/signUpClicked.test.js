import signUpClicked from '../../src/utility/signUpClicked.js';
import * as notify from '../../src/utility/notifications.js';
import { signup } from '../../src/api/index.js';

const email = 'user@example.com';
const password = 'somepassword';

describe('signUp', () => {
  beforeEach(() => {
    vi.mock('../../src/api/index.js', async () => {
      return {
        signup: vi.fn(async () => false)
      }
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('with valid response', () => {
    describe('on successful signUp', () => {
      it('sets the token in localStorage', async () => {
        const response = {headers: {getAuthorization: () => 'Bearer sometoken'}};
        signup.mockReturnValue(response);
        await signUpClicked(email, password);
        expect(localStorage.getItem('token')).toBe('Bearer sometoken');
      });
      it('redirects to the homepage', async () => {
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {href: '/signup'};
        const response = {headers: {getAuthorization: () => 'Bearer sometoken'}};
        signup.mockReturnValue(response);
        await signUpClicked(email, password);
        expect(window.location.href).toEqual('/')
      });
    });
  });

  describe('on a caught error', () => {
    describe('when a general error', () => {
      it('alerts with the error message', async () => {
        signup.mockRejectedValue('general error');
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await signUpClicked(email, password);
        expect(spy).toHaveBeenCalledWith('Oops! Something went wrong.');
        spy.mockReset();
      });
    });
  });
});
