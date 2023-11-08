import React from "react";

const Modal = ({ tab }) => {
  return (
    <div className="w-full h-screen bg-slate-600 fixed top-0 left-0 z-20 bg-opacity-40 flex items-center justify-center">
      {tab}
    </div>
  );
};

export default Modal;
