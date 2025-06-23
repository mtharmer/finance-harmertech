import * as notify from '../../src/utility/notifications';
import { toast } from 'react-toastify';

describe('notifications', () => {
  describe('info', () => {
    it('calls on toast.info', () => {
      const spy = vi.spyOn(toast, 'info');
      notify.info('some info');
      expect(spy).toHaveBeenCalledWith('some info');
    });
  });

  describe('success', () => {
    it('calls on toast.success', () => {
      const spy = vi.spyOn(toast, 'success');
      notify.success('some success');
      expect(spy).toHaveBeenCalledWith('some success');
    });
  });

  describe('warn', () => {
    it('calls on toast.warn', () => {
      const spy = vi.spyOn(toast, 'warn');
      notify.warn('some warning');
      expect(spy).toHaveBeenCalledWith('some warning');
    });
  });

  describe('alert', () => {
    it('calls on toats.alert', () => {
      const spy = vi.spyOn(toast, 'error');
      notify.alert('some alert');
      expect(spy).toHaveBeenCalledWith('some alert', {autoClose: false});
    });
  });
});
