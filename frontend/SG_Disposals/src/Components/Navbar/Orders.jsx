import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Orders = () => {

    const [orders,setOrders] = useState([]);

    useEffect(() => {

        async function handleOrders() {
            const user_id = localStorage.getItem("user_id");
        const res  = axios.get(`${import.meta.env.VITE_BASE_URL}/user/Get-Orders?user_id=${user_id}`,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
        const data = (await res).data;
        console.log("All for For this User : ",data);
        setOrders(data)
        };

        handleOrders();
    },[])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        🛒 Your Orders
      </h2>
      <div className="gap-4 md:grid-cols-2">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border my-8 rounded-lg shadow-sm bg-white p-4 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Order ID: <span className="text-green-600">{order.order_id}</span>
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Product ID:</strong> {order.productId}
            </p>
            <p className="text-sm text-gray-600">
              <strong>User ID:</strong> {order.userId}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Quantity:</strong> {order.quanity}
            </p>
            <span
              className={`inline-block mt-3 px-3 py-1 text-sm font-medium rounded-full ${
                order.status === "ORDERED"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );


}

export default Orders
