import React, { useState } from "react";
import { AiFillStar, AiOutlineClose, AiOutlineStar } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { URL } from "../../../Common/api";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../../redux/actions/user/reviewActions";

const StarRating = ({ initialRating, onChange }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleStarClick = (value) => {
    setRating(value);
    onChange(value);
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

const ProductEditReview = ({ closeToggle, review, product }) => {
  const { loading } = useSelector((state) => state.reviews);

  const dispatch = useDispatch();
  const initialValues = {
    rating: review.rating,
    title: review.title,
    body: review.body,
  };

  const validationSchema = Yup.object().shape({
    rating: Yup.number().required("Rating is required"),
    title: Yup.string(),
    body: Yup.string(),
  });

  const handleSubmit = async (value) => {
    const formData = {
      id: review._id,
      formData: {
        ...value,
        order: review.order,
        product: product.productId._id,
      },
    };

    const updateAction = await dispatch(updateReview(formData));
    if (updateReview.fulfilled.match(updateAction)) {
      closeToggle();
    }
  };

  return (
    <div className="bg-gray-100 w-5/6 lg:w-2/6 shadow-2xl overflow-y-auto rounded-lg">
      <div className="bg-white pt-5 pb-3 px-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">Edit Review</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={closeToggle}
        />
      </div>
      <div className="px-5 pt-5 flex items-center gap-5">
        <div className="w-10 h-10 overflow-clip flex justify-center items-center shrink-0">
          {product && product.productId && product.productId.imageURL ? (
            <img
              src={`${URL}/img/${product.productId.imageURL}`}
              alt="img"
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="w-10 h-1w-10 bg-slate-300 rounded-md"></div>
          )}
        </div>
        <div>
          <p className="lg:text-lg font-semibold line-clamp-1">
            {product && product.productId && product.productId.name}
          </p>
        </div>
      </div>
      <div className="p-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <label htmlFor="rating">
                <p>Rating</p>

                <Field
                  name="rating"
                  as={StarRating}
                  initialRating={review.rating}
                  onChange={(value) => setFieldValue("rating", value)}
                />
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
              <button
                className="btn-blue text-white w-full mt-3"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Update Review"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductEditReview;
