import signOut from '../../src/utility/signOut';
import { logout } from '../../src/api';

describe('signOut', () => {
  beforeEach(() => {
    vi.mock('../../src/api', async () => {
      return {
        logout: vi.fn(async () => true)
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
    await signOut();
    expect(window.location.href).toEqual('/');
  });
  it('removes the token from localStorage', async () => {
    localStorage.setItem('token', 'Bearer sometoken');
    await signOut();
    expect(localStorage.getItem('token')).toBeNull();
  })
});
