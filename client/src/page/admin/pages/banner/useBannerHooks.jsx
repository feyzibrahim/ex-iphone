import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "@common/links";
import { config, configMultiPart } from "@common/configurations";
import toast from "react-hot-toast";

const useBannerHooks = () => {
  const [items, setItems] = useState([]);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  // Drag option for images
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
    setShowUpdateButton(true);
  };

  // Handling file upload
  const [imageURL, setImageURL] = useState("");
  const handleSingleImageInput = (img) => {
    setImageURL(img);
  };

  const fileUpload = async () => {
    if (imageURL === "") {
      toast.error("Please Upload Image");
      return;
    }

    const formData = new FormData();

    for (const file of imageURL) {
      formData.append("images", file);
    }

    const { data } = await axios.post(
      `${URL}/admin/banners`,
      formData,
      configMultiPart
    );
    setItems(data.banners.images);
  };

  // Initial data loading
  const loadData = async () => {
    const { data } = await axios.get(`${URL}/admin/banners`, config);
    setItems(data.banners.images);
  };
  useEffect(() => {
    loadData();
  }, []);

  // Deleting a banner
  const deleteBanner = async (id) => {
    const { data } = await axios.delete(`${URL}/admin/banner/${id}`, config);
    setItems(data.banners.images);
  };

  return {
    items,
    moveItem,
    handleSingleImageInput,
    deleteBanner,
    showUpdateButton,
    fileUpload,
  };
};

export default useBannerHooks;
