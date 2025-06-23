import { render } from '@testing-library/react';
import NavRoutes from '../src/NavRoutes';
import { BrowserRouter } from 'react-router'
import hasSession from '../src/utility/hasSession';
import { beforeEach } from 'vitest';

describe('NavRoutes component', () => {
  beforeEach(() => {
    vi.mock('../src/utility/hasSession', () => {
      return {
        default: vi.fn(() => false)
      }
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('renders without issue', () => {
    render(
      <BrowserRouter>
        <NavRoutes />
      </BrowserRouter>
    );
  });

  describe('if hasSession is true', () => {
    beforeEach(() => {
      hasSession.mockReturnValue(true);
    });
    it('renders if hasSession returns true', () => {
      hasSession.mockReturnValue(true);
      render(
        <BrowserRouter>
          <NavRoutes />
        </BrowserRouter>
      );
    });
  });
});
