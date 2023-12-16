import React, { useRef, useState } from "react";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewCategory } from "../../../../redux/actions/admin/categoriesAction";
import CustomSingleFileInput from "../../Components/CustomSingleFileInput";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ConfirmModal from "../../../../components/ConfirmModal";

const CreateCategories = () => {
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

    const updatedFormData = new FormData();
    updatedFormData.append("name", value.title);
    updatedFormData.append("description", value.description);
    updatedFormData.append("imgURL", value.imageURL);
    setFormData(updatedFormData);
  };

  const saveCategory = () => {
    dispatch(createNewCategory(formData));
    toggleModel();
    navigate(-1);
  };

  const initialValues = {
    title: "",
    description: "",
    imageURL: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    imageURL: Yup.mixed().required("File is required"),
  });

  return (
    <>
      {showModal && (
        <ConfirmModal
          negativeAction={toggleModel}
          positiveAction={saveCategory}
          title="Confirm Creation?"
        />
      )}
      <div className="p-5 w-full overflow-y-scroll">
        {/* Top Bar */}
        <div className="flex justify-between items-center text-sm font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Create Category</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs
              list={["Dashboard", "Category List", "Create Category"]}
            />
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
        <div className="admin-div">
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={showConfirm}
            validationSchema={validationSchema}
          >
            {({ values, setFieldValue }) => (
              <Form className="lg:flex gap-5">
                <div className="lg:w-1/3 mb-3 lg:mb-0">
                  <h1 className="font-bold mb-3">Product Thumbnail</h1>
                  <CustomSingleFileInput
                    onChange={(file) => {
                      setFieldValue("imageURL", file);
                    }}
                  />
                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="imageURL"
                    component="span"
                  />
                </div>
                <div className="lg:w-2/3">
                  <p>
                    <label htmlFor="title" className="admin-label">
                      Category Title
                    </label>
                  </p>
                  <Field
                    name="title"
                    placeholder="Type the category title here"
                    className="admin-input"
                  />
                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="title"
                    component="span"
                  />

                  <p>
                    <label htmlFor="description" className="admin-label">
                      Category Description
                    </label>
                  </p>
                  <Field
                    name="description"
                    as="textarea"
                    className="admin-input h-36 lg:h-64"
                    placeholder="Type the category description here"
                  />
                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="description"
                    component="span"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateCategories;
