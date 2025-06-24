export default function calculateMortgage(inputs) {
  const { loanAmount, interestRate, loanTerm, propertyTax, homeownersInsurance, pmi, addExtraPayment, extraPayment } = inputs;

  let mortgageData = {};
  let payments = [];
  let yearly = [];

  if (!loanAmount || !interestRate || !loanTerm) {
    return [null, []];
  }

  const extra = addExtraPayment ? +extraPayment : 0;

  const monthlyInterestRate = +(interestRate / 100 / 12);
  const originalLoanTermInMonths = +(loanTerm * 12);
  const originalPrincipalAndInterest = +(loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -originalLoanTermInMonths)));
  const principalAndInterest = +((loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -originalLoanTermInMonths)) + (extra));
  const totalEscrowPayment = +(propertyTax || 0) + (homeownersInsurance || 0) + (pmi || 0)
  const totalMonthlyPayment = +(principalAndInterest + totalEscrowPayment);

  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;
  let numberOfPayments = 0;
  let balance = +loanAmount;
  while (balance > 0) {
    numberOfPayments++;
    const startBalance = balance;
    const interestForThisMonth = balance * monthlyInterestRate;
    const principalForThisMonth = Math.min(principalAndInterest - interestForThisMonth, balance);
    totalPrincipalPaid += principalForThisMonth;
    totalInterestPaid += interestForThisMonth;
    balance -= principalForThisMonth;

    payments.push({
      month: numberOfPayments,
      principal: +principalForThisMonth,
      interest: +interestForThisMonth,
      startBalance: +startBalance,
      endBalance: +balance,
      totalPayment: +(principalForThisMonth + interestForThisMonth + totalEscrowPayment),
      totalPrincipalPaid: +totalPrincipalPaid,
      totalInterestPaid: +totalInterestPaid,
      totalPaid: +(totalPrincipalPaid + totalInterestPaid),
      percentPaid: +(totalPrincipalPaid / loanAmount * 100),
    });

    if (balance < 0.01) {
      balance = 0; // Ensure balance does not go negative due to rounding errors
    }
  }

  for (let index = 0; index < payments.length; index++) {
    if (index % 12 === 0) {
      const element = payments[index];
      yearly.push({
        year: index / 12,
        totalPrincipalPaid: element.totalPrincipalPaid,
        totalInterestPaid: element.totalInterestPaid,
        balance: element.endBalance
      });
    }
  }

  const baseTotalInterest = +(originalPrincipalAndInterest * originalLoanTermInMonths - loanAmount);
  const baseTotalCostOfLoan = +(originalPrincipalAndInterest * originalLoanTermInMonths);
  const totalInterest = totalInterestPaid;
  const totalCostOfLoan = +(totalInterest + loanAmount);
  const totalTax = +(propertyTax * numberOfPayments);
  const totalInsurance = +(homeownersInsurance * numberOfPayments);
  const totalPMI = +(pmi * numberOfPayments);
  const totalEscrow = +(totalTax + totalInsurance + totalPMI);
  const baseTotalPaid = +(baseTotalCostOfLoan + totalEscrow);
  const totalPaid = +(totalCostOfLoan + totalEscrow);
  const interestSaved = Math.max(+(baseTotalInterest - totalInterest), 0);

  mortgageData = {
    principalAndInterest,
    totalMonthlyPayment,
    loanAmount,
    interestRate,
    loanTerm,
    propertyTax,
    homeownersInsurance,
    pmi,
    baseTotalInterest,
    baseTotalCostOfLoan,
    baseTotalPaid,
    totalInterest,
    totalCostOfLoan,
    totalPaid,
    totalTax,
    totalInsurance,
    totalPMI,
    totalEscrow,
    interestSaved,
    numberOfPayments,
    extra
  };

  return [mortgageData, payments, yearly];
}
