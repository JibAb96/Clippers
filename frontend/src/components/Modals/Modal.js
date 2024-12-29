import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; //Nothing to be returned if modal has not been signalled to be open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal overlay */}
      <div 
        className="fixed inset-1 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div 
        role="dialog"
        aria-labelledby="modal-title"
        className="relative bg-white rounded-lg m-5 p-6 w-full max-w-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
