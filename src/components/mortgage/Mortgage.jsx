import { useEffect, useState } from "react";
import { getMortgage, createMortgage, deleteMortgage } from "../../api";
import MortgageInputs from "./MortgageInputs";
import MortgageDetails from "./MortgageDetails";
import { alert, success } from "../../utility/notifications";

export default function Mortgage() {
  const [mortgage, setMortgage] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const buttonText = mortgage?.attributes?.originalBalance ? 'Edit Mortgage' : 'Create Mortgage';

  async function doGetMortgage() {
    try {
      const response = await getMortgage();
      setMortgage(response.data.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    doGetMortgage();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const mortgage = event.target;
    const mortgageData = {
      originalBalance: mortgage.originalBalance?.value,
      downPayment: mortgage.downPayment?.value,
      currentBalance: mortgage.currentBalance?.value,
      apr: mortgage.apr?.value,
      term: mortgage.term?.value,
      payment: mortgage.payment?.value,
      tax: mortgage.tax?.value,
      insurance: mortgage.insurance?.value,
      pmi: mortgage.pmi?.value,
      extraPayment: mortgage.extraPayment?.value,
    };
    try {
      await createMortgage(mortgageData);
      success('Successfully created mortgage!');
      setIsEditing(false);
      await doGetMortgage();
    } catch (err) {
      alert(err);
    }
  }

  function handleCancel() {
    setIsEditing(false);
  }

  function handleClickEdit() {
    setIsEditing(true);
  }

  async function handleDelete() {
    try {
      await deleteMortgage();
      success('Successfully deleted mortgage!');
      setMortgage({});
      setIsEditing(false);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Manage Your Mortgage</h1>
      <div className="flex justify-center">
        {!isEditing && <button className="text-md px-4 py-2 cursor-pointer rounded bg-blue-700 m-4 text-white" onClick={handleClickEdit}>{buttonText}</button>}
        {isEditing && <MortgageInputs initialMortgage={mortgage?.attributes} onSubmit={handleSubmit} onCancel={handleCancel} onDelete={handleDelete} />}
      </div>
      <div>
        {!isEditing && mortgage?.attributes && <MortgageDetails mortgage={mortgage.attributes} />}
        {/* TODO - Add graphs for amortizaton and summary data */}
      </div>
      {/* TODO - show amortization table */}
    </div>
  );
}
