import MortgageInputs from "./MortgageInputs";
import MortgageAmortization from "./MortgageAmortization";
import calculateMortgage from "../../../utility/calculateMortgage";
import { useState } from "react";
import MortgageResults from "./MortgageResults";

const initialInputs = {
  loanAmount: null,
  interestRate: null,
  loanTerm: null,
  propertyTax: null,
  homeownersInsurance: null,
  pmi: null,
  addExtraPayment: false,
  extraPayment: null,
}

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState(initialInputs);

  function handleInputChange(name, value) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: +value,
    }));
  }

  function handleRadioChange(name, value) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  const [mortgageData, mortgagePayments] = calculateMortgage(inputs);

  return (
    <div data-testid='mortgage-container'>
      <h1 className="text-3xl font-bold text-center mt-10">
        Mortgage Calculator
      </h1>
      <div className="flex justify-center">
        <MortgageInputs inputs={inputs} onInputChange={handleInputChange} onRadioChange={handleRadioChange} />
        {mortgageData && (
          <section>
            <MortgageResults results={mortgageData} />
            {/* <MortgageGraph results={mortgageData} /> */}
          </section>
        )}
      </div>
      <MortgageAmortization results={mortgagePayments} />
    </div>
  );
}
