import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";
import date from "date-and-time";
import BreadCrumbs from "../../Components/BreadCrumbs";
import JustLoading from "../../../../components/JustLoading";
import StatusComponent from "../../../../components/StatusComponent";
import FilterArray from "../../Components/FilterArray";
import SearchBar from "../../../../components/SearchBar";
import { URL } from "@common/api";
import Pagination from "../../../../components/Pagination";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, loading, error, totalAvailableCategories } = useSelector(
    (state) => state.categories
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      if (type === "page") {
        setPage(1);
      }
      params.delete(type);
    } else {
      if (type === "page" && value === 1) {
        params.delete(type);
        setPage(1);
      } else {
        params.set(type, value);
        if (type === "page") {
          setPage(value);
        }
      }
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  useEffect(() => {
    dispatch(getCategories(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  return (
    <>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Category</h1>
            <BreadCrumbs list={["Dashboard", "Category List"]} />
            <FilterArray
              list={["all", "active", "blocked"]}
              handleClick={handleFilter}
            />
          </div>
          <button
            className="admin-button-fl bg-blue-700 text-white"
            onClick={() => navigate("create")}
          >
            <AiOutlinePlus />
            Create New Category
          </button>
        </div>

        <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <JustLoading size={10} />
            </div>
          ) : (
            categories && (
              <table className="w-full min-w-max table-auto ">
                <thead className="font-normal">
                  <tr className="border-b border-gray-200">
                    <th className="admin-table-head">Name</th>
                    <th className="admin-table-head">Description</th>
                    <th className="admin-table-head">Created</th>
                    <th className="admin-table-head">Status</th>
                    <th className="admin-table-head">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => {
                    const isLast = index === categories.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-gray-200 ";

                    return (
                      <tr
                        key={index}
                        className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
                        onClick={() => navigate(`edit/${category._id}`)}
                      >
                        <td className="admin-table-row flex items-center gap-2">
                          <div className="w-10 h-10 overflow-clip flex justify-center items-center">
                            {category.imgURL ? (
                              <img
                                src={`${URL}/img/${category.imgURL}`}
                                alt="img"
                                className="object-contain w-full h-full"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
                            )}
                          </div>

                          {category.name}
                        </td>
                        <td className="admin-table-row">
                          {category.description}
                        </td>
                        <td className="admin-table-row">
                          {category.createdAt
                            ? date.format(
                                new Date(category.createdAt),
                                "MMM DD YYYY"
                              )
                            : "No Data"}
                        </td>
                        <td>
                          <StatusComponent
                            status={category.isActive ? "Active" : "Blocked"}
                          />
                        </td>
                        <td className="admin-table-row">
                          <div className="flex items-center gap-2 text-lg">
                            <span
                              className="hover:text-gray-500"
                              onClick={() => navigate(`edit/${category._id}`)}
                            >
                              <AiOutlineEdit />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )
          )}
        </div>
        <div className="py-5">
          <Pagination
            handleClick={handleFilter}
            page={page}
            number={10}
            totalNumber={totalAvailableCategories}
          />
        </div>
      </div>
    </>
  );
};

export default Categories;
