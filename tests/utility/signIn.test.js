import signInClicked from '../../src/utility/signIn.js';
import * as notify from '../../src/utility/notifications.js';
import { login } from '../../src/api/index.js';

const email = 'user@example.com';
const password = 'somepassword';

describe('signIn', () => {
  beforeEach(() => {
    vi.mock('../../src/api/index.js', async () => {
      return {
        login: vi.fn(async () => false)
      }
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('with valid response', () => {
    describe('on successful signin', () => {
      it('sets the token in localStorage', async () => {
        const response = {headers: {getAuthorization: () => 'Bearer sometoken'}};
        login.mockReturnValue(response);
        await signInClicked(email, password);
        expect(localStorage.getItem('token')).toBe('Bearer sometoken');
      });
      it('redirects to the home page', async () => {
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {href: '/login'};
        const response = {headers: {getAuthorization: () => 'Bearer sometoken'}};
        login.mockReturnValue(response);
        await signInClicked(email, password);
        expect(window.location.href).toEqual('/')
      })
    });
  });

  describe('on a caught error', () => {
    describe('when a general error', () => {
      it('alerts with the error message', async () => {
        login.mockRejectedValue('general error');
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await signInClicked(email, password);
        expect(spy).toHaveBeenCalledWith('Oops! Something went wrong.');
        spy.mockReset();
      });
    });
  });
});
