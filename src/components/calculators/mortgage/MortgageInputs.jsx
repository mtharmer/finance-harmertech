import NumberInput from '../NumberInput';

export default function MortgageInputs({inputs, onInputChange, onRadioChange}) {
  return (
    <form className="space-y-4" data-testid='mortgage-container-inputs'>
      <NumberInput label="Loan Amount" name="loanAmount" value={inputs.loanAmount} onChange={onInputChange} data-testid='mortgage-container-loan-amount-input' />
      <NumberInput label="Interest Rate (%)" name="interestRate" value={inputs.interestRate} onChange={onInputChange} data-testid='mortgage-container-interest-rate-input' />
      <NumberInput label="Loan Term (years)" name="loanTerm" value={inputs.loanTerm} onChange={onInputChange} data-testid='mortgage-container-loan-term-input' />
      <NumberInput label="Property Tax (monthly)" name="propertyTax" value={inputs.propertyTax} onChange={onInputChange} data-testid='mortgage-container-property-tax-input' />
      <NumberInput label="Insurance (monthly)" name="homeownersInsurance" value={inputs.homeownersInsurance} onChange={onInputChange} data-testid='mortgage-container-homeowners-insurance-input' />
      <NumberInput label="PMI (monthly)" name="pmi" value={inputs.pmi} onChange={onInputChange} data-testid='mortgage-container-pmi-input' />
      <div className='m-2 text-center'>
        <label className="inline-block items-center cursor-pointer">
          <span className='mr-2'>Add Extra Payments?</span>
          <input type="checkbox" value={inputs.addExtraPayment} className="sr-only peer" onChange={(e) => onRadioChange('addExtraPayment', e.target.checked)} data-testid='mortgage-container-add-extra-payment-checkbox' />
          <div className="relative w-11 h-6 mt-2 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <NumberInput label="Extra Payment Amount" name="extraPayment" value={inputs.extraPayment} onChange={onInputChange} disabled={!inputs.addExtraPayment} data-testid='mortgage-container-extra-payment-input' />
    </form>
  );
}
