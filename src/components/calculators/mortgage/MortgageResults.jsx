import formatCurrency from "../../../utility/formatCurrency";

export default function MortgageResults({ results }) {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-10">
        Mortgage Results
      </h1>
      <div className="mt-5">
        <p className="text-lg">Monthly Payment: {formatCurrency(results.totalMonthlyPayment)}</p>
        <p className="text-lg">Total Interest Paid: {formatCurrency(results.totalInterest)}</p>
        <p className="text-lg">Total Cost of Loan: {formatCurrency(results.totalCostOfLoan)}</p>
        <p className="text-lg">Total Tax: {formatCurrency(results.totalTax)}</p>
        <p className="text-lg">Total Insurance: {formatCurrency(results.totalInsurance)}</p>
        <p className="text-lg">Total PMI: {formatCurrency(results.totalPMI)}</p>
        <p className="text-lg">Total Paid over {results.loanTerm} Years: {formatCurrency(results.totalPaid)}</p>
      </div>
    </>
  );
}
