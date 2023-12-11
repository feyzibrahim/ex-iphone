import React, { useState, useEffect, useRef } from "react";
import { format, isAfter } from "date-fns";
import { DayPicker } from "react-day-picker";
import { AiOutlineCalendar } from "react-icons/ai";
import "react-day-picker/dist/style.css";

const RangeDatePicker = ({ handleFilter }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState("");
  const [showDate, setShowDate] = useState("Select Date");

  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const today = new Date();
  const datePickerRef = useRef(null);

  useEffect(() => {
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
        <AiOutlineCalendar /> {showDate}
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
                setStartingDate(pickedDate.from);
              }
              if (pickedDate && pickedDate.to) {
                setEndingDate(pickedDate.to);
              }
            }}
          />
          <div className="flex gap-2">
            <button
              className="btn-blue text-white w-full"
              onClick={() => {
                let date = `${format(
                  new Date(startingDate),
                  "dd/MM/yyyy"
                )} : ${format(new Date(endingDate), "dd/MM/yyyy")}`;
                setShowDate(date);
                toggleDatePicker();
                handleFilter(
                  "startingDate",
                  format(new Date(startingDate), "dd/MM/yyyy")
                );
                handleFilter(
                  "endingDate",
                  format(new Date(endingDate), "dd/MM/yyyy")
                );
              }}
            >
              Save
            </button>
            <button
              className="btn-red-border text-white w-full"
              onClick={() => {
                setShowDate("Select Date");
                toggleDatePicker();
                setRange("");
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
