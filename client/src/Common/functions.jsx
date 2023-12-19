import date from "date-and-time";
import { formatDistanceToNow } from "date-fns";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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

// Rendering star
export const renderStars = (rating) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];

  for (let i = 1; i <= filledStars; i++) {
    stars.push(<AiFillStar key={i} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<AiOutlineStar key="half" className="text-yellow-400" />);
  }

  const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  for (let i = 1; i <= remainingStars; i++) {
    stars.push(
      <AiOutlineStar key={`empty-${i}`} className="text-yellow-400" />
    );
  }

  return stars;
};

// Get todays date for input type limiting
export const getTodayOnwardDateForInput = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const formattedMinDate = date.format(today, "YYYY-MM-DD");
  return formattedMinDate;
};

export const getTomorrowOnwardsDateForInput = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const formattedMinDate = date.format(today, "YYYY-MM-DD");
  return formattedMinDate;
};

export const getPassedDateOnwardDateForInput = (inputDateString) => {
  const inputDate = new Date(inputDateString);
  const formattedDate = date.format(inputDate, "YYYY-MM-DD");
  return formattedDate;
};

// Modify Payment Mode Text

export const modifyPaymentModeText = (mode) => {
  if (mode === "cashOnDelivery") {
    return "Cash on Delivery";
  }
  if (mode === "razorPay") {
    return "Razor Pay";
  }
  if (mode === "myWallet") {
    return "My Wallet";
  }
};
