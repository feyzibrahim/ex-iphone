import date from "date-and-time";
import { formatDistanceToNow } from "date-fns";

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

export const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
