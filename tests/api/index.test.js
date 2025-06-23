import axios from 'axios';
import * as api from '../../src/api';
import { beforeEach } from 'vitest';

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

  describe('onRequestFulfilled', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'some token')
    })
    it('sets the authorization header', () => {
      const request = api.onRequestFulfilled({headers: {}});
      expect(request.headers.Authorization).toEqual('some token');
    });
  });

  describe('onRequestFailed', () => {
    it('returns a rejected promise', () => {
      expect(api.onRequestFailed('some error')).rejects.toEqual('some error');
    });
  });

  describe('onResponseFulfilled', () => {
    it('responds with the original response', () => {
      const response = {body: 'somedata'};
      expect(api.onResponseFulfilled(response)).toEqual(response);
    });
  });

  describe('onResponseFailed', () => {
    describe('on 401 response', () => {
      beforeEach(() => {
        localStorage.setItem('token', 'some token');
        window.location.href = '/debts';
      })
      it('removes the localStorage token', () => {
        const data = {response: {status: 401}}
        expect(api.onResponseFailed(data)).rejects.toEqual(data)
        expect(localStorage.getItem('token')).toBeNull();
      });
      it('redirects to the login page', () => {
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {href: '/debts'};
        const data = {response: {status: 401}}
        expect(api.onResponseFailed(data)).rejects.toEqual(data)
        expect(window.location.href).toBe('/login');
      });
    });

    it('returns a rejected promise', () => {
      const data = {response: {status: 422}}
      expect(api.onResponseFailed(data)).rejects.toEqual(data);
    });
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
  describe('monthlyExpenseList', () => {
    it('should call on axios.get', async () => {
      const spy = vi.spyOn(axios, 'get').mockResolvedValue({status: 'success'});
      await api.monthlyExpenseList();
      expect(spy).toHaveBeenCalledWith('/monthly_expenses');
    });
  });
  describe('createMonthlyExpense', () => {
    it('should call on axios.post', async () => {
      const spy = vi.spyOn(axios, 'post').mockResolvedValue({status: 'success'});
      const data = {name: 'some expense'}
      await api.createMonthlyExpense(data);
      expect(spy).toHaveBeenCalledWith('/monthly_expenses', {monthlyExpense: data});
    });
  });
  describe('updateMonthlyExpense', () => {
    it('should call on axios.put', async () => {
      const data = {id: 1234, name: 'some expense'};
      const spy = vi.spyOn(axios, 'put').mockResolvedValue({status: 'success'});
      await api.updateMonthlyExpense(data);
      expect(spy).toHaveBeenCalledWith('/monthly_expenses/1234', {monthlyExpense: data});
    });
  });
  describe('deleteMonthlyExpense', () => {
    it('should call on axios.delete', async () => {
      const spy = vi.spyOn(axios, 'delete').mockResolvedValue({status: 'success'});
      await api.deleteMonthlyExpense(1234);
      expect(spy).toHaveBeenCalledWith('/monthly_expenses/1234');
    })
  })
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
