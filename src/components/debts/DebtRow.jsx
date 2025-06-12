import { formatCurrency, formatPercent } from "../../utility/formatter";

export default function DebtRow({debt, onClick}) {
  return (
    <div 
      className="w-full h-24 bg-slate-100 rounded-2xl border-2 border-slate-800 my-2 cursor-pointer flex flex-row justify-between"
      onClick={() => onClick(debt.id)}
    >
      <div className="flex flex-col justify-center w-xl text-left mx-2">
        <h3 className="text-xl">{debt.name}</h3>
      </div>
      <div className="flex flex-col justify-center w-xl text-left mx-2">
        <p>Original Balance: {formatCurrency(debt.originalBalance)}</p>
        <p>Current Balance: {formatCurrency(debt.currentBalance)}</p>
      </div>
      <div className="flex flex-col justify-center w-xl text-left mx-2">
        <p>APR: {formatPercent(debt.apr)}</p>
        <p>Term: {debt.originalTerm}</p>
      </div>
      <div className="flex flex-col justify-center w-xl text-left mx-2">
        <p>Minimum Payment: {formatCurrency(debt.minimumPayment)}</p>
      </div>
    </div>
  );
}
