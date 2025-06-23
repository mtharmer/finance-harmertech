import { createPortal } from 'react-dom';

export default function Modal({children}) {
  return (
    createPortal(
      <div className="relative z-10" data-testid='modal-container'>
        <div className="fixed inset-0 bg-slate-200/75 transition-opacity" aria-hidden="true"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-slate-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    , document.getElementById('modal-root'))
  );
}
