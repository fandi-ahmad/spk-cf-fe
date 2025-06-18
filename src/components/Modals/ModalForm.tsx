import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { BaseButton } from '../Buttons';
// import { ModalHandle } from '@/interface/ModalHandle';

interface ModalHandle {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  onSave?: () => void
}

export const ModalForm = forwardRef<ModalHandle, ModalProps>(({ title, children, onClose, onSave }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Expose open and close methods
  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
    close: () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    }
  }));

  return (
    <dialog
      ref={dialogRef}
      className="modal relative w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg backdrop:bg-black backdrop:bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">{title || 'Modal Title'}</h2>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={() => {
            if (onClose) onClose();
            if (dialogRef.current) dialogRef.current.close();
          }}
        >
          &times;
        </button>
      </div>
      <div className="text-gray-600">
        {children}
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        
        <BaseButton text='Kembali' bgClassName='bg-slate-500 hover:bg-slate-600'
          onClick={() => {
            if (onClose) onClose();
            if (dialogRef.current) dialogRef.current.close();
          }}
        />
        <BaseButton text='Simpan' bgClassName='bg-blue-500 hover:bg-blue-600'
          onClick={() => {
            if (onSave) onSave();
            // if (dialogRef.current) dialogRef.current.close()
          }}
        />
        
      </div>
    </dialog>
  );
});

