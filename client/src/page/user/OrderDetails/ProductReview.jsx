import React, { useState } from "react";
import { AiFillStar, AiOutlineClose, AiOutlineStar } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { URL } from "../../../Common/api";
import { createReview } from "../../../redux/actions/user/reviewActions";
import { useDispatch } from "react-redux";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const { setFieldValue } = useFormikContext();
  const handleStarClick = (value) => {
    setRating(value);
    setFieldValue("rating", value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          className={`cursor-pointer text-xl mr-1 ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          {i <= rating ? <AiFillStar /> : <AiOutlineStar />}
        </span>
      );
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

const ProductReview = ({ closeToggle, id, reviewProduct }) => {
  const dispatch = useDispatch();
  const initialValues = {
    rating: "",
    title: "",
    body: "",
  };

  const validationSchema = Yup.object().shape({
    rating: Yup.number().required("Rating is required"),
    title: Yup.string(),
    body: Yup.string(),
  });

  const handleSubmit = async (value) => {
    const createAction = dispatch(
      createReview({ ...value, order: id, product: reviewProduct._id })
    );
    if (createReview.fulfilled.match(createAction)) {
      closeToggle();
    }
  };

  return (
    <div className="bg-gray-100 w-5/6 lg:w-2/6 shadow-2xl overflow-y-auto rounded-lg">
      <div className="bg-white pt-5 pb-3 px-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">Write a Review</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={closeToggle}
        />
      </div>
      <div className="px-5 pt-5 flex items-center gap-5">
        <div className="w-10 h-10 overflow-clip flex justify-center items-center shrink-0">
          {reviewProduct.imageURL ? (
            <img
              src={`${URL}/img/${reviewProduct.imageURL}`}
              alt="img"
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="w-10 h-1w-10 bg-slate-300 rounded-md"></div>
          )}
        </div>
        <div>
          <p className="lg:text-lg font-semibold line-clamp-1">
            {reviewProduct.name}
          </p>
        </div>
      </div>
      <div className="p-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <label htmlFor="rating">
              <p>Rating</p>

              <Field name="rating" as={StarRating} />
              <ErrorMessage
                className="text-sm text-red-500"
                name="rating"
                component="span"
              />
            </label>
            <label htmlFor="title">
              <p className="mt-3">Title</p>
              <Field
                name="title"
                className="w-full py-2 px-5 rounded mt-2"
                placeholder="Write down your review Title"
              />
              <ErrorMessage
                className="text-sm text-red-500"
                name="title"
                component="span"
              />
            </label>
            <label htmlFor="body">
              <p className="mt-3">Feedback</p>

              <Field
                name="body"
                as="textarea"
                className="h-36 lg:h-52 w-full p-5 rounded mt-2"
                placeholder="Write down your feedback about our product & services"
              />
              <ErrorMessage
                className="text-sm text-red-500"
                name="body"
                component="span"
              />
            </label>
            <button className="btn-blue text-white w-full mt-3" type="submit">
              Publish Review
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ProductReview;
