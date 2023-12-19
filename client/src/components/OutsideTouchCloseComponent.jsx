import React, { useEffect, useRef } from "react";

const OutsideTouchCloseComponent = ({ children, toggleVisibility, style }) => {
  const refForReference = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refForReference.current &&
        !refForReference.current.contains(event.target)
      ) {
        toggleVisibility();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={refForReference} className={style}>
      {children}
    </div>
  );
};

export default OutsideTouchCloseComponent;
