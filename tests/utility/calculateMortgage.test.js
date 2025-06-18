import calculateMortgage from "../../src/utility/calculateMortgage";

describe('calculateMortgage', () => {
  describe('with incomplete inputs, returns empty data', () => {
    it('with missing loanAmount', () => {
      const inputs = {
        loanAmount: null,
        interestRate: 6.5,
        loanTerm: 30
      }
      const [result, amortization] = calculateMortgage(inputs);
      expect(result).toBeNull();
      expect(amortization).toStrictEqual([]);
    });
    it('with missing interestRate', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: null,
        loanTerm: 30
      }
      const [result, amortization] = calculateMortgage(inputs);
      expect(result).toBeNull();
      expect(amortization).toStrictEqual([]);
    });
    it('with missing loanTerm', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: null
      }
      const [result, amortization] = calculateMortgage(inputs);
      expect(result).toBeNull();
      expect(amortization).toStrictEqual([]);
    });
  });
  describe('without extra payments', () => {
    it('calculates the expected results', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        propertyTax: 200,
        homeownersInsurance: 80,
        pmi: 75
      }
      const [result, _] = calculateMortgage(inputs);
      expect(parseFloat(result.principalAndInterest.toFixed(2))).toBe(1896.20);
      expect(parseFloat(result.totalMonthlyPayment.toFixed(2))).toBe(2251.20);
      expect(parseFloat(result.loanAmount.toFixed(2))).toBe(300000.00);
      expect(parseFloat(result.interestRate.toFixed(2))).toBe(6.50);
      expect(result.loanTerm).toBe(30);
      expect(result.propertyTax).toBe(200);
      expect(result.homeownersInsurance).toBe(80);
      expect(result.pmi).toBe(75);
      expect(parseFloat(result.baseTotalInterest.toFixed(2))).toBe(382633.47);
      expect(parseFloat(result.baseTotalCostOfLoan.toFixed(2))).toBe(682633.47);
      expect(parseFloat(result.baseTotalPaid.toFixed(2))).toBe(810433.47);
      expect(parseFloat(result.totalInterest.toFixed(2))).toBe(382633.47);
      expect(parseFloat(result.totalCostOfLoan.toFixed(2))).toBe(682633.47);
      expect(parseFloat(result.totalPaid.toFixed(2))).toBe(810433.47);
      expect(parseFloat(result.totalTax.toFixed(2))).toBe(72000);
      expect(parseFloat(result.totalInsurance.toFixed(2))).toBe(28800);
      expect(parseFloat(result.totalPMI.toFixed(2))).toBe(27000);
      expect(parseFloat(result.totalEscrow.toFixed(2))).toBe(127800);
      expect(parseFloat(result.interestSaved.toFixed(2))).toBe(0);
      expect(result.numberOfPayments).toBe(360);
      expect(result.extra).toBe(0);
    });
    it('calculates the expected amortization data', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        propertyTax: 200,
        homeownersInsurance: 80,
        pmi: 75
      }
      const [_, results] = calculateMortgage(inputs);
      expect(results.length).toBe(360);
      const midResult = results[179];
      expect(midResult.month).toBe(180);
      expect(parseFloat(midResult.principal.toFixed(2))).toBe(713.25);
      expect(parseFloat(midResult.interest.toFixed(2))).toBe(1182.95);
      expect(parseFloat(midResult.startBalance.toFixed(2))).toBe(218390.68);
      expect(parseFloat(midResult.endBalance.toFixed(2))).toBe(217677.42);
      expect(parseFloat(midResult.totalPayment.toFixed(2))).toBe(2251.20);
      expect(parseFloat(midResult.totalPrincipalPaid.toFixed(2))).toBe(82322.58);
      expect(parseFloat(midResult.totalInterestPaid.toFixed(2))).toBe(258994.16);
      expect(parseFloat(midResult.totalPaid.toFixed(2))).toBe(341316.73);
      expect(parseFloat(midResult.percentPaid.toFixed(2))).toBe(27.44);

      const lastResult = results[359];
      expect(lastResult.month).toBe(360);
      expect(parseFloat(lastResult.principal.toFixed(2))).toBe(1885.99);
      expect(parseFloat(lastResult.interest.toFixed(2))).toBe(10.22);
      expect(parseFloat(lastResult.startBalance.toFixed(2))).toBe(1885.99);
      expect(parseFloat(lastResult.endBalance.toFixed(2))).toBe(0);
      expect(parseFloat(lastResult.totalPayment.toFixed(2))).toBe(2251.20);
      expect(parseFloat(lastResult.totalPrincipalPaid.toFixed(2))).toBe(300000);
      expect(parseFloat(lastResult.totalInterestPaid.toFixed(2))).toBe(382633.47);
      expect(parseFloat(lastResult.totalPaid.toFixed(2))).toBe(682633.47);
      expect(parseFloat(lastResult.percentPaid.toFixed(2))).toBe(100);

      // month: numberOfPayments,
      // principal: +principalForThisMonth,
      // interest: +interestForThisMonth,
      // startBalance: +startBalance,
      // endBalance: +balance,
      // totalPayment: +totalMonthlyPayment,
      // totalPrincipalPaid: +totalPrincipalPaid,
      // totalInterestPaid: +totalInterestPaid,
      // totalPaid: +(totalPrincipalPaid + totalInterestPaid),
      // percentPaid: +(totalPrincipalPaid / loanAmount * 100),
    });
  });
  describe('with extra payments', () => {
    it('calculates the expected results', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        propertyTax: 200,
        homeownersInsurance: 80,
        pmi: 75,
        addExtraPayment: true,
        extraPayment: 200
      }
      const [result, _] = calculateMortgage(inputs);
      expect(parseFloat(result.principalAndInterest.toFixed(2))).toBe(2096.20);
      expect(parseFloat(result.totalMonthlyPayment.toFixed(2))).toBe(2451.20);
      expect(parseFloat(result.loanAmount.toFixed(2))).toBe(300000.00);
      expect(parseFloat(result.interestRate.toFixed(2))).toBe(6.50);
      expect(result.loanTerm).toBe(30);
      expect(result.propertyTax).toBe(200);
      expect(result.homeownersInsurance).toBe(80);
      expect(result.pmi).toBe(75);
      expect(parseFloat(result.baseTotalInterest.toFixed(2))).toBe(382633.47);
      expect(parseFloat(result.baseTotalCostOfLoan.toFixed(2))).toBe(682633.47);
      expect(parseFloat(result.baseTotalPaid.toFixed(2))).toBe(780968.47);
      expect(parseFloat(result.totalInterest.toFixed(2))).toBe(279184.67);
      expect(parseFloat(result.totalCostOfLoan.toFixed(2))).toBe(579184.67);
      expect(parseFloat(result.totalPaid.toFixed(2))).toBe(677519.67);
      expect(parseFloat(result.totalTax.toFixed(2))).toBe(55400);
      expect(parseFloat(result.totalInsurance.toFixed(2))).toBe(22160);
      expect(parseFloat(result.totalPMI.toFixed(2))).toBe(20775);
      expect(parseFloat(result.totalEscrow.toFixed(2))).toBe(98335);
      expect(parseFloat(result.interestSaved.toFixed(2))).toBe(103448.79);
      expect(result.numberOfPayments).toBe(277);
      expect(result.extra).toBe(200);
    });
    it('calculates the expected amortization data', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        propertyTax: 200,
        homeownersInsurance: 80,
        pmi: 75,
        addExtraPayment: true,
        extraPayment: 200
      }
      const [_, results] = calculateMortgage(inputs);
      expect(results.length).toBe(277);

      const midResult = results[179];
      expect(midResult.month).toBe(180);
      expect(parseFloat(midResult.principal.toFixed(2))).toBe(1239.25);
      expect(parseFloat(midResult.interest.toFixed(2))).toBe(856.96);
      expect(parseFloat(midResult.startBalance.toFixed(2))).toBe(158207.72);
      expect(parseFloat(midResult.endBalance.toFixed(2))).toBe(156968.47);
      expect(parseFloat(midResult.totalPayment.toFixed(2))).toBe(2451.20);
      expect(parseFloat(midResult.totalPrincipalPaid.toFixed(2))).toBe(143031.53);
      expect(parseFloat(midResult.totalInterestPaid.toFixed(2))).toBe(234285.20);
      expect(parseFloat(midResult.totalPaid.toFixed(2))).toBe(377316.73);
      expect(parseFloat(midResult.percentPaid.toFixed(2))).toBe(47.68);

      const lastResult = results[276];
      expect(lastResult.month).toBe(277);
      expect(parseFloat(lastResult.principal.toFixed(2))).toBe(628.94);
      expect(parseFloat(lastResult.interest.toFixed(2))).toBe(3.41);
      expect(parseFloat(lastResult.startBalance.toFixed(2))).toBe(628.94);
      expect(parseFloat(lastResult.endBalance.toFixed(2))).toBe(0);
      expect(parseFloat(lastResult.totalPayment.toFixed(2))).toBe(987.35);
      expect(parseFloat(lastResult.totalPrincipalPaid.toFixed(2))).toBe(300000);
      expect(parseFloat(lastResult.totalInterestPaid.toFixed(2))).toBe(279184.67);
      expect(parseFloat(lastResult.totalPaid.toFixed(2))).toBe(579184.67);
      expect(parseFloat(lastResult.percentPaid.toFixed(2))).toBe(100);
    });
  });
});
