import React from "react";

const Modal = ({ tab }) => {
  return (
    <div className="w-full h-screen bg-slate-600 absolute top-0 left-0 z-10 bg-opacity-50 flex items-center justify-center">
      {tab}
    </div>
  );
};

export default Modal;
