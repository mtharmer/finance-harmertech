import { useState } from "react";
import Modal from "../Modal";

export default function MonthlyExpenseModal({onClickSave, onClickClose, initialExpense, onClickDelete, isEditing = false}) {
  const [expense, setExpense] = useState(initialExpense)

  const titleText = (isEditing) ? "Edit Monthly Expense" : "New Monthly Expense"
  const saveButtonText = (isEditing) ? "Update" : "Create"

  function handleChange(event) {
    setExpense(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleClose() {
    setExpense({});
    onClickClose();
  }

  function handleSave() {
    onClickSave(expense);
    onClickClose();
  }

  function handleDelete() {
    onClickDelete(expense.id);
    onClickClose();
  }

  return (
    <Modal>
      <div className="flex flex-col justify-center content-center text-center">
        <h1 className="text-2xl text-slate-800">{titleText}</h1>
        <form>
          <p className="py-2">
            <label>Expense Name: </label>
            <input className="bg-slate-200 rounded-xl" type="text" name="name" value={expense.name || ''} onChange={handleChange} data-testid='monthly-expenses-modal-name-input'/>
          </p>
          <p className="py-2">
            <label>Amount: </label>
            <input className="bg-slate-200 rounded-xl" type="number" name="amount" value={expense.amount || ''} onChange={handleChange} />
          </p>
          <p className="py-2">
            <label>Day Due each Month: </label>
            <input className="bg-slate-200 rounded-xl" type="number" name="dueDay" value={expense.dueDay || ''} onChange={handleChange} />
          </p>
          <p className="py-2">
            <label>Expense Type: </label>
            <input className="bg-slate-200 rounded-xl" type="text" name="expenseType" value={expense.expenseType || ''} onChange={handleChange} />
          </p>
        </form>
        <p className="my-2">
          <button 
            onClick={handleSave} 
            className="text-md px-4 py-2 mr-2 cursor-pointer bg-slate-700 text-slate-50 rounded-lg"
            data-testid='monthly-expenses-modal-save-button'
          >
            {saveButtonText}
          </button>
          <button 
            onClick={handleClose}
            className="text-md px-4 py-2 cursor-pointer bg-slate-50 text-slate-700 border-slate-700 border-1 rounded-lg"
            data-testid='monthly-expenses-modal-close-button'
          >
            Cancel
          </button>
          { isEditing && 
            <button 
              onClick={handleDelete} 
              className="text-md px-4 py-2 ml-2 cursor-pointer bg-red-400 text-slate-700 rounded-lg"
              data-testid='monthly-expenses-modal-delete-button'
            >
              Delete
            </button> 
          }
        </p>
      </div>
    </Modal>
  );
}
