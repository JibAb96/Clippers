import React, { ReactNode } from "react";

type Props = {
  isOpen: Boolean;
  children: ReactNode;
};

const Modal = ({ isOpen, children }: Props) => {
  if (!isOpen) return null; //Nothing to be returned if modal has not been signalled to be open

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
      {/* Modal overlay */}
      <div
        className="fixed inset-1 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div
        className="relative bg-primary rounded-lg max-w-[18rem] sm:max-w-3xl p-6 
    max-h-[90vh] overflow-y-auto
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
