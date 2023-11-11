import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/user/userOrderActions";
import date from "date-and-time";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import StatusComponent from "../../components/StatusComponent";

const OrderHistory = () => {
  const { userOrders, loading, error } = useSelector(
    (state) => state.userOrders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="min-h-screen w-full  ">
      <div className="bg-white rounded-lg h-full mx-5 lg:mx-0">
        <h1 className="uppercase text-lg font-semibold px-5 py-3 border-b">
          Order History
        </h1>
        <div className="p-5 overflow-auto">
          <table className="w-full min-w-max table-auto text-sm border">
            <thead>
              <tr className="bg-gray-100 font-semibold">
                <td className="px-5 py-2">Product Name</td>
                <td className="px-5 py-2">Status</td>
                <td className="px-5 py-2">Date</td>
                <td className="px-5 py-2">Total</td>
                <td className="px-5 py-2">Action</td>
              </tr>
            </thead>
            <tbody>
              {userOrders &&
                userOrders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-5 py-2 font-semibold">
                        {item.products[0].productId.name}{" "}
                        <span className="text-gray-500 font-normal">
                          ({item.totalQuantity}) products
                        </span>
                      </td>
                      <td className="px-5 py-2">
                        <StatusComponent status={item.status} />
                      </td>
                      <td className="px-5 py-2">
                        {date.format(new Date(item.createdAt), "MMM DD YYYY")}
                      </td>
                      <td className="px-5 py-2">{item.totalPrice}₹</td>
                      <td className="px-5 py-2 hover:underline hover:text-blue-600 text-blue-400 ">
                        <Link
                          to={`detail/${item._id}`}
                          className="flex items-center gap-2"
                        >
                          View Details <BsArrowRight />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
