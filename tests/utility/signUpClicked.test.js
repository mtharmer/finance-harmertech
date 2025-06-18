import { signUp } from "supertokens-web-js/recipe/emailpassword";
import signUpClicked from '../../src/utility/signUpClicked.js';

const email = 'user@example.com';
const password = 'somepassword';

describe('signUp', () => {
  beforeEach(() => {
    vi.mock('supertokens-web-js/recipe/emailpassword', async () => {
      return {
        signUp: vi.fn(async () => false)
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
        signUp.mockReturnValue(response);
        const spy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        await signUpClicked(email, password);
        expect(spy).toHaveBeenCalledWith('email error');
        spy.mockReset();
      });
      it('alerts if the error was on password', async () => {
        const response = {status: 'FIELD_ERROR', formFields: [{id: 'password', error: 'password error'}]}
        signUp.mockReturnValue(response);
        const spy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        await signUpClicked(email, password);
        expect(spy).toHaveBeenCalledWith('password error');
        spy.mockReset();
      });
    });
    describe('on signUp not allowed', () => {
      it('alerts in a window with the reason', async () => {
        const response = {status: 'SIGN_UP_NOT_ALLOWED', reason: 'disabled'}
        signUp.mockReturnValue(response);
        const spy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        await signUpClicked(email, password);
        expect(spy).toHaveBeenCalledWith('disabled');
        spy.mockReset();
      });
    });
    describe('on successful signUp', () => {
      it('redirects to the homepage', async () => {
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {href: '/signup'};
        const response = {status: 'success'}
        signUp.mockReturnValue(response);
        await signUpClicked(email, password);
        expect(window.location.href).toEqual('/login')
      });
    });
  });

  describe('on a caught error', () => {
    describe('when a supertokens error', () => {
      it('alerts with the error message', async () => {
        const response = {isSuperTokensGeneralError: true, message: 'supertokens error'}
        signUp.mockRejectedValue(response);
        const spy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        await signUpClicked(email, password);
        expect(spy).toHaveBeenCalledWith('supertokens error');
        spy.mockReset();
      });
    });
    describe('when a general error', () => {
      it('alerts with the error message', async () => {
        const response = {isSupertokensError: true, message: 'supertokens error'}
        signUp.mockRejectedValue('general error');
        const spy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        await signUpClicked(email, password);
        expect(spy).toHaveBeenCalledWith('Oops! Something went wrong.');
        spy.mockReset();
      });
    });
  });
});
