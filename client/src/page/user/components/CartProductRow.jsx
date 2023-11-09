import React from "react";
import { URL } from "../../../Common/links";
import { increment, decrement } from "../../../redux/reducers/user/cartSlice";
import Quantity from "../components/Quantity";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";

const CartProductRow = ({ item, isLast, toggleProductConfirm }) => {
  const dispatch = useDispatch();

  const dispatchIncrement = (item) => {
    dispatch(increment({ item }));
  };
  const dispatchDecrement = (item) => {
    dispatch(decrement({ item }));
  };

  return (
    <tr className={isLast ? "" : "border-b"}>
      <td className="cart-table-row">
        <div className="flex items-center gap-3 truncate">
          {item.product.imageURL ? (
            <div className="w-10 h-10">
              <img
                src={`${URL}/img/${item.product.imageURL}`}
                alt="asdfas"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          )}
          {item.product.name}
        </div>
      </td>
      <td className="cart-table-row">
        {item.product.price + item.product.markup}
      </td>
      <td className="cart-table-row">
        <Quantity
          count={item.quantity}
          increment={() => dispatchIncrement(item)}
          decrement={() => dispatchDecrement(item)}
        />
      </td>
      <td className="cart-table-row">
        {(item.product.price + item.product.markup) * item.quantity}
      </td>
      <td>
        <div
          onClick={() => toggleProductConfirm(item.product._id)}
          className="cursor-pointer"
        >
          <AiOutlineDelete className="text-xl" />
        </div>
      </td>
    </tr>
  );
};

export default CartProductRow;
