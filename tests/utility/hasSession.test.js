import hasSession from "../../src/utility/hasSession";

describe('doesSessionExist', () => {
  it('returns true if the session exists', async () => {
    localStorage.setItem('token', 'Bearer sometoken');
    const result = await hasSession();
    expect(result).toBeTruthy();
  });
  it('returns false if the session does not exist', async () => {
    localStorage.removeItem('token');
    const result = await hasSession();
    expect(result).toBeFalsy();
  });
});
