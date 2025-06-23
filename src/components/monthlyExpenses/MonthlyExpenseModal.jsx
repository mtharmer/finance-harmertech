import { useState } from "react";
import Modal from "../modal/Modal";
import ModalInput from "../modal/ModalInput";
import ModalButtons from "../modal/ModalButtons";
import ModalHeader from "../modal/ModalHeader";

export default function MonthlyExpenseModal({onClickSave, onClickClose, initialExpense, onClickDelete, isEditing = false}) {
  const [expense, setExpense] = useState(initialExpense)

  const titleText = (isEditing) ? "Edit Monthly Expense" : "New Monthly Expense"

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
      <div className="flex flex-col justify-center">
        <ModalHeader>{titleText}</ModalHeader>
        <form className="space-y-4 my-4">
          <ModalInput id="expense-name" type="text" name="name" value={expense.name || ''} onChange={handleChange} data-testid='monthly-expenses-modal-name-input'>Expense Name</ModalInput>
          <ModalInput type="number" name="amount" value={expense.amount || ''} onChange={handleChange}>Amount</ModalInput>
          <ModalInput type="number" name="dueDay" value={expense.dueDay || ''} onChange={handleChange}>Day Due each Month</ModalInput>
          <ModalInput type="text" name="expenseType" value={expense.expenseType || ''} onChange={handleChange}>Expense Type</ModalInput>
        </form>
        <ModalButtons id="monthly-expenses" handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete} isEditing={isEditing} />
      </div>
    </Modal>
  );
}
