import React from "react";
import { URL } from "../../../Common/links";
// import { increment, decrement } from "../../../redux/reducers/user/cartSlice";
import {
  incrementCount,
  decrementCount,
} from "../../../redux/actions/user/cartActions";
import Quantity from "../components/Quantity";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CartProductRow = ({ item, isLast, toggleProductConfirm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartId } = useSelector((state) => state.cart);

  const dispatchIncrement = (item) => {
    dispatch(incrementCount({ cartId, productId: item.product._id }));
  };
  const dispatchDecrement = (item) => {
    dispatch(decrementCount({ cartId, productId: item.product._id }));
  };

  return (
    <tr className={isLast ? "" : "border-b"}>
      <td
        className="cart-table-row hover:underline cursor-pointer hover:text-blue-500"
        onClick={() => navigate(`/product/${item.product._id}`)}
      >
        <div className="flex items-center gap-3 truncate">
          {item.product.imageURL ? (
            <div className="w-10 h-10">
              <img
                src={`${URL}/img/${item.product.imageURL}`}
                alt="Product"
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
