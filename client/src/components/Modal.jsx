import React from "react";

const Modal = ({ tab }) => {
  return (
    <div className="w-full h-screen bg-slate-600 fixed z-10 bg-opacity-50 flex items-center justify-center">
      {tab}
    </div>
  );
};

export default Modal;
