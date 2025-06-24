import { useEffect, useState } from "react";
import { debtList, createDebt, updateDebt, deleteDebt } from "../../api";
import DebtRow from "./DebtRow";
import DebtModal from "./DebtModal";
import { alert, success } from "../../utility/notifications";
import DebtSummary from "./DebtSummary";

const modifyInitialState = {
  creating: false,
  editing: false
}

export default function Debts() {
  const [debts, setDebts] = useState([]);
  const [modifying, setModifying] = useState(modifyInitialState);
  const [selectedDebt, setSelectedDebt] = useState({});

  async function getDebts() {
    try {
      const response = await debtList();
      setDebts(response.data.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    getDebts();
  }, []);

  function handleClickDebt(debt) {
    setModifying({creating: false, editing: true});
    setSelectedDebt(debt.attributes);
  }

  function handleAddDebt() {
    setModifying({creating: true, editing: false});
  }

  async function handleSaveNewDebt(debt) {
    try {
      await createDebt(debt);
      getDebts();
      success('New debt was successfully created!');
    } catch (err) {
      alert(err);
    }
  }

  async function handleUpdateDebt(debt) {
    const debtCopy = {
      id: debt.id,
      name: debt.name,
      originalBalance: debt.originalBalance,
      currentBalance: debt.currentBalance,
      apr: debt.apr,
      originalTerm: debt.originalTerm,
      minimumPayment: debt.minimumPayment
    }
    try {
      await updateDebt(debtCopy);
      getDebts();
      success('Debt was successfully updated!');
    } catch (err) {
      alert(err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDebt(id);
      getDebts();
      success('Debt was successfully deleted!')
    } catch (err) {
      alert(err);
    }
  }

  function handleClose() {
    setModifying(modifyInitialState);
  }

  return (
    <>
      {modifying.editing && <DebtModal onClickSave={handleUpdateDebt} onClickClose={handleClose} initialDebt={selectedDebt} isEditing onClickDelete={handleDelete} /> }
      {modifying.creating && <DebtModal onClickSave={handleSaveNewDebt} onClickClose={handleClose} initialDebt={{}} /> }
      <div className="mx-2">
        <h1 className="text-5xl font-bold text-center my-10" data-testid="debts-header">Debts</h1>
        {debts.length && debts.length > 0 && <DebtSummary debts={debts} />}
        <div className="flex flex-col justify-center content-center rounded-2xl text-center my-4 mx-16">
          <button 
            className="border-slate-800 border-2 rounded-2xl cursor-pointer bg-slate-100 text-slate-700 h-12" 
            onClick={handleAddDebt}
            data-testid="debts-add-button"
          >
            Add New Debt +
          </button>
        </div>
        {debts.map((debt, index) => (
          <DebtRow key={index} debt={debt.attributes} onClick={() => handleClickDebt(debt)} />
        ))}
      </div>
    </>
  );
}
