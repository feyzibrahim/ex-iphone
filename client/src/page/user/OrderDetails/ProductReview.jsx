import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "Yup";
import { cancelOrder } from "../../../redux/actions/user/userOrderActions";
import { useDispatch } from "react-redux";

const ProductReview = ({ closeToggle, id, loadData }) => {
  const dispatch = useDispatch();

  const initialValues = {
    rating: 0,
    feedback: "",
  };

  const validationSchema = Yup.object().shape({
    rating: Yup.number().required("Rating is required"),
    feedback: Yup.string(),
  });

  const handleSubmit = (value) => {
    dispatch(cancelOrder({ formData: value, id: id }))
      .then(() => {
        loadData();
        closeToggle();
      })
      .catch((error) => {
        console.error("Error cancelling order: ", error);
      });
  };

  return (
    <div className="bg-gray-100 w-5/6 lg:w-2/6 shadow-2xl overflow-y-auto rounded-lg">
      <div className="bg-white pt-5 pb-3 px-5 flex items-center justify-between">
        <h1 className="font-bold text-lg ">Write a Review</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={closeToggle}
        />
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

              <Field name="rating" className="w-full px-5 py-2 rounded mt-2" />
              <ErrorMessage
                className="text-sm text-red-500"
                name="rating"
                component="span"
              />
            </label>
            <label htmlFor="feedback">
              <p>Feedback</p>

              <Field
                name="feedback"
                as="textarea"
                className="h-36 lg:h-52 w-full p-5 rounded mt-2"
                placeholder="Write down your feedback about our product & services"
              />
              <ErrorMessage
                className="text-sm text-red-500"
                name="feedback"
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
