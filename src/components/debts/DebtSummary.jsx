import { formatCurrency } from "../../utility/formatter";
import PieChart from "../PieChart";
import colors from 'tailwindcss/colors';

export default function DebtSummary({debts}) {
  const debtList = debts.map((debt) => {
    return debt.attributes;
  });

  const summaryData = {
    originalBalance: 0,
    remainingBalance: 0,
    monthlyPayment: 0,
    originalInterest: 0,
    remainingInterest: 0,
    principalPaid: 0,
    originalTerm: 0,
    remainingPayments: 0,
    interestPaid: 0
  };

  for (let index = 0; index < debtList.length; index++) {
    const element = debtList[index];
    summaryData.originalBalance += +element.originalBalance;
    summaryData.remainingBalance += +element.currentBalance;
    summaryData.monthlyPayment += +element.minimumPayment;
    summaryData.originalInterest += +element.originalInterest;
    summaryData.remainingInterest += +element.remainingInterest;
    summaryData.principalPaid += +element.principalPaid;
    summaryData.interestPaid += +element.originalInterest - +element.remainingInterest;
    summaryData.originalTerm = Math.max(+element.originalTerm, summaryData.originalTerm);
    summaryData.remainingPayments = Math.max(+element.remainingTerm, summaryData.remainingPayments);
  }

  const dataColors = [colors.blue[400], colors.blue[800]];

  const principalLabels = ['Principal Paid', 'Remaining Principal'];
  const principalDataLabel = 'Principal';
  const principalData = [summaryData.principalPaid, summaryData.originalBalance];

  const paidLabels = ['Total Principal', 'Total Interest'];
  const paidDataLabel = 'Principal & Interest';
  const paidData = [summaryData.originalBalance, summaryData.originalInterest];

  const interestLabels = ['Interest Paid', 'Remaining Interest'];
  const interestDataLabel = 'Interest';
  const interestData = [summaryData.interestPaid, summaryData.remainingInterest];

  return (
    <section>
      <div className="flex flex-row w-full justify-center content-center mb-8 space-x-16">
        <div className="flex flex-col max-w-72">
          <PieChart labels={principalLabels} dataLabel={principalDataLabel} data={principalData} colors={dataColors} />
          <p>Your total original principal was <u>{formatCurrency(summaryData.originalBalance)}</u>. You have paid off <u>{formatCurrency(summaryData.principalPaid)}</u> of your loans so far, and have <u>{formatCurrency(summaryData.remainingBalance)}</u> remaining</p>
        </div>
        <div className="flex flex-col max-w-72">
          <PieChart labels={interestLabels} dataLabel={interestDataLabel} data={interestData} colors={dataColors} />
          <p>You started off with <u>{formatCurrency(summaryData.originalInterest)}</u> in interest due. You have paid <u>{formatCurrency(summaryData.interestPaid)}</u> in interest so far, and have <u>{formatCurrency(summaryData.remainingInterest)}</u> remaining.</p>
        </div>
        <div className="flex flex-col max-w-72">
          <PieChart labels={paidLabels} dataLabel={paidDataLabel} data={paidData} colors={dataColors} />
          <p>You have a total of <u>{formatCurrency(summaryData.originalBalance)}</u> in principal and <u>{formatCurrency(summaryData.originalInterest)}</u> in interest due, for a total of <u>{formatCurrency(summaryData.originalBalance + summaryData.originalInterest)}</u> due in payments.</p>
        </div>
      </div>
    </section>
  );
}
