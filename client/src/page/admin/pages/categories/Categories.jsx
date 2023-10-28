import React, { useEffect } from "react";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";
import date from "date-and-time";
import BreadCrumbs from "../../Components/BreadCrumbs";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="p-5 w-full overflow-y-auto">
      <div className="flex justify-between items-center text-xs font-semibold">
        <div>
          <h1 className="font-bold text-2xl">Category</h1>
          <BreadCrumbs list={["Dashboard", "Category List"]} />
        </div>
        <div className="flex gap-3">
          <button className="admin-button-fl bg-gray-200 text-blue-700">
            <FiDownload />
            Export
          </button>
          <button
            className="admin-button-fl bg-blue-700 text-white"
            onClick={() => navigate("create-category")}
          >
            <AiOutlinePlus />
            Create New Category
          </button>
        </div>
      </div>

      <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
        {categories && (
          <table className="w-full min-w-max table-auto ">
            <thead className="font-normal">
              <tr className="border-b border-gray-200">
                <th className="admin-table-head">Name</th>
                <th className="admin-table-head">Description</th>
                <th className="admin-table-head">Created</th>
                <th className="admin-table-head">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                const isLast = index === categories.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-gray-200 ";

                console.log(category);

                return (
                  <tr
                    key={index}
                    className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
                  >
                    <td className="admin-table-row flex items-center gap-2">
                      <div className="w-10 h-10 overflow-clip flex justify-center items-center">
                        {category.imgURL ? (
                          <img
                            src={`http://localhost:4000/img/${category.imgURL}`}
                            alt="img"
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
                        )}
                      </div>

                      {category.name}
                    </td>
                    <td className="admin-table-row">{category.description}</td>
                    <td className="admin-table-row">
                      {category.createdAt
                        ? date.format(
                            new Date(category.createdAt),
                            "MMM DD YYYY"
                          )
                        : "No Data"}
                    </td>
                    <td className="admin-table-row">
                      <div className="flex items-center gap-2 text-lg">
                        <span className="hover:text-gray-500">
                          <AiOutlineEdit />
                        </span>
                        <span className="hover:text-gray-500">
                          <AiOutlineDelete />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Categories;
