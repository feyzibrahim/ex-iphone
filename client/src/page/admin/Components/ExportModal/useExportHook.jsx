import axios from "axios";
import { URL } from "@common/links";
import { config } from "@common/configurations";
import { useState } from "react";

const useExportHook = () => {
  const [loading, setLoading] = useState(false);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const [selectedDateType, setSelectedDateType] = useState("all");
  const changeSelectedDate = (value) => {
    setSelectedDateType(value);
  };

  const [selectedType, setSelectedType] = useState("excel");
  const changeSelectedType = (value) => {
    setSelectedType(value);
  };

  const handleDownload = () => {
    let query = "?";

    if (startingDate) {
      query += `startingDate=${startingDate}`;
    }
    if (endingDate) {
      query += `&endingDate=${endingDate}`;
    }

    if (selectedType === "excel") {
      downloadExcel(query);
    }
  };

  // Download Excel
  const downloadExcel = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/admin/order-generate-excel${query}`,
        {
          responseType: "blob",
          ...config,
        }
      );

      if (response.data) {
        setLoading(false);
      }

      // Create a download link and trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.download = "orders.xlsx";
      downloadLink.click();
    } catch (error) {
      setLoading(false);
      console.error("Error downloading Excel:", error.message);
    }
  };

  return {
    loading,
    handleDownload,
    selectedType,
    changeSelectedType,
    selectedDateType,
    changeSelectedDate,
    startingDate,
    setStartingDate,
    endingDate,
    setEndingDate,
  };
};

export default useExportHook;
