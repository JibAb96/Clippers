import React, { MouseEventHandler, ReactNode } from "react";

type Props = {
  isOpen: Boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null; //Nothing to be returned if modal has not been signalled to be open

  return (
    <div className="fixed inset-0 z-50 flex justify-center align-center mt-4">
      {/* Modal overlay */}
      <div
        className="fixed inset-1 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      {children}
    </div>
  );
};

export default Modal;
