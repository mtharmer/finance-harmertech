import axios from 'axios';
import * as api from '../../src/api';

describe('api', () => {
  beforeEach(() => {
    vi.mock('axios', () => {
      return {
        default: {
          post: vi.fn(),
          get: vi.fn(),
          delete: vi.fn(),
          put: vi.fn(),
          create: vi.fn().mockReturnThis(),
          interceptors: {
            request: {
              use: vi.fn(),
              eject: vi.fn(),
            },
            response: {
              use: vi.fn(),
              eject: vi.fn(),
            },
          },
        },
      };
    });

    localStorage.setItem('token', 'Bearer sometoken');
  });
  afterEach(() => {
    vi.resetAllMocks();
    localStorage.removeItem('token');
  });
  describe('debtList', () => {
    it('should call on axios.get', async () => {
      const spy = vi.spyOn(axios, 'get').mockResolvedValue({status: 'success'})
      await api.debtList();
      expect(spy).toHaveBeenCalledWith('/debts');
    });
  });
  describe('createDebt', () => {
    it('should call on axios.post', async () => {
      const spy = vi.spyOn(axios, 'post').mockResolvedValue({status: 'success'})
      const data = {name: 'somename'}
      await api.createDebt(data);
      expect(spy).toHaveBeenCalledWith('/debts', {debt: data});
    });
  });
  describe('updateDebt', () => {
    it('should call on axios.put', async () => {
      const spy = vi.spyOn(axios, 'put').mockResolvedValue({status: 'success'})
      const data = {id: 1234, name: 'somename'}
      await api.updateDebt(data);
      expect(spy).toHaveBeenCalledWith('/debts/1234', {debt: data});
    });
  });
  describe('deleteDebt', () => {
    it('should call on axios.delete', async () => {
      const spy = vi.spyOn(axios, 'delete').mockResolvedValue({status: 'success'})
      await api.deleteDebt(1234);
      expect(spy).toHaveBeenCalledWith('/debts/1234');
    });
  });
  describe('login', () => {
    it('should call on axios.post', async () => {
      const creds = {email: 'some@example.com', password: 'somepass'}
      const spy = vi.spyOn(axios, 'post').mockResolvedValue({status: 'success'})
      await api.login(creds);
      expect(spy).toHaveBeenCalledWith('/login', creds);
    });
  });
  describe('logout', () => {
    it('should call on axios.delete', async () => {
      const spy = vi.spyOn(axios, 'delete').mockResolvedValue({status: 'success'})
      await api.logout();
      expect(spy).toHaveBeenCalledWith('/logout');
    });
  });
  describe('signup', () => {
    it('should call on axios.post', async () => {
      const creds = {email: 'some@example.com', password: 'somepass'}
      const spy = vi.spyOn(axios, 'post').mockResolvedValue({status: 'success'})
      await api.signup(creds);
      expect(spy).toHaveBeenCalledWith('/signup', creds);
    });
  });
});
