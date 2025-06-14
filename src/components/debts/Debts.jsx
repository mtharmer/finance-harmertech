import { useEffect, useState } from "react";
import { debtList, createDebt, updateDebt, deleteDebt } from "../../api";
import DebtRow from "./DebtRow";
import DebtModal from "./DebtModal";

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
      const data = await debtList();
      setDebts(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDebts();
  }, []);

  function handleClickDebt(debt) {
    setModifying({creating: false, editing: true});
    setSelectedDebt(debt);
  }

  function handleAddDebt() {
    setModifying({creating: true, editing: false});
  }

  async function handleSaveNewDebt(debt) {
    // Error checking for fields

    // Add promise chaining for better handling
    try {
      await createDebt(debt);
      getDebts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateDebt(debt) {
    // Error checking for fields

    // Add promise chaining for better handling
    try {
      await updateDebt(debt);
      getDebts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDebt(id);
      getDebts();
    } catch (err) {
      console.error(err);
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
        <h1 className="text-3xl font-bold text-center my-10">Debts</h1>
        <div className="flex flex-col justify-center content-center rounded-2xl text-center my-4 mx-16">
          <button className="border-slate-800 border-2 rounded-2xl cursor-pointer bg-slate-100 text-slate-700 h-12" onClick={handleAddDebt}>
            Add New Debt +
          </button>
        </div>
        {debts.map((debt, index) => (
          <DebtRow key={index} debt={debt} onClick={() => handleClickDebt(debt)} />
        ))}
      </div>
    </>
  );
}
