import React from "react";

import useExportHook from "./useExportHook";

const ExportModal = ({ toggleExportModal }) => {
  const {
    loading,
    handleDownload,
    selectedType,
    changeSelectedType,
    selectedDate,
    changeSelectedDate,
  } = useExportHook();

  if (loading) {
    return (
      <div className="px-10 py-5 w-1/3 bg-white rounded-lg h-3/5 flex justify-center items-center">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className={`px-10 py-5 w-1/3 bg-white rounded-lg`}>
      <h1 className="my-5 font-semibold text-xl">Export Orders</h1>
      <div
        className={`border-2 py-1 px-3 my-2 rounded flex gap-2 items-center cursor-pointer ${
          selectedDate === "all" ? "border-blue-400" : ""
        }`}
        onClick={() => changeSelectedDate("all")}
      >
        <input
          type="radio"
          name="chosenDate"
          id="chosenDate"
          checked={selectedDate === "all"}
        />
        <p>All</p>
      </div>
      <div
        className={`border-2 py-1 px-3 my-2 rounded flex gap-2 items-center cursor-pointer ${
          selectedDate === "custom" ? "border-blue-400" : ""
        }`}
        onClick={() => changeSelectedDate("custom")}
      >
        <input
          type="radio"
          name="chosenDate"
          id="chosenDate"
          checked={selectedDate === "custom"}
        />
        <p>Choose Date</p>
      </div>
      {selectedDate === "custom" && (
        <div>
          <p>Starting Date</p>
          <input
            type="date"
            name="date"
            id="date"
            className="border-2 py-1 px-3 my-2 rounded flex gap-2 items-center w-full"
          />
          <p>Ending Date</p>
          <input
            type="date"
            name="date"
            id="date"
            className="border-2 py-1 px-3 my-2 rounded flex gap-2 items-center w-full"
          />
        </div>
      )}

      <div>
        <h1>Choose Type</h1>
        <div
          className={`border-2 py-1 px-3 my-2 rounded flex gap-2 items-center cursor-pointer ${
            selectedType === "excel" ? "border-blue-400" : ""
          }`}
          onClick={() => changeSelectedType("excel")}
        >
          <input
            type="radio"
            name="chosenType"
            id="chosenType"
            checked={selectedType === "excel"}
          />
          <p>Excel</p>
        </div>
        <div
          className={`border-2 py-1 px-3 my-2 rounded flex gap-2 items-center cursor-pointer ${
            selectedType === "pdf" ? "border-blue-400" : ""
          }`}
          onClick={() => changeSelectedType("pdf")}
        >
          <input
            type="radio"
            name="chosenType"
            id="chosenType"
            checked={selectedType === "pdf"}
          />
          <p>PDF</p>
        </div>
        <div
          className={`border-2 py-1 px-3 my-2 rounded flex gap-2 items-center cursor-pointer ${
            selectedType === "CSV" ? "border-blue-400" : ""
          }`}
          onClick={() => changeSelectedType("CSV")}
        >
          <input
            type="radio"
            name="chosenType"
            id="chosenType"
            checked={selectedType === "CSV"}
          />
          <p>CSV</p>
        </div>
      </div>

      <div className="flex gap-5 justify-end mt-5">
        <button
          className="btn-red-no-pad text-white py-2 px-5"
          onClick={toggleExportModal}
        >
          Cancel
        </button>
        <button
          className="btn-blue-no-pad text-white py-2 px-5"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ExportModal;
