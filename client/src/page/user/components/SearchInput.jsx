import React, { useState, useRef, useEffect } from "react";

const SearchInput = ({ onInput, onSelect, data, title, placeholder, name }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isListVisible, setListVisibility] = useState(false);
  const inputRef = useRef(null);

  const filteredCountries = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (item) => {
    onInput(name, item.name);
    onSelect(item);
    setSearchTerm(item.name);
    setListVisibility(false);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setListVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full text-sm my-2" ref={inputRef}>
      <p className="my-1 font-semibold">
        <label htmlFor="username">{title} </label>
      </p>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setListVisibility(true);
        }}
        onClick={() => setListVisibility(true)}
        className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
      />

      {searchTerm && isListVisible && (
        <div className="absolute top-16 left-0 w-96 mt-2 overflow-y-auto max-h-40 border rounded shadow-md bg-white">
          <ul>
            {filteredCountries.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="p-2 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
