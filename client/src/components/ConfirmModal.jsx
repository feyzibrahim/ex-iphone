import React from "react";

const ConfirmModal = ({ title, positiveAction, negativeAction }) => {
  return (
    <div className="w-full h-screen bg-slate-600 fixed top-0 left-0 z-10 bg-opacity-50 flex items-center justify-center">
      <div className="px-20 py-5 bg-white rounded-xl text-center">
        <h1>{title}</h1>
        <div className="flex gap-5 mt-5">
          <button
            className="admin-button-fl bg-gray-200 text-blue-700"
            onClick={negativeAction}
          >
            Cancel
          </button>
          <button
            className="admin-button-fl bg-blue-700 text-white"
            onClick={positiveAction}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
