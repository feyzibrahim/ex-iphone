import axios from "axios";
import { URL } from "@common/api";
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
  // Download PDF
  const downloadPDF = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/admin/order-generate-pdf${query}`,
        {
          responseType: "arraybuffer",
          ...config,
        }
      );

      if (response.data) {
        setLoading(false);
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "orders.pdf";
      link.click();
    } catch (error) {
      setLoading(false);
      console.error("Error downloading PDF:", error.message);
    }
  };

  // Download CSV
  const downloadCSV = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/admin/order-generate-csv${query}`,
        {
          responseType: "blob",
          ...config,
        }
      );

      if (response.data) {
        setLoading(false);
      }

      const blob = new Blob([response.data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "orders.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setLoading(false);
      console.error("Error downloading PDF:", error.message);
    }
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

    if (selectedType === "pdf") {
      downloadPDF(query);
    }

    if (selectedType === "csv") {
      downloadCSV(query);
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
