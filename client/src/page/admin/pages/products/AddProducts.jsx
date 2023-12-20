import React, { useEffect, useState } from "react";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CustomFileInput from "../../Components/CustomFileInput";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../../redux/actions/admin/productActions";
import CustomSingleFileInput from "../../Components/CustomSingleFileInput";
import ConfirmModal from "../../../../components/ConfirmModal";
import BreadCrumbs from "../../Components/BreadCrumbs";
import toast from "react-hot-toast";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";

const AddProducts = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [statusList, setStatusList] = useState([
    "Draft",
    "Published",
    "Unpublished",
    "Out of Stock",
    "Low Quantity",
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState();
  const [imageURL, setImageURL] = useState("");
  const [status, setStatus] = useState("Draft");
  const [attributes, setAttributes] = useState([]);
  const [price, setPrice] = useState("");
  const [markup, setMarkup] = useState("");
  const [moreImageURL, setMoreImageURL] = useState("");
  const [offer, setOffer] = useState("");

  const handleSingleImageInput = (img) => {
    setImageURL(img);
  };

  const handleMultipleImageInput = (files) => {
    setMoreImageURL(files);
  };

  const handleSave = () => {
    if (stockQuantity <= 0) {
      toast.error("Quantity Should be greater than 0");
      return;
    }
    if (price <= 0) {
      toast.error("Price Should be greater than 0");
      return;
    }
    if (markup <= 0) {
      toast.error("Markup Should be greater than 0");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("stockQuantity", stockQuantity);
    formData.append("attributes", JSON.stringify(attributes));
    formData.append("price", price);
    formData.append("markup", markup);
    formData.append("category", category);
    formData.append("offer", offer);
    formData.append("status", status.toLowerCase());

    formData.append("imageURL", imageURL);

    for (const file of moreImageURL) {
      formData.append("moreImageURL", file);
    }

    dispatch(createProduct(formData));
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
    setAttributes([...attributes, attribute]);
    setAttributeHighlight(false);
    setAttributeName("");
    setAttributeValue("");
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm);
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
      <div className="p-5 w-full overflow-y-scroll text-sm">
        {/* Top Bar */}
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Add Products</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs
              list={["Dashboard", "Products List", "Add Products"]}
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
              Save
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
                <CustomSingleFileInput onChange={handleSingleImageInput} />
              </div>
              <div className="lg:w-2/3">
                <h1 className="font-bold">Product Information</h1>
                <p className="admin-label">Title</p>
                <input
                  type="text"
                  placeholder="Type product name here"
                  className="admin-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="admin-label">Description</p>
                <textarea
                  name="description"
                  id="description"
                  className="admin-input h-36"
                  placeholder="Type product description here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <p className="admin-label">Quantity</p>
                <input
                  type="number"
                  placeholder="Type product quantity here"
                  className="admin-input"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                />
              </div>
            </div>
            {/* Image Uploading */}
            <div className="admin-div">
              <h1 className="font-bold">Product Images</h1>
              <p className="admin-label my-2">Drop Here</p>
              <CustomFileInput onChange={handleMultipleImageInput} />
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
                {attributes.map((at, index) => {
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
                placeholder="Type product name here"
                className="admin-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="admin-label">Markup</p>
              <input
                type="number"
                placeholder="Type product markup here"
                className="admin-input"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
              />
              <p className="admin-label">Offer</p>
              <input
                type="number"
                placeholder="Type product offer here"
                className="admin-input"
                value={offer}
                min={1}
                max={100}
                onChange={(e) => setOffer(e.target.value)}
              />
            </div>
            <div className="admin-div">
              <h1 className="font-bold">Category</h1>
              <p className="admin-label">Product Category</p>
              <select
                name="categories"
                id="categories"
                className="admin-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose a category</option>
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
                className="admin-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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

export default AddProducts;
