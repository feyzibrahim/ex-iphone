import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import axios from "axios";
import { URL } from "../../../../Common/api";
import { config } from "../../../../Common/configurations";

const ReturnRequestsButtonInOrders = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      const { data } = await axios.get(
        `${URL}/admin/return-orders-count`,
        config
      );
      setCount(data.count);
    };
    loadCount();
  }, []);

  return (
    <div className="relative">
      {count !== 0 && (
        <div className="absolute -right-3 -top-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center">
          <p>{count}</p>
        </div>
      )}
      <button
        className="admin-button-fl bg-blue-700 text-white"
        onClick={() => navigate("return-requests")}
      >
        <HiOutlineReceiptRefund />
        Return Requests
      </button>
    </div>
  );
};

export default ReturnRequestsButtonInOrders;
