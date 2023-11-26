import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const RatingStars = ({ rating, numberOfReviews }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= filledStars; i++) {
      stars.push(<AiFillStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<AiOutlineStar key="half" className="text-yellow-400" />);
    }

    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(<AiOutlineStar key={`empty-${i}`} />);
    }

    return stars;
  };

  return (
    <div className="flex text-sm items-center gap-1 mt-4">
      {renderStars()}
      <p>({numberOfReviews})</p>
    </div>
  );
};

export default RatingStars;
