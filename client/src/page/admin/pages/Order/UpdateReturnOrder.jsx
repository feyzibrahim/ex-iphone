import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { updateReturnOrderStatus } from "../../../../redux/actions/admin/ordersAction";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getPassedDateOnwardDateForInput,
  getTodayOnwardDateForInput,
} from "../../../../Common/functions";

const UpdateReturnOrder = ({ toggleModal, data }) => {
  const { id, status } = data;
  const dispatch = useDispatch();
  const orderDate = getPassedDateOnwardDateForInput(data.deliveryDate);
  console.log(data);
  const todayDate = getTodayOnwardDateForInput();

  const initialValues = {
    status: status,
    date: "",
    description: "",
    refund: "",
    reason: "",
  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    date: Yup.date().nullable().required("Date is required"),
    description: Yup.string(),
    refund: Yup.string().nullable(),
    reason: Yup.string().nullable(),
  });

  const handleSubmit = (values) => {
    if (values.status !== "return rejected") {
      delete values.reason;
    }
    if (values.status !== "returned" && values.refund === "") {
      delete values.refund;
    }

    dispatch(updateReturnOrderStatus({ id, formData: values })).then(() => {
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
        {({ values }) => (
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
                <option value="return request" className="capitalize">
                  return request
                </option>
                <option value="return approved" className="capitalize">
                  return approve
                </option>
                <option value="return rejected" className="capitalize">
                  return reject
                </option>
                <option value="pickup completed" className="capitalize">
                  pickup complete
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
                min={orderDate}
                max={todayDate}
                className="px-5 py-2 w-full bg-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500"
              />
            </div>

            {values.status === "returned" && (
              <div key={values.status}>
                <p>Initiate Refund?</p>
                <Field
                  as="select"
                  name="refund"
                  className="capitalize px-5 py-2 w-full bg-gray-300 rounded-lg"
                >
                  <option value="" className="capitalize">
                    choose yes or no
                  </option>
                  <option value="yes" className="capitalize">
                    yes
                  </option>
                  <option value="no" className="capitalize">
                    no
                  </option>
                </Field>
                <ErrorMessage
                  name="refund"
                  component="div"
                  className="text-red-500"
                />
              </div>
            )}

            {values.status === "return rejected" && (
              <div key={values.status}>
                <p>Reason</p>
                <Field
                  name="reason"
                  as="textarea"
                  className="px-5 py-2 w-full bg-gray-300 rounded-lg"
                  // className="capitalize px-5 py-2 w-full bg-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="reason"
                  component="div"
                  className="text-red-500"
                />
              </div>
            )}

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
        )}
      </Formik>
    </div>
  );
};

export default UpdateReturnOrder;
