import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { updateOrderStatus } from "../../../../redux/actions/admin/ordersAction";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getPassedDateOnwardDateForInput,
  getTodayOnwardDateForInput,
} from "../../../../Common/functions";

const UpdateOrder = ({ toggleModal, data }) => {
  const { id, status, paymentMode, deliveryDate } = data;
  const dispatch = useDispatch();
  const orderDate = getPassedDateOnwardDateForInput(deliveryDate);
  const todayDate = getTodayOnwardDateForInput();

  const initialValues = {
    status: status,
    date: "",
    description: "",
    paymentStatus: "",
  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    date: Yup.date().nullable().required("Date is required"),
    description: Yup.string(),
    paymentStatus: Yup.string().nullable(),
  });

  const handleSubmit = (values) => {
    if (values.status !== "delivered" && values.paymentStatus === "") {
      delete values.paymentStatus;
    }

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
        {({ values }) => (
          <Form>
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Update Order</h1>
              <AiOutlineClose
                className="text-2xl cursor-pointer hover:text-gray-500"
                onClick={() => toggleModal({})}
              />
            </div>
            <p className="bg-blue-100 rounded-lg p-2 mt-5">
              Payment Mode: {paymentMode}
            </p>
            <div className="py-2">
              <p>Status</p>
              <Field
                as="select"
                name="status"
                className="capitalize px-5 py-2 w-full bg-gray-300 rounded-lg"
              >
                <option
                  value="pending"
                  disabled={
                    status === "pending" ||
                    status === "processing" ||
                    status === "shipped" ||
                    status === "delivered"
                  }
                >
                  Pending
                </option>
                <option
                  value="processing"
                  disabled={
                    status === "processing" ||
                    status === "shipped" ||
                    status === "delivered"
                  }
                >
                  Processing
                </option>
                <option
                  value="shipped"
                  disabled={status === "shipped" || status === "delivered"}
                >
                  Shipped
                </option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                {/* <option value="returned">Returned</option> */}
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
            {values.status === "delivered" &&
              paymentMode === "cashOnDelivery" && (
                <div key={values.status}>
                  <p>Payment Collected?</p>
                  <Field
                    as="select"
                    name="paymentStatus"
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
                    name="paymentStatus"
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

export default UpdateOrder;
