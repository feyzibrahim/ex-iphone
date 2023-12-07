import React, { useEffect, useState } from "react";
import { AiOutlineSave, AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import CustomFileInput from "../../Components/CustomFileInput";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../../redux/actions/admin/productActions";
import CustomSingleFileInput from "../../Components/CustomSingleFileInput";
import ConfirmModal from "../../../../components/ConfirmModal";
import axios from "axios";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";
import { URL } from "@common/api";

const EditProduct = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [statusList, setStatusList] = useState([
    "draft",
    "published",
    "unpublished",
    "out of stock",
    "low quantity",
  ]);

  const [duplicateFetchData, setDuplicateFetchData] = useState({});
  const [fetchedData, setFetchedData] = useState({
    name: "",
    description: "",
    stockQuantity: 0,
    category: "",
    imageURL: "",
    status: "",
    attributes: [],
    price: "",
    markup: "",
    moreImageURL: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFetchedData({
      ...fetchedData,
      [name]: value,
    });
  };

  // Fetching The product details initially
  useEffect(() => {
    const getProductDetails = async () => {
      axios.get(`${URL}/admin/product/${id}`).then(({ data }) => {
        setFetchedData({ ...data.product });
        console.log(data);

        setDuplicateFetchData({ ...data.product });
      });
    };
    getProductDetails();
  }, []);

  // Functions for thumbnail uploads
  const [newThumb, setNewThumb] = useState("");
  const handleSingleImageInput = (img) => {
    setNewThumb(img);
  };

  // Functions for product images uploads
  const [newMoreImage, setNewMoreImage] = useState([]);
  const handleMultipleImageInput = (files) => {
    setNewMoreImage(files);
  };

  const handleSave = () => {
    const formData = new FormData();

    for (const key in fetchedData) {
      if (duplicateFetchData[key] !== fetchedData[key]) {
        if (key === "attributes") {
          formData.append("attributes", JSON.stringify(fetchedData.attributes));
        } else if (key === "moreImageURL" && Array.isArray(fetchedData[key])) {
          fetchedData[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, fetchedData[key]);
          console.log(key);
        }
      }
    }

    if (newMoreImage.length > 0) {
      for (const file of newMoreImage) {
        formData.append("moreImageURL", file);
      }
    }

    if (newThumb) {
      formData.append("imageURL", newThumb);
    }

    // Function to console FormData

    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    // console.log({ id: id, formData: formData });

    dispatch(updateProduct({ id: id, formData: formData }));
    navigate(-1);
  };

  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [attributeHighlight, setAttributeHighlight] = useState(false);

  const attributeHandler = (e) => {
    e.preventDefault();
    if (attributeName.trim() === "" || attributeValue.trim() === "") {
      return;
    }
    const attribute = {
      name: attributeName,
      value: attributeValue,
      isHighlight: attributeHighlight,
    };
    setFetchedData((prevData) => ({
      ...prevData,
      attributes: [...prevData.attributes, attribute],
    }));
    setAttributeHighlight(false);
    setAttributeName("");
    setAttributeValue("");
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  // deleting one image from the product images
  const deleteOneProductImage = (index) => {
    const updatedImages = [...fetchedData.moreImageURL];
    updatedImages.splice(index, 1);

    setFetchedData((prevData) => ({
      ...prevData,
      ["moreImageURL"]: updatedImages,
    }));
  };

  return (
    <>
      {/* Modal */}
      {showConfirm && (
        <ConfirmModal
          title="Confirm Save?"
          negativeAction={toggleConfirm}
          positiveAction={handleSave}
        />
      )}
      {/* Product add page */}
      <div className="p-5 w-full overflow-y-scroll">
        {/* Top Bar */}
        <div className="flex justify-between items-center text-xs font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Edit Products</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs
              list={["Dashboard", "Category List", "Edit Products"]}
            />
          </div>
          <div className="flex gap-3">
            <button
              className="admin-button-fl bg-gray-200 text-blue-700"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
              Cancel
            </button>
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={toggleConfirm}
            >
              <AiOutlineSave />
              Update
            </button>
          </div>
        </div>
        {/* Product Section */}
        <div className="lg:flex ">
          {/* Product Information */}
          <div className="lg:w-4/6 lg:mr-5">
            <div className="admin-div lg:flex gap-5">
              <div className="lg:w-1/3 mb-3 lg:mb-0">
                <h1 className="font-bold mb-3">Product Thumbnail</h1>
                {fetchedData.imageURL ? (
                  <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2">
                    <div className="h-56">
                      <img
                        src={`${URL}/img/${fetchedData.imageURL}`}
                        alt="im"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <button
                      className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() =>
                        setFetchedData({
                          ...fetchedData,
                          ["imageURL"]: "",
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <CustomSingleFileInput onChange={handleSingleImageInput} />
                )}
              </div>
              <div className="lg:w-2/3">
                <h1 className="font-bold">Product Information</h1>
                <p className="admin-label">Title</p>
                <input
                  type="text"
                  placeholder="Type product name here"
                  className="admin-input"
                  name="name"
                  value={fetchedData.name || ""}
                  onChange={handleInputChange}
                />
                <p className="admin-label">Description</p>
                <textarea
                  name="description"
                  id="description"
                  className="admin-input h-36"
                  placeholder="Type product description here..."
                  value={fetchedData.description || ""}
                  onChange={handleInputChange}
                ></textarea>
                <p className="admin-label">Quantity</p>
                <input
                  type="number"
                  name="stockQuantity"
                  placeholder="Type product quantity here"
                  className="admin-input"
                  value={fetchedData.stockQuantity || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Image Uploading */}
            <div className="admin-div">
              <h1 className="font-bold">Product Images</h1>
              {fetchedData.moreImageURL &&
              fetchedData.moreImageURL.length > 0 ? (
                <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2">
                  <div className="flex flex-wrap   gap-3 justify-center">
                    {fetchedData.moreImageURL.map((img, index) => (
                      <div
                        className="bg-white p-2 rounded-lg shadow-lg mb-2 w-28 h-28 relative"
                        key={index}
                      >
                        <img
                          src={`${URL}/img/${img}`}
                          alt="img"
                          className="h-full w-full object-contain"
                        />
                        <button
                          onClick={() => deleteOneProductImage(index)}
                          className="absolute -top-2 -right-2 text-xl p-2 bg-blue-100 hover:bg-blue-200 rounded-full"
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() =>
                      setFetchedData({
                        ...fetchedData,
                        ["moreImageURL"]: [],
                      })
                    }
                  >
                    Delete All
                  </button>
                </div>
              ) : (
                <>
                  <p className="admin-label my-2">Drop Here</p>

                  <CustomFileInput onChange={handleMultipleImageInput} />
                </>
              )}
            </div>
            {/* Attributes */}
            <div className="admin-div">
              <h1 className="font-bold mb-2">Product Attributes</h1>
              <form
                className="flex flex-col lg:flex-row items-center gap-3"
                onSubmit={attributeHandler}
              >
                <input
                  type="text"
                  className="admin-input-no-m w-full"
                  placeholder="Name"
                  value={attributeName}
                  onChange={(e) => setAttributeName(e.target.value)}
                />
                <input
                  type="text"
                  className="admin-input-no-m w-full"
                  placeholder="Value"
                  value={attributeValue}
                  onChange={(e) => setAttributeValue(e.target.value)}
                />
                <div className="admin-input-no-m w-full lg:w-auto shrink-0">
                  <input
                    type="checkbox"
                    checked={attributeHighlight}
                    onChange={() => setAttributeHighlight(!attributeHighlight)}
                  />{" "}
                  Highlight
                </div>
                <input
                  type="submit"
                  className="admin-button-fl w-full lg:w-auto bg-blue-700 text-white cursor-pointer"
                  value="Add"
                />
              </form>
              <div className="border mt-5 rounded-lg">
                {fetchedData.attributes.map((at, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex px-2 py-1 ${
                        index % 2 === 0 && "bg-gray-200"
                      }`}
                    >
                      <p className="w-2/6">{at.name}</p>
                      <p className="w-3/6">{at.value}</p>
                      <p className="w-1/6">
                        {at.isHighlight ? "Highlighted" : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Pricing */}
          <div className="lg:w-2/6">
            <div className="admin-div">
              <h1 className="font-bold">Product Pricing</h1>
              <p className="admin-label">Amount</p>
              <input
                type="number"
                name="price"
                placeholder="Type product name here"
                className="admin-input"
                value={fetchedData.price || ""}
                onChange={handleInputChange}
              />
              <p className="admin-label">Markup</p>
              <input
                type="number"
                name="markup"
                placeholder="Type product markup here"
                className="admin-input"
                value={fetchedData.markup || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="admin-div">
              <h1 className="font-bold">Category</h1>
              <p className="admin-label">Product Category</p>
              <select
                name="category"
                id="categories"
                className="admin-input"
                value={fetchedData.category || ""}
                onChange={handleInputChange}
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-div">
              <h1 className="font-bold">Product Status</h1>
              <p className="admin-label">Status</p>
              <select
                name="status"
                id="status"
                className="admin-input capitalize"
                value={fetchedData.status || ""}
                onChange={handleInputChange}
              >
                {statusList.map((st, index) => (
                  <option key={index} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
