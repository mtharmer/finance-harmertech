import NumberInput from '../NumberInput';

export default function MortgageInputs({inputs, onInputChange}) {
  return (
    <form className="space-y-4">
      <div className='flex items-center justify-between flex-wrap'>
        <NumberInput label="Loan Amount" name="loanAmount" value={inputs.loanAmount} onChange={onInputChange} />
        <NumberInput label="Interest Rate (%)" name="interestRate" value={inputs.interestRate} onChange={onInputChange} />
        <NumberInput label="Loan Term (years)" name="loanTerm" value={inputs.loanTerm} onChange={onInputChange} />
        <NumberInput label="Property Tax (monthly)" name="propertyTax" value={inputs.propertyTax} onChange={onInputChange} />
        <NumberInput label="Insurance (monthly)" name="homeownersInsurance" value={inputs.homeownersInsurance} onChange={onInputChange} />
        <NumberInput label="PMI (monthly)" name="pmi" value={inputs.pmi} onChange={onInputChange} />
      </div>
    </form>
  );
}
