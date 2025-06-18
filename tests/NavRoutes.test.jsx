import { render } from '@testing-library/react';
import NavRoutes from '../src/NavRoutes';
import { BrowserRouter } from 'react-router'

describe('NavRoutes component', () => {
  it('renders without issue', () => {
    render(
      <BrowserRouter>
        <NavRoutes />
      </BrowserRouter>
    );
  });
});
