import { doesSessionExist } from "supertokens-web-js/recipe/session";
import hasSession from "../../src/utility/hasSession";

describe('doesSessionExist', () => {
  beforeEach(() => {
    vi.mock('supertokens-web-js/recipe/session', async () => {
      return {
        doesSessionExist: vi.fn(async () => true)
      }
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  })
  it('returns true if the session exists', async () => {
    doesSessionExist.mockReturnValue(true);
    const result = await hasSession();
    expect(result).toBeTruthy();
  });
  it('returns false if the session does not exist', async () => {
    doesSessionExist.mockReturnValue(false);
    const result = await hasSession();
    expect(result).toBeFalsy();
  });
});
