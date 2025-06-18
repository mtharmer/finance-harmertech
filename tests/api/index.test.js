import axios from 'axios';
import * as api from '../../src/api';

describe('api', () => {
  beforeEach(() => {
    // vi.mock('axios');
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
  });
  afterEach(() => {
    vi.resetAllMocks();
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
      expect(spy).toHaveBeenCalledWith('/debts/new', data);
    });
  });
  describe('updateDebt', () => {
    it('should call on axios.put', async () => {
      const spy = vi.spyOn(axios, 'put').mockResolvedValue({status: 'success'})
      const data = {id: 1234, name: 'somename'}
      await api.updateDebt(data);
      expect(spy).toHaveBeenCalledWith('/debts/update/1234', data);
    });
  });
  describe('deleteDebt', () => {
    it('should call on axios.delete', async () => {
      const spy = vi.spyOn(axios, 'delete').mockResolvedValue({status: 'success'})
      await api.deleteDebt(1234);
      expect(spy).toHaveBeenCalledWith('/debts/delete/1234');
    });
  });
});
