import hasSession from "../../src/utility/hasSession";

describe('doesSessionExist', () => {
  it('returns true if the session exists', () => {
    localStorage.setItem('token', 'Bearer sometoken');
    const result = hasSession();
    expect(result).toBeTruthy();
  });
  it('returns false if the session does not exist', () => {
    localStorage.removeItem('token');
    const result = hasSession();
    expect(result).toBeFalsy();
  });
});
