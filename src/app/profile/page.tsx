"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// import { AxiosInstance } from "../home/page"; 

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Fetch user details and orders
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/myprf/my", {
          withCredentials: true,
        });
        // console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders", {
          withCredentials: true,
        });
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchUserProfile();
    // fetchOrders();
  }, []);

  // Accept Order
  const handleAccept = async (orderId) => {
    // try {
    //   await axios.post("http://localhost:5000/api/accept-order", { orderId }, { withCredentials: true });
    //   setOrders(orders.map(order => order._id === orderId ? { ...order, status: "accepted" } : order));
    // } catch (error) {
    //   console.error("Error accepting order:", error);
    // }
  };

  // Reject Order
  const handleReject = async (orderId) => {
    // try {
    //   await axios.post("http://localhost:5000/api/reject-order", { orderId }, { withCredentials: true });
    //   setOrders(orders.map(order => order._id === orderId ? { ...order, status: "rejected" } : order));
    // } catch (error) {
    //   console.error("Error rejecting order:", error);
    // }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-yellow-900 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        {user ? (
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePicture || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-yellow-400"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.role}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}

        <h2 className="text-2xl font-bold mt-6">Order Requests</h2>
        <div className="mt-4 space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="bg-yellow-100 p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Order ID: {order._id}</p>
                  <p className="text-gray-700">Buyer: {order.buyerName}</p>
                  <p className="text-gray-700">Status: <span className="font-bold">{order.status}</span></p>
                </div>
                {order.status === "pending" && (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleAccept(order._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(order._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No order requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
