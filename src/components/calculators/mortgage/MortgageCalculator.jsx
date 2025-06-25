import MortgageCalculatorInputs from "./MortgageCalculatorInputs";
import MortgageCalculatorAmortization from "./MortgageCalculatorAmortization";
import calculateMortgage from "../../../utility/calculateMortgage";
import { useState } from "react";
import MortgageCalculatorResults from "./MortgageCalculatorResults";

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

  const [mortgageData, mortgagePayments, yearlyData] = calculateMortgage(inputs);

  return (
    <div data-testid='mortgage-container'>
      <h1 className="text-3xl font-bold text-center mt-10">
        Mortgage Calculator
      </h1>
      <div className="flex flex-row justify-start mx-8">
        <div className="flex flex-col">
          <MortgageCalculatorInputs inputs={inputs} onInputChange={handleInputChange} onRadioChange={handleRadioChange} />
        </div>
        <div className="flex flex-col ml-24">
          {mortgageData && (
            <section>
              <MortgageCalculatorResults results={mortgageData} yearly={yearlyData} />
            </section>
          )}
        </div>
      </div>
      <MortgageCalculatorAmortization results={mortgagePayments} />
    </div>
  );
}
