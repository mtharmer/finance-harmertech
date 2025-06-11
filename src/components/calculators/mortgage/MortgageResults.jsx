import { formatCurrency } from "../../../utility/formatter";

export default function MortgageResults({ results }) {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-10">
        Mortgage Results
      </h1>
      <div className="mt-5 text-md leading-7">
        <p>Over <u>{results.numberOfPayments}</u> months, with a monthly payment of <u>{formatCurrency(results.totalMonthlyPayment)}</u>, you will have paid <u>{formatCurrency(results.totalInterest)}</u> in interest.</p>
        <p>Your total loan cost will be <u>{formatCurrency(results.totalCostOfLoan)}</u>, and your total escrow payments (taxes, insurance, PMI) will be <u>{formatCurrency(results.totalEscrow)}</u></p>
        <p>Your total paid over the life of the loan will be <u>{formatCurrency(results.totalPaid)}</u></p>
        {results.extra > 0 && (<>
          <p>By paying an extra <u>{formatCurrency(results.extra)}</u> monthly, you will save <u>{formatCurrency(results.interestSaved)}</u> in interest by making extra payments,</p>
          <p>and will pay off your loan <u>{results.loanTerm*12 - results.numberOfPayments}</u> months early.</p>
        </>)}
      </div>
    </>
  );
}
