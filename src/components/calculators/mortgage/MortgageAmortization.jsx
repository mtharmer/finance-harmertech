import { formatCurrency } from "../../../utility/formatter";

export default function MortgageAmortization({results}) {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-10">
        Mortgage Amortization
      </h1>
      <div className="mt-10">
        {results && results.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Payment #</th>
                <th className="border border-gray-300 px-4 py-2">Start Balance</th>
                <th className="border border-gray-300 px-4 py-2">Principal</th>
                <th className="border border-gray-300 px-4 py-2">Interest</th>
                <th className="border border-gray-300 px-4 py-2">End Balance</th>
                <th className="border border-gray-300 px-4 py-2">Cum. Interest</th>
                <th className="border border-gray-300 px-4 py-2">Cum. Principal</th>
                <th className="border border-gray-300 px-4 py-2">Percent Paid</th>
              </tr>
            </thead>
            <tbody>
              {results.map((payment, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{payment.month}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(payment.startBalance)}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(payment.principal)}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(payment.interest)}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(payment.endBalance)}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(payment.totalInterestPaid)}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(payment.totalPrincipalPaid)}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.percentPaid.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results to display.</p>
        )}
      </div>
    </>
  );
}

      // month: i + 1,
      // principal: +principalForThisMonth,
      // interest: +interestForThisMonth,
      // startBalance: +startBalance,
      // endBalance: +balance,
      // totalPayment: +totalMonthlyPayment,
      // principalPaid: +principalPaid,
      // interestPaid: +interestPaid,
      // totalPaid: +(principalPaid + interestPaid),