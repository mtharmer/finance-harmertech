import { formatCurrency } from "../../utility/formatter";
import PieChart from "../PieChart";
import colors from 'tailwindcss/colors';

export default function MonthlyExpensesSummary({expenses}) {
  const expenseList = expenses.map((expense) => expense.attributes).sort((a, b) => a.dueDay - b.dueDay)

  const summaryData = {
    total: 0
  }

  for (let index = 0; index < expenseList.length; index++) {
    const element = expenseList[index];
    summaryData.total += +element.amount;
    if (summaryData[element.expenseType]) {
      summaryData[element.expenseType] += +element.amount;
    } else {
      summaryData[element.expenseType] = +element.amount;
    }
  }

  const labels = [...new Set(expenseList.map((expense) => expense.expenseType))];

  let data = [];
  for (let index = 0; index < labels.length; index++) {
    const element = labels[index]
    data.push(summaryData[element]);
  }
  const dataLabel = 'Expense Type';

  const dataColors = [colors.blue[400], colors.blue[800]];

  return (
    <section>
      <div className="flex flex-row w-full justify-center content-center mb-8 space-x-16">
        <div className="flex flex-col max-w-72">
          <PieChart data={data} labels={labels} dataLabel={dataLabel} colors={dataColors} />
        </div>
        <div className="flex flex-col max-w-72 justify-center align-center">
          <p>You have a total of <u>{formatCurrency(summaryData.total)}</u> in monthly payments.</p>
        </div>
      </div>
    </section>
  );
}
