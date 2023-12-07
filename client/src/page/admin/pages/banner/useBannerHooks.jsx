import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "@common/api";
import { config, configMultiPart } from "@common/configurations";
import toast from "react-hot-toast";

const useBannerHooks = () => {
  const [items, setItems] = useState([]);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
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

  // Banner Image Upload function
  const fileUpload = async () => {
    if (imageURL === "") {
      toast.error("Please Upload Image");
      return;
    }
    setFileUploadLoading(true);

    // Form data for passing images
    const formData = new FormData();
    for (const file of imageURL) {
      formData.append("images", file);
    }

    const { data } = await axios.post(
      `${URL}/admin/banners`,
      formData,
      configMultiPart
    );
    if (data) {
      setFileUploadLoading(false);
      setImageURL("");
    }
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

  // Confirming deletion using modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  let [idToBeDeleted, setId] = useState("");
  const toggleDeleteModal = (id) => {
    setId(id);
    setShowDeleteModal(!showDeleteModal);
  };

  // Deleting a banner
  const deleteBanner = async () => {
    if (idToBeDeleted === "") {
      toast.error("Image id is wrong");
      return;
    }

    const { data } = await axios.delete(
      `${URL}/admin/banner/${idToBeDeleted}`,
      config
    );

    if (data) {
      setItems(data.banners.images);
      toggleDeleteModal();
    }
  };

  // Updating the new order of banners to server
  const updateTheNewList = async () => {
    const { data } = await axios.patch(
      `${URL}/admin/banners`,
      { images: items },
      config
    );

    if (data) {
      setItems(data.banners.images);
      toast.success("List Updated");
      setShowUpdateButton(false);
    }
  };

  return {
    items,
    moveItem,
    handleSingleImageInput,
    deleteBanner,
    showUpdateButton,
    fileUpload,
    fileUploadLoading,
    updateTheNewList,
    showDeleteModal,
    toggleDeleteModal,
  };
};

export default useBannerHooks;
