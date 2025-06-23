import { useState } from "react";
import Modal from "../modal/Modal";
import ModalInput from "../modal/ModalInput";
import ModalHeader from "../modal/ModalHeader";
import ModalButtons from "../modal/ModalButtons";

export default function DebtModal({onClickSave, onClickClose, initialDebt, onClickDelete, isEditing = false}) {
  const [debt, setDebt] = useState(initialDebt)

  const titleText = (isEditing) ? "Edit Debt" : "New Debt"

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
    onClickDelete(debt.id);
    onClickClose();
  }

  return (
    <Modal>
      <div className="flex flex-col justify-center">
        <ModalHeader>{titleText}</ModalHeader>
        <form className="space-y-4 my-4">
          <ModalInput type="text" name="name" value={debt.name || ''} onChange={handleChange} data-testid='debts-modal-name-input'>Debt Name</ModalInput>
          <ModalInput type="number" name="originalBalance" value={debt.originalBalance || ''} onChange={handleChange}>Original Balance</ModalInput>
          <ModalInput type="number" name="currentBalance" value={debt.currentBalance || ''} onChange={handleChange}>Current Balance</ModalInput>
          <ModalInput type="number" name="apr" value={debt.apr || ''} onChange={handleChange}>APR</ModalInput>
          <ModalInput type="number" name="originalTerm" value={debt.originalTerm || ''} onChange={handleChange}>Original Term (mo)</ModalInput>
          <ModalInput type="number" name="minimumPayment" value={debt.minimumPayment || ''} onChange={handleChange}>Minimum Payment</ModalInput>
        </form>
        <ModalButtons id="debts" handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete} isEditing={isEditing} />
      </div>
    </Modal>
  );
}
