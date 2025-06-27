import { useState } from "react"
import NumberInput from "../NumberInput";

export default function MortgageInputs({initialMortgage = {}, onSubmit, onCancel, onDelete}) {
  const [mortgage, setMortgage] = useState(initialMortgage);

  function handleChange(field, val) {
    setMortgage((prev) => {
      return {
        ...prev,
        [field]: val
      }
    })
  }

  return (
    <div className="flex justify-center mx-16 p-8 shadow-md shadow-slate-700" data-testid="mortgage-inputs">
      <form className="space-y-4">
        <div className="flex flex-row">
          <div className="flex flex-col min-w-72">
            <NumberInput label="Original Balance" name="originalBalance" value={mortgage.originalBalance} onChange={handleChange} required data-testid='mortgage-inputs-original-balance' /> 
            <NumberInput label="Down Payment" name="downPayment" value={mortgage.downPayment} onChange={handleChange} />
            <NumberInput label="Current Balance" name="currentBalance" value={mortgage.currentBalance} onChange={handleChange} required />
            <NumberInput label="APR" name="apr" value={mortgage.apr} onChange={handleChange} required />
            <NumberInput label="Term (months)" name="term" value={mortgage.term} onChange={handleChange} required />
          </div>
          <div className="flex flex-col ml-16 min-w-72">
            <NumberInput label="Payment (principal and interest)" name="payment" value={mortgage.payment} onChange={handleChange} required />
            <NumberInput label="Property Tax" name="tax" value={mortgage.tax} onChange={handleChange} />
            <NumberInput label="Homeowner's Insurance" name="insurance" value={mortgage.insurance} onChange={handleChange} />
            <NumberInput label="PMI" name="pmi" value={mortgage.pmi} onChange={handleChange} />
            <NumberInput label="Extra Monthly Payment" name="extraPayment" value={mortgage.extraPayment} onChange={handleChange} />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="text-md px-4 py-2 cursor-pointer rounded bg-blue-700 m-4 text-white"
            onClick={() => onSubmit(mortgage)}>Save</button>
          <button type="button" className="text-md px-4 py-2 ml-2 cursor-pointer rounded bg-slate-50 border border-slate-800 m-4 text-slate-800"
            onClick={onCancel}>Cancel</button>
          {initialMortgage?.originalBalance && <button type="button" className="text-md px-4 py-2 ml-2 cursor-pointer rounded bg-red-700 m-4 text-white"
            onClick={onDelete}>Delete</button>}
        </div>
      </form>
    </div>
  );
}
