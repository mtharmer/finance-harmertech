import { useEffect, useState } from "react";
import { monthlyExpenseList, createMonthlyExpense, updateMonthlyExpense, deleteMonthlyExpense } from "../../api";
import { alert, success } from "../../utility/notifications";
import MonthlyExpenseRow from "./MonthlyExpenseRow";
import MonthlyExpenseModal from "./MonthlyExpenseModal";
import MonthlyExpensesSummary from "./MonthlyExpensesSummary";

const modifyInitialState = {
  creating: false,
  editing: false,
  selectedExpense: {}
}

export default function MonthlyExpenses() {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [modifying, setModifying] = useState(modifyInitialState);

  async function getMonthlyExpenses() {
    try {
      const response = await monthlyExpenseList();
      setMonthlyExpenses(response.data.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    getMonthlyExpenses();
  }, []);

  function handleAddExpense() {
    setModifying({creating: true, editing: false, selectedExpense: {}});
  }

  function handleClickExpense(expense) {
    setModifying({creating: false, editing: true, selectedExpense: expense.attributes});
  }

    async function handleSaveNewExpense(expense) {
      // Error checking for fields
  
      // Add promise chaining for better handling
      try {
        await createMonthlyExpense(expense);
        getMonthlyExpenses();
        success('New expense was successfully created!');
      } catch (err) {
        alert(err);
      }
    }
  
    async function handleUpdateExpense(expense) {
      // Error checking for fields
  
      // Add promise chaining for better handling
      try {
        await updateMonthlyExpense(expense);
        getMonthlyExpenses();
        success('Expense was successfully updated!');
      } catch (err) {
        alert(err);
      }
    }
  
    async function handleDelete(id) {
      try {
        await deleteMonthlyExpense(id);
        getMonthlyExpenses();
        success('Expense was successfully deleted!')
      } catch (err) {
        alert(err);
      }
    }
  
    function handleClose() {
      setModifying(modifyInitialState);
    }

  return (
    <>
      {modifying.editing && <MonthlyExpenseModal onClickSave={handleUpdateExpense} onClickClose={handleClose} initialExpense={modifying.selectedExpense} isEditing onClickDelete={handleDelete} /> }
      {modifying.creating && <MonthlyExpenseModal onClickSave={handleSaveNewExpense} onClickClose={handleClose} initialExpense={{}} /> }
      <div className="mx-2">
        <h1 className="text-3xl font-bold text-center my-10" data-testid="monthly-expenses-header">Monthly Expenses</h1>
        {monthlyExpenses && monthlyExpenses.length > 0 && <MonthlyExpensesSummary expenses={monthlyExpenses} /> }
        <div className="flex flex-col justify-center content-center rounded-2xl text-center my-4 mx-16">
          <button 
            className="border-slate-800 border-2 rounded-2xl cursor-pointer bg-slate-100 text-slate-700 h-12" 
            onClick={handleAddExpense}
            data-testid="monthly-expenses-add-button"
          >
            Add New Monthly Expense +
          </button>
        </div>
        {monthlyExpenses.sort((a, b) => a.attributes.dueDay - b.attributes.dueDay).map((expense, index) => (
          <MonthlyExpenseRow key={index} expense={expense.attributes} onClick={() => handleClickExpense(expense)} />
        ))}
      </div>
    </>
  );
}
