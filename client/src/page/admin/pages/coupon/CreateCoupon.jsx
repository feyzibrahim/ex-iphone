import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ConfirmModal from "../../../../components/ConfirmModal";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { createCoupon } from "../../../../redux/actions/admin/couponsAction";
import { getTomorrowOnwardsDateForInput } from "../../../../Common/functions";

const CreateCoupon = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formikRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const toggleModel = () => {
    setShowModal(!showModal);
  };

  const [formData, setFormData] = useState(new FormData());
  const showConfirm = (value) => {
    toggleModel();

    setFormData(value);
  };

  const createCouponFunction = () => {
    dispatch(createCoupon(formData));
    toggleModel();
    navigate(-1);
  };

  const initialValues = {
    code: "",
    description: "",
    type: "percentage",
    value: 0,
    minimumPurchaseAmount: 0,
    maximumUses: 0,
    expirationDate: "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Type is required"),
    value: Yup.number().min(0).required("Value is required"),
    minimumPurchaseAmount: Yup.number().min(0).required("Value is required"),
    maximumUses: Yup.number().min(0).required("Value is required"),
    expirationDate: Yup.date().required("Expiry date is required"),
  });

  const dateFromTomorrow = getTomorrowOnwardsDateForInput();

  return (
    <>
      {showModal && (
        <ConfirmModal
          negativeAction={toggleModel}
          positiveAction={createCouponFunction}
          title="Confirm Creation?"
        />
      )}
      <div className="p-5 w-full overflow-y-scroll">
        {/* Top Bar */}
        <div className="flex justify-between items-center text-sm font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Create Coupon</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs list={["Dashboard", "Coupon List", "Create Coupon"]} />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="admin-button-fl bg-gray-200 text-blue-700"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
              Cancel
            </button>
            <button
              type="submit"
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => {
                formikRef.current.submitForm();
              }}
            >
              <AiOutlineSave />
              Save
            </button>
          </div>
        </div>
        {/* Category Information */}
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={showConfirm}
          validationSchema={validationSchema}
        >
          <Form className="lg:flex gap-5 items-start">
            <div className="admin-div lg:w-2/3">
              <p>
                <label htmlFor="code" className="admin-label">
                  Code
                </label>
              </p>
              <Field
                name="code"
                placeholder="Type the coupon code here"
                className="admin-input uppercase"
              />
              <ErrorMessage
                className="text-sm text-red-500"
                name="code"
                component="span"
              />

              <p>
                <label htmlFor="description" className="admin-label">
                  Coupon Description
                </label>
              </p>
              <Field
                name="description"
                as="textarea"
                className="admin-input h-36 lg:h-64"
                placeholder="Type the coupon description here"
              />
              <ErrorMessage
                className="text-sm text-red-500"
                name="description"
                component="span"
              />

              <p>
                <label htmlFor="type" className="admin-label">
                  Coupon Type
                </label>
              </p>
              <Field as="select" name="type" className="capitalize admin-input">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </Field>
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="lg:w-1/3">
              <div className="admin-div">
                <p>
                  <label htmlFor="value" className="admin-label">
                    Value
                  </label>
                </p>
                <Field
                  name="value"
                  placeholder="Type the coupon code here"
                  className="admin-input"
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="value"
                  component="span"
                />
                <p>
                  <label
                    htmlFor="minimumPurchaseAmount"
                    className="admin-label"
                  >
                    Minimum Purchase Amount
                  </label>
                </p>
                <Field
                  name="minimumPurchaseAmount"
                  placeholder="Type the coupon code here"
                  className="admin-input"
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="minimumPurchaseAmount"
                  component="span"
                />
                <p>
                  <label htmlFor="maximumUses" className="admin-label">
                    Maximum Uses
                  </label>
                </p>
                <Field
                  name="maximumUses"
                  placeholder="Type the coupon code here"
                  className="admin-input"
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="maximumUses"
                  component="span"
                />
              </div>
              <div className="admin-div">
                <p>
                  <label htmlFor="expirationDate" className="admin-label">
                    Expiry Date
                  </label>
                </p>
                <Field
                  name="expirationDate"
                  type="date"
                  min={dateFromTomorrow}
                  placeholder="Type the coupon code here"
                  className="admin-input"
                />
                <ErrorMessage
                  className="text-sm text-red-500"
                  name="expirationDate"
                  component="span"
                />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CreateCoupon;
