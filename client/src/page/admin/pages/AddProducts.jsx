import React, { useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CustomFileInput from "../Components/CustomFileInput";

const AddProducts = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState([
    { name: "Choose Category", img: "url" },
    { name: "iPhone", img: "url" },
    { name: "iMac", img: "url" },
    { name: "Apple Watch", img: "url" },
    { name: "MacBook", img: "url" },
    { name: "iPad", img: "url" },
    { name: "Air Tags", img: "url" },
    { name: "Accessories", img: "url" },
    { name: "Air Pods", img: "url" },
  ]);

  const [status, setStatus] = useState([
    "Draft",
    "Published",
    "Unpublished",
    "Out of Stock",
    "Low Quantity",
  ]);

  const [attributes, setAttributes] = useState([]);

  const handleFileChange = (files) => {
    // Handle the selected files here
    console.log(files);
  };

  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");

  return (
    <div className="p-5 w-full overflow-y-scroll">
      {/* Top Bar */}
      <div className="flex justify-between items-center text-xs font-semibold">
        <div>
          <h1 className="font-bold text-2xl">Add Products</h1>
          <div className="flex items-center gap-2  mt-2 mb-4 text-gray-500">
            <p className="text-blue-500 font-semibold">Dashboard</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Product List</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Add Products</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="admin-button-fl bg-gray-200 text-blue-700"
            onClick={() => navigate(-1)}
          >
            <AiOutlineClose />
            Cancel
          </button>
          <button className="admin-button-fl bg-blue-700 text-white">
            <AiOutlineSave />
            Save
          </button>
        </div>
      </div>
      {/* Product Section */}
      <div className="lg:flex ">
        {/* Product Information */}
        <div className="lg:w-4/6 lg:mr-5">
          <div className="admin-div">
            <h1 className="font-bold">Product Information</h1>
            <p className="admin-label">Title</p>
            <input
              type="text"
              placeholder="Type product name here"
              className="admin-input"
            />
            <p className="admin-label">Description</p>
            <textarea
              name="description"
              id="description"
              className="admin-input h-36"
              placeholder="Type product description here..."
            ></textarea>
            <p className="admin-label">Quantity</p>
            <input
              type="number"
              placeholder="Type product quantity here"
              className="admin-input"
            />
          </div>
          {/* Image Uploading */}
          <div className="admin-div">
            <h1 className="font-bold">Product Images</h1>
            <p className="admin-label my-2">Drop Here</p>
            <CustomFileInput onChange={handleFileChange} />
          </div>
          {/* Attributes */}
          <div className="admin-div">
            <h1 className="font-bold mb-2">Product Attributes</h1>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <input
                type="text"
                className="admin-input-no-m"
                placeholder="Name"
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
              />
              <input
                type="text"
                className="admin-input-no-m"
                placeholder="Value"
                value={attributeValue}
                onChange={(e) => setAttributeValue(e.target.value)}
              />
              <button
                onClick={() => {
                  if (
                    attributeName.trim() === "" ||
                    attributeValue.trim() === ""
                  ) {
                    return;
                  }
                  const attribute = {
                    name: attributeName,
                    value: attributeValue,
                  };
                  setAttributes([...attributes, attribute]);
                  setAttributeName("");
                  setAttributeValue("");
                }}
                className="admin-button-fl w-full lg:w-auto bg-blue-700 text-white"
              >
                Add
                <AiOutlinePlus />
              </button>
            </div>
            <div className="border mt-5">
              {attributes.map((at, index) => {
                return (
                  <div
                    key={index}
                    className={`flex px-2 py-1 ${
                      index % 2 === 0 && "bg-gray-200"
                    }`}
                  >
                    <p className="w-1/5">{at.name}</p>
                    <p className="w-4/5">{at.value}</p>
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
            />
            <p className="admin-label">Markup</p>
            <input
              type="number"
              placeholder="Type product markup here"
              className="admin-input"
            />
          </div>
          <div className="admin-div">
            <h1 className="font-bold">Category</h1>
            <p className="admin-label">Product Category</p>
            <select name="category" id="category" className="admin-input">
              {category.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="admin-label">Product Tags</p>
            <input
              type="text"
              placeholder="Type product markup here"
              className="admin-input"
            />
          </div>
          <div className="admin-div">
            <h1 className="font-bold">Product Status</h1>
            <p className="admin-label">Status</p>
            <select name="status" id="status" className="admin-input">
              {status.map((st, index) => (
                <option key={index} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
