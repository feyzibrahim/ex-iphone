import axios from "axios";
import { URL } from "@common/links";
import { config } from "@common/configurations";
import { useState } from "react";

const useExportHook = () => {
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState("all");
  const changeSelectedDate = (value) => {
    setSelectedDate(value);
  };

  const [selectedType, setSelectedType] = useState("excel");
  const changeSelectedType = (value) => {
    setSelectedType(value);
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/admin/generateReport`, {
        responseType: "blob",
        ...config,
      });

      if (response.data) {
        setLoading(false);
      }

      // Create a download link and trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.download = "orders.xlsx";
      downloadLink.click();
    } catch (error) {
      console.error("Error downloading Excel:", error.message);
    }
  };

  return {
    loading,
    handleDownload,
    selectedType,
    changeSelectedType,
    selectedDate,
    changeSelectedDate,
  };
};

export default useExportHook;
