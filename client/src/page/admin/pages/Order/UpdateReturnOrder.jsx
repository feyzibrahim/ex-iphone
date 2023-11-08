import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { updateOrderStatus } from "../../../../redux/actions/admin/ordersAction";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "Yup";

const UpdateReturnOrder = ({ toggleModal, data }) => {
  const { id, status } = data;
  const dispatch = useDispatch();

  const initialValues = {
    status: status,
    date: "", // Add default value for date if necessary
    description: "", // Add default value for description if necessary
  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    date: Yup.date().nullable().required("Date is required"),
    description: Yup.string(),
  });

  const handleSubmit = (values) => {
    dispatch(updateOrderStatus({ id, formData: values })).then(() => {
      toggleModal({});
    });
  };

  return (
    <div className="w-2/6 bg-white p-5 rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Update Order</h1>
            <AiOutlineClose
              className="text-2xl cursor-pointer hover:text-gray-500"
              onClick={() => toggleModal({})}
            />
          </div>
          <div className="py-2">
            <p>Status</p>
            <Field
              as="select"
              name="status"
              className="capitalize px-5 py-2 w-full bg-gray-300 rounded-lg"
            >
              <option value="awaiting return approval" className="capitalize">
                awaiting return approval
              </option>
              <option value="awaiting return pickup" className="capitalize">
                awaiting return pickup
              </option>
              <option value="pickup completed" className="capitalize">
                pickup completed
              </option>
              <option value="returned" className="capitalize">
                returned
              </option>
            </Field>
            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="py-2">
            <p>Date</p>
            <Field
              type="date"
              name="date"
              className="px-5 py-2 w-full bg-gray-300 rounded-lg"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="py-2">
            <p>Description</p>
            <Field
              type="text"
              name="description"
              as="textarea"
              className="px-5 py-2 w-full bg-gray-300 rounded-lg"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            className="btn-blue text-white uppercase w-full text-sm"
          >
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateReturnOrder;
