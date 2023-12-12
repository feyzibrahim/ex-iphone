import React, { useState, useEffect, useRef } from "react";
import { format, isAfter } from "date-fns";
import { DayPicker } from "react-day-picker";
import { AiOutlineCalendar } from "react-icons/ai";

const RangeDatePicker = ({
  handleFilter,
  startingDate,
  setStartingDate,
  endingDate,
  setEndingDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState("");

  const today = new Date();
  const datePickerRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const startDate = params.get("startingDate");
    const endDate = params.get("endingDate");
    if (startDate) {
      setStartingDate(startDate);
      handleFilter("startingDate", startDate);
    }
    if (endDate) {
      setEndingDate(endDate);
      handleFilter("endingDate", endDate);
    }

    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div className="relative" ref={datePickerRef}>
      <button
        onClick={() => toggleDatePicker()}
        className="cursor-pointer admin-button-fl bg-white hover:bg-gray-200 active:bg-gray-300"
      >
        <AiOutlineCalendar />{" "}
        {startingDate || endingDate
          ? `${startingDate || `-`} to ${endingDate || `-`}`
          : "Select Date"}
      </button>
      {showDatePicker && (
        <div className="bg-white px-3 py-2 rounded-lg shadow-2xl absolute right-0 top-10 text-sm">
          <DayPicker
            defaultMonth={new Date().now}
            mode="range"
            selected={range}
            showOutsideDays
            disabled={(date) => isAfter(date, today)}
            onSelect={(pickedDate) => {
              setRange(pickedDate);
              if (pickedDate && pickedDate.from) {
                setStartingDate(
                  format(new Date(pickedDate.from), "yyyy-MM-dd")
                );
              }
              if (pickedDate && pickedDate.to) {
                setEndingDate(format(new Date(pickedDate.to), "yyyy-MM-dd"));
              }
            }}
          />
          <div className="flex gap-2">
            <button
              className="btn-blue text-white w-full"
              onClick={() => {
                toggleDatePicker();
                handleFilter("startingDate", startingDate);
                handleFilter("endingDate", endingDate);
              }}
            >
              Save
            </button>
            <button
              className="btn-red-border text-white w-full"
              onClick={() => {
                setStartingDate("");
                setEndingDate("");
                toggleDatePicker();
                setRange("");
                handleFilter("startingDate", "");
                handleFilter("endingDate", "");
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RangeDatePicker;
