import { formatCurrency, formatPercent } from "../../src/utility/formatter";

describe('formatter', () => {
  describe('formatCurrency', () => {
    it('formats currency as expected', () => {
      const result = formatCurrency(5000.1234);
      expect(result).toEqual('$5,000.12');
    });
    it('does not error on bad data', () => {
      const result = formatCurrency('random text');
      expect(result).toEqual('random text');
    });
  });

  describe('formatPercent', () => {
    it('formats the percentage as expected', () => {
      const result = formatPercent(50.25);
      expect(result).toEqual('50.25%')
    });
    it('does not error on bad data', () => {
      const result = formatPercent('some string');
      expect(result).toEqual('some string');
    });
  });
});
