import { formatCurrency } from "../../utility/formatter";

export default function MortgageDetails({mortgage = {}}) {
  const totalCostOfMortgage = +mortgage.originalBalance + +mortgage.originalInterest;
  const totalCostOfMortgageAfterExtra = +mortgage.originalBalance + +mortgage.originalInterestAfterExtra;
  const totalSavings = totalCostOfMortgage - totalCostOfMortgageAfterExtra;

  return (
    <div className="flex flex-row gap-2 p-4 bg-white rounded-lg shadow-md shadow-slate-500" data-testid="mortgage-details">
      <div className="flex flex-col grow gap-1 mx-8">
        <span className="text-xl font-bold mb-4 text-center">Mortgage Details</span>
        <div className="flex justify-between">
          <span className="font-medium">Original Balance:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.originalBalance)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Down Payment:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.downPayment)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Current Balance:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.currentBalance)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Interest Rate:</span>
          <span className="text-gray-700">{mortgage.apr}%</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Term:</span>
          <span className="text-gray-700">{mortgage.term} months</span>
        </div>
      </div>
      <div className="flex flex-col grow gap-1 mx-8">
        <span className="text-xl font-bold mb-4 text-center">Payment Details</span>
        <div className="flex justify-between">
          <span className="font-medium">Monthly Payment:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.payment)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Property Tax:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.tax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Home Insurance:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.insurance)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">PMI:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.pmi)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Extra Payment:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.extraPayment)}</span>
        </div>
      </div>
      <div className="flex flex-col grow gap-1 mx-8">
        <span className="text-xl font-bold mb-4 text-center">Total Costs</span>
        <div className="flex justify-between">
          <span className="font-medium">Total Interest:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.originalInterest)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Remaining Interest:</span>
          <span className="text-gray-700">{formatCurrency(mortgage.remainingInterest)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Remaining Term:</span>
          <span className="text-gray-700">{mortgage.remainingTerm}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Total Cost of Mortgage:</span>
          <span className="text-gray-700">{formatCurrency(totalCostOfMortgage)}</span>
        </div>
      </div>
      {mortgage.extraPayment && mortgage.extraPayment > 0 && (
        <div className="flex flex-col grow-1 gap-1 mx-8">
          <span className="text-xl font-bold mb-4 text-center">Total with Extra Payments</span>
          <div className="flex justify-between">
            <span className="font-medium">Total Interest:</span>
            <span className="text-gray-700">{formatCurrency(mortgage.originalInterestAfterExtra)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Remaining Interest:</span>
            <span className="text-gray-700">{formatCurrency(mortgage.remainingInterestAfterExtra)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Remaining Term:</span>
            <span className="text-gray-700">{mortgage.remainingTermAfterExtra}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Cost of Mortgage:</span>
            <span className="text-gray-700">{formatCurrency(totalCostOfMortgageAfterExtra)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Savings:</span>
            <span className="text-gray-700">{formatCurrency(totalSavings)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
