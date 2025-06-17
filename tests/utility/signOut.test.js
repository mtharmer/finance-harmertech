import logout from '../../src/utility/signOut';

describe('signOut', () => {
  beforeEach(() => {
    vi.mock('supertokens-web-js/recipe/session', async () => {
      return {
        signOut: vi.fn(async () => true)
      }
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  })
  it('redirects to the home page', async () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {href: '/login'};
    await logout();
    expect(window.location.href).toEqual('/');
  });
});
