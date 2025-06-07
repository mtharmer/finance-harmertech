export default function calculateMortgage(inputs) {
  const { loanAmount, interestRate, loanTerm, propertyTax, homeownersInsurance, pmi } = inputs;

  let mortgageData = {};
  let payments = [];

  if (!loanAmount || !interestRate || !loanTerm) {
    return [null, []];
  }

  const monthlyInterestRate = +(interestRate / 100 / 12);
  const numberOfPayments = +(loanTerm * 12);
  const principalAndInterest = +((loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
  const totalMonthlyPayment = +(principalAndInterest + (propertyTax || 0) + (homeownersInsurance || 0) + (pmi || 0));
  const totalInterest = +(principalAndInterest * numberOfPayments - loanAmount);
  const totalCostOfLoan = +(principalAndInterest * numberOfPayments);
  const totalTax = +(propertyTax * numberOfPayments);
  const totalInsurance = +(homeownersInsurance * numberOfPayments);
  const totalPMI = +(pmi * numberOfPayments);
  const totalEscrow = +(totalTax + totalInsurance + totalPMI);
  const totalPaid = +(totalCostOfLoan + totalEscrow);

  mortgageData = {
    principalAndInterest,
    totalMonthlyPayment,
    loanAmount,
    interestRate,
    loanTerm,
    propertyTax,
    homeownersInsurance,
    pmi,
    totalInterest: totalInterest,
    totalCostOfLoan: totalCostOfLoan,
    totalTax: totalTax,
    totalInsurance: totalInsurance,
    totalPMI: totalPMI,
    totalEscrow: totalEscrow,
    totalPaid: totalPaid,
  };

  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;
  let balance = +loanAmount;
  for (let i = 0; i < numberOfPayments; i++) {
    const startBalance = balance;
    const interestForThisMonth = balance * monthlyInterestRate;
    const principalForThisMonth = principalAndInterest - interestForThisMonth;
    totalPrincipalPaid += principalForThisMonth;
    totalInterestPaid += interestForThisMonth;
    balance -= principalForThisMonth;

    payments.push({
      month: i + 1,
      principal: +principalForThisMonth,
      interest: +interestForThisMonth,
      startBalance: +startBalance,
      endBalance: +balance,
      totalPayment: +totalMonthlyPayment,
      totalPrincipalPaid: +totalPrincipalPaid,
      totalInterestPaid: +totalInterestPaid,
      totalPaid: +(totalPrincipalPaid + totalInterestPaid),
      percentPaid: +(totalPrincipalPaid / loanAmount * 100),
    });
  }

  return [mortgageData, payments];
}
