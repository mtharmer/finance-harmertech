import { signIn } from "supertokens-web-js/recipe/emailpassword";
import signInClicked from '../../src/utility/signIn.js';
import * as notify from '../../src/utility/notifications.js';

const email = 'user@example.com';
const password = 'somepassword';

describe('signIn', () => {
  beforeEach(() => {
    vi.mock('supertokens-web-js/recipe/emailpassword', async () => {
      return {
        signIn: vi.fn(async () => false)
      }
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('with valid response', () => {
    describe('on field error', () => {
      it('alerts if the form field error was on email', async () => {
        const response = {status: 'FIELD_ERROR', formFields: [{id: 'email', error: 'email error'}]}
        signIn.mockReturnValue(response);
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await signInClicked(email, password);
        expect(spy).toHaveBeenCalledWith('email error');
        spy.mockReset();
      });
      it('does not alert if the error was on password', async () => {
        const response = {status: 'FIELD_ERROR', formFields: [{id: 'password', error: 'password error'}]}
        signIn.mockReturnValue(response);
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await signInClicked(email, password);
        expect(spy).not.toHaveBeenCalled();
        spy.mockReset();
      });
    });
    describe('on credentials error', () => {
      it('alerts in a window', async () => {
        const response = {status: 'WRONG_CREDENTIALS_ERROR'}
        signIn.mockReturnValue(response);
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await signInClicked(email, password);
        expect(spy).toHaveBeenCalledWith("Email password combination is incorrect.");
        spy.mockReset();
      });
    });
    describe('on signin not allowed', () => {
      it('alerts in a window with the reason', async () => {
        const response = {status: 'SIGN_IN_NOT_ALLOWED', reason: 'disabled'}
        signIn.mockReturnValue(response);
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await signInClicked(email, password);
        expect(spy).toHaveBeenCalledWith('disabled');
        spy.mockReset();
      });
    });
    describe('on successful signin', () => {
      it('redirects to the homepage', async () => {
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {href: '/login'};
        const response = {status: 'success'}
        signIn.mockReturnValue(response);
        await signInClicked(email, password);
        expect(window.location.href).toEqual('/')
      });
    });
  });

  describe('on a caught error', () => {
    describe('when a supertokens error', () => {
      it('alerts with the error message', async () => {
        const response = {isSuperTokensGeneralError: true, message: 'supertokens error'}
        signIn.mockRejectedValue(response);
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await signInClicked(email, password);
        expect(spy).toHaveBeenCalledWith('supertokens error');
        spy.mockReset();
      });
    });
    describe('when a general error', () => {
      it('alerts with the error message', async () => {
        const response = {isSupertokensError: true, message: 'supertokens error'}
        signIn.mockRejectedValue('general error');
        const spy = vi.spyOn(notify, 'alert').mockImplementation(() => {});
        await signInClicked(email, password);
        expect(spy).toHaveBeenCalledWith('Oops! Something went wrong.');
        spy.mockReset();
      });
    });
  });
});
