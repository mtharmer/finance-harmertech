import Sidebar from "./Sidebar";
import MortgageCalculator from "./calculators/mortgage/MortgageCalculator";
import LoanCalculator from "./calculators/LoanCalculator";

import { useState } from "react";

export default function Calculators() {
  const [selectedTab, setSelectedTab] = useState("");
  function handleSelectTab(tab) {
    setSelectedTab(tab);
  }

  let content = (
    <>
      <h1 className="text-3xl font-bold text-center mt-10">
        Welcome to the Calculators Page
      </h1>
      <p className="text-center mt-4">
        Here you can find various calculators to help with your calculations.
      </p>
    </>
  );

  if (selectedTab === "mortgage") {
    content = <MortgageCalculator />;
  } else if (selectedTab === "loan") {
    content = <LoanCalculator />;
  }

  return (
    <>
      <Sidebar onSelectTab={handleSelectTab} />
      <main className="ml-64 p-4">
        {content}
      </main>
    </>
  );
}