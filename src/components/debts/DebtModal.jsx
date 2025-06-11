import { useState } from "react";
import Modal from "../Modal";

export default function DebtModal({onClickSave, onClickClose, initialDebt, onClickDelete, isEditing = false}) {
  const [debt, setDebt] = useState(initialDebt)

  function handleChange(event) {
    setDebt(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleClose() {
    setDebt({});
    onClickClose();
  }

  function handleSave() {
    onClickSave(debt);
    onClickClose();
  }

  function handleDelete() {
    onClickDelete(debt._id);
    onClickClose();
  }

  return (
    <Modal>
      <div className="flex flex-col justify-center content-center text-center">
        <h1 className="text-2xl text-slate-800">New Debt</h1>
        <form>
          <p className="py-2">
            <label>Debt Name: </label>
            <input className="bg-slate-200 rounded-xl" type="text" name="name" value={debt.name || ''} onChange={handleChange} />
          </p>
          <p className="py-2">
            <label>Original Balance: </label>
            <input className="bg-slate-200 rounded-xl" type="number" name="originalBalance" value={debt.originalBalance || ''} onChange={handleChange} />
          </p>
          <p className="py-2">
            <label>Current Balance: </label>
            <input className="bg-slate-200 rounded-xl" type="number" name="currentBalance" value={debt.currentBalance || ''} onChange={handleChange} />
          </p>
          <p className="py-2">
            <label>APR: </label>
            <input className="bg-slate-200 rounded-xl" type="number" name="apr" value={debt.apr || ''} onChange={handleChange} />
          </p>
          <p className="py-2">
            <label>Original Term: </label>
            <input className="bg-slate-200 rounded-xl" type="number" name="originalTerm" value={debt.originalTerm || ''} onChange={handleChange} />
          </p>
          <p className="py-2">
            <label>Minimum Payment: </label>
            <input className="bg-slate-200 rounded-xl" type="number" name="minimumPayment" value={debt.minimumPayment || ''} onChange={handleChange} />
          </p>
        </form>
        <p className="my-2">
          <button onClick={handleSave} className="text-md px-4 py-2 mr-2 cursor-pointer bg-slate-700 text-slate-50 rounded-lg">Save</button>
          <button onClick={handleClose} className="text-md px-4 py-2 cursor-pointer bg-slate-50 text-slate-700 border-slate-700 border-1 rounded-lg">Cancel</button>
          { isEditing && <button onClick={handleDelete} className="text-md px-4 py-2 ml-2 cursor-pointer bg-red-400 text-slate-700 rounded-lg">Delete</button> }
        </p>
      </div>
    </Modal>
  );
}
