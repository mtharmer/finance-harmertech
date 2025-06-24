import { render, } from "@testing-library/react";
import PieChart from "../../src/components/PieChart";
import colors from 'tailwindcss/colors';

describe('PieChart', () => {
  it('should render a chart', () => {
    const labels = ['Principal', 'Interest'];
    const data = [5000, 2000];
    const dataLabel = 'Payments';
    render(<PieChart labels={labels} data={data} dataLabel={dataLabel} />);
  });

  it('accepts colors as a parameter', () => {
    const labels = ['Principal', 'Interest'];
    const data = [5000, 2000];
    const dataLabel = 'Payments';
    const dataColors = [colors.blue[200], colors.blue[700]];
    render(<PieChart labels={labels} data={data} dataLabel={dataLabel} colors={dataColors} />);
  });

  it ('renders with empty data', () => {
    render(<PieChart labels={[]} data={[]} dataLabel='some label' />);
  });
});
