import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BreadCrumbs from "../../Components/BreadCrumbs";
import CustomFileInput from "../../Components/CustomFileInput";
import DraggableItem from "./DraggableItem";
import useBannerHooks from "./useBannerHooks";
import { URL } from "@common/api";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmModal from "../../../../components/ConfirmModal";

const Banner = () => {
  const {
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
  } = useBannerHooks();

  return (
    <DndProvider backend={HTML5Backend}>
      {showDeleteModal && (
        <ConfirmModal
          title="Confirm Delete?"
          negativeAction={toggleDeleteModal}
          positiveAction={deleteBanner}
        />
      )}
      <div className="p-5 w-full overflow-x-auto text-sm">
        <div className="font-semibold">
          <h1 className="font-bold text-2xl">Banner</h1>
          <BreadCrumbs list={["Dashboard", "Banner List"]} />
        </div>

        <div className="w-full bg-white p-5 rounded-lg mb-5">
          {fileUploadLoading ? (
            <div className="h-56 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-2">
                <h1 className="capitalize font-bold mb-3 text-gray-500">
                  Upload new one
                </h1>
                <button
                  className="btn-blue-no-pad px-2 text-white"
                  onClick={fileUpload}
                >
                  Upload
                </button>
              </div>
              <CustomFileInput onChange={handleSingleImageInput} />
            </>
          )}
        </div>

        <div className="w-full bg-white p-5 rounded-lg">
          <div className="flex justify-between mb-2">
            <h1 className="capitalize font-bold mb-3 text-gray-500">
              Current banner
            </h1>
            {showUpdateButton && (
              <button
                className="btn-blue-no-pad px-2 text-white"
                onClick={updateTheNewList}
              >
                Update
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, index) => (
              <DraggableItem
                key={item}
                id={item}
                index={index}
                moveItem={moveItem}
              >
                <div
                  className={`h-52 rounded-xl bg-gray-100 flex items-center justify-center relative`}
                >
                  <img
                    src={`${URL}/img/${item}`}
                    alt="Some Random Img Here"
                    className="w-full h-full object-cover rounded-xl hover:shadow-xl"
                  />
                  <div
                    onClick={() => toggleDeleteModal(item)}
                    className="w-10 h-10 bg-white rounded-full hover:bg-gray-200 active:bg-gray-400 cursor-pointer absolute top-2 right-2 flex items-center justify-center text-xl text-gray-500 hover:text-gray-800"
                  >
                    <AiOutlineDelete />
                  </div>
                </div>
              </DraggableItem>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Banner;
