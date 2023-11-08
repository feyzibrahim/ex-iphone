import date from "date-and-time";

export const getStatusDate = (status, statusHistory) => {
  const filteredStatus = statusHistory.find((item) => item.status === status);

  const originalDate = new Date(filteredStatus.date);

  const formattedDate = date.format(originalDate, "MMM DD, YYYY");

  return formattedDate ? formattedDate : "N/A";
};

export const getStatusReason = (status, statusHistory) => {
  const filteredStatus = statusHistory.find((item) => item.status === status);

  return filteredStatus.reason;
};
