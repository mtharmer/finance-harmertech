export default function ModalButtons({id, handleSave, handleClose, handleDelete, isEditing}) {
  const saveButtonText = (isEditing) ? "Update" : "Create"
  return (
    <p id={`${id}-modal`} className="my-2 content-center text-center">
      <button 
        onClick={handleSave} 
        className="text-md px-4 py-2 mr-2 cursor-pointer bg-slate-700 text-slate-50 rounded-lg"
        data-testid={`${id}-modal-save-button`}
      >
        {saveButtonText}
      </button>
      <button 
        onClick={handleClose}
        className="text-md px-4 py-2 cursor-pointer bg-slate-50 text-slate-700 border-slate-700 border-1 rounded-lg"
        data-testid={`${id}-modal-close-button`}
      >
        Cancel
      </button>
      { isEditing && 
        <button 
          onClick={handleDelete} 
          className="text-md px-4 py-2 ml-2 cursor-pointer bg-red-400 text-slate-700 rounded-lg"
          data-testid={`${id}-modal-delete-button`}
        >
          Delete
        </button> 
      }
    </p>
  )
}