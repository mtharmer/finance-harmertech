import { formatCurrency } from "../../utility/formatter";

export default function MonthlyExpenseRow({expense, onClick}) {
  return (
    <div 
      className="w-full h-24 bg-slate-100 rounded-2xl border-2 border-slate-800 my-2 cursor-pointer flex flex-row justify-between"
      onClick={() => onClick(expense.id)}
    >
      <div className="flex flex-col justify-center w-xl text-left mx-2">
        <h3 className="text-xl">{expense.name}</h3>
      </div>
      <div className="flex flex-col justify-center w-xl text-left mx-2">
        <p>Amount: {formatCurrency(expense.amount)}</p>
        <p>Day Due: {expense.dueDay}</p>
      </div>
      <div className="flex flex-col justify-center w-xl text-left mx-2">
        <p>Expense Type: {expense.expenseType}</p>
      </div>
    </div>
  );
}
