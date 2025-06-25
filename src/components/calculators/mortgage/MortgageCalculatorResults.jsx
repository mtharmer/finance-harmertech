import { formatCurrency } from "../../../utility/formatter";
import AmortizationChart from "../../AmortizationChart";
import PieChart from "../../PieChart";

export default function MortgageCalculatorResults({ results, yearly }) {
  const pieLabels = ['Principal', 'Interest', 'Taxes, Insurance & PMI'];

  const pieData = [
    results.loanAmount,
    results.totalInterest,
    results.totalEscrow || 0
  ];
  const pieLabel = 'Cost';
  // const dataColors = [colors.blue[400], colors.blue[800]];

  const amortizationLabels = yearly.map((year) => year.year);
  const amortizationData = [
    {label: 'Balance', data: yearly.map((year) => year.balance), type: 'line'},
    {label: 'Principal Paid', data: yearly.map((year) => year.totalPrincipalPaid)},
    {label: 'Interest Paid', data: yearly.map((year) => year.totalInterestPaid)}
  ];

  return (
    <div data-testid='mortgage-container-results'>
      <h1 className="text-2xl font-bold text-center mt-10">
        Mortgage Results
      </h1>
      <div className="mt-5 text-md leading-7">
        <p>Over <u>{results.numberOfPayments}</u> months, with a monthly payment of <u>{formatCurrency(results.totalMonthlyPayment)}</u>, you will have paid <u>{formatCurrency(results.totalInterest)}</u> in interest.</p>
        <p>Your total loan cost will be <u>{formatCurrency(results.totalCostOfLoan)}</u>, and your total escrow payments (taxes, insurance, PMI) will be <u>{formatCurrency(results.totalEscrow)}</u>.</p>
        <p>Your total paid over the life of the loan will be <u>{formatCurrency(results.totalPaid)}</u>.</p>
        {results.extra > 0 && (<>
          <p>By paying an extra <u>{formatCurrency(results.extra)}</u> monthly, you will save <u>{formatCurrency(results.interestSaved)}</u> in interest,</p>
          <p>and will pay off your loan <u>{results.loanTerm*12 - results.numberOfPayments}</u> months early.</p>
        </>)}
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col max-w-64">
          <PieChart labels={pieLabels} data={pieData} dataLabel={pieLabel} />
        </div>
        <div className="flex flex-col w-full">
          <AmortizationChart labels={amortizationLabels} data={amortizationData} />
        </div>
      </div>
    </div>
  );
}
