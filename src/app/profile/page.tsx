"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]); // State for fetched categories
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category name
  const [selectedSubcategories, setSelectedSubcategories] = useState([]); // State for selected subcategories

  const [menu, setMenu] = useState([]);

  // Fetch user details and orders
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/myprf/my",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/myprf/myOrders", {
          withCredentials: true,
        });
        console.log("orders request",response)
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/myprf/add/cate/sub-cat",
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setMenu(response.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenu();
    fetchUserProfile();
    fetchOrders();
  }, []);

  // Fetch predefined categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/cate/view",
          {
            withCredentials: true,
          }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    setSelectedCategory(selectedCategoryName);
    setSelectedSubcategories([]); // Clear selected subcategories when a new category is selected
  };

  // Handle subcategory selection
  const handleSubcategoryClick = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      // If already selected, remove it
      setSelectedSubcategories(
        selectedSubcategories.filter((sub) => sub !== subcategory)
      );
    } else {
      // If not selected, add it
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  // Save selected subcategories to the user profile
  const handleSaveSubcategories = async () => {
    if (!selectedCategory || selectedSubcategories.length === 0) return;

    try {
      // Find the category object based on the selected category name
      const selectedCategoryObj = categories.find(
        (cat) => cat.name === selectedCategory
      );
      if (!selectedCategoryObj) {
        console.error("Selected category not found");
        return;
      }

      // Log the selected category name and subcategories
      // console.log(selectedCategory, selectedSubcategories);

      // Send data to the backend
      await axios.post(
        "http://localhost:3000/api/v1/myprf/add/cate/sub-cat",
        {
          author: user._id,
          name: selectedCategory, // Use the category ID for the API call
          subcategories: selectedSubcategories,
        },
        { withCredentials: true }
      );
      console.log("Subcategories saved successfully!");
    } catch (error) {
      console.error("Error saving subcategories:", error);
    }
  };

  // Get the selected category object
  const selectedCategoryObj = categories.find(
    (cat) => cat.name === selectedCategory
  );

  const clearMenu = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/myprf/cate/clear",
        {
          withCredentials: true,
        }
      );
      if (response.data.message == "Deleted") {
        console.log("cleared sucessfully");
        setMenu([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (id:any) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/order/accept/accept-status/${id}`,
        {
          withCredentials: true,
        }
      );
  
      if (response.data === "Request Accepted") {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, status: "Accepted successfully" } : order
          )
        );
      }
    } catch (error:any) {
      alert("Order Accepted succesfully");
      console.error(error);
      // alert(error.response?.data?.error || "Failed to accept the request");
    }
  };
  
  
  const handleReject = async (id) => {  // Accepts `id` as parameter
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/myprf/reject/request",
        { id } // Corrected to POST and added the ID
      );
      console.log(response.data.msg); // Show success message
    } catch (error) {
      console.error(error);
      alert("Reject succesfully");
      // alert(error.response?.data?.error || "Failed to reject the request");
    }
  };
  

  return (
    <div className="min-h-screen bg-yellow-50 text-yellow-900 p-6">
      <Header/>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        {user ? (
          <div className="flex items-center space-x-2">
            <img
              src={user.profilePicture || "data:image/png;base64,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"}
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

        {/* Display Manage Categories only if the user is a seller */}
        {user && user.role === "seller" && (
          <>
            <h2 className="text-2xl font-bold mt-6">Manage Categories</h2>
            <div className="mt-4 space-y-4">
              {/* Category Selection Dropdown */}
              <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border border-yellow-300 rounded-lg"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Selection Buttons */}
              {selectedCategory && (
                <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">
                    Select Subcategories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategoryObj?.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSubcategoryClick(sub)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedSubcategories.includes(sub)
                            ? "bg-yellow-500 text-white"
                            : "bg-yellow-200 text-yellow-900 hover:bg-yellow-300"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleSaveSubcategories}
                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Save Subcategories
                  </button>
                </div>
              )}
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Saved Categories</h3>
              {menu.length > 0 ? (
                menu.map((cat) => (
                  <div key={cat._id} className="mb-4">
                    <p className="text-yellow-900">
                      <strong>Category:</strong> {cat.name}
                    </p>
                    <p className="text-yellow-900">
                      <strong>Subcategories:</strong>{" "}
                      {cat.subcategories.join(", ")}
                    </p>
                  </div>
                ))
              ) : (
                <p>No categories saved yet.</p>
              )}
            </div>
            <div className="mt-4">
              <button
                onClick={() => clearMenu()}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Clear All Menu
              </button>
            </div>
          </>
        )}

        {/* Order Requests Section */}
        <h2 className="text-2xl font-bold mt-6">Order Requests</h2>
        <div className="mt-4 space-y-4">
  {orders.length > 0 ? (
    orders.map((order) => (
      <div
        key={order._id}
        className="bg-yellow-100 p-4 rounded-lg shadow-md flex justify-between items-center"
      >
        <div>
          <p className="text-lg font-semibold">Order ID: {order._id}</p>
          <p className="text-gray-700">Buyer: {order.buyerName}</p>
          <p className="text-gray-700">
            Status: <span className="font-bold">{order.status}</span>
          </p>
          <p className="text-gray-700">
            Payment Status:{" "}
            <span className="font-bold">{order.paymentStatus}</span>
          </p>
          <p className="text-gray-700">
            Category:{" "}
            <span className="font-bold">
              {order.items.length > 0 ? order.items[0].category : "N/A"}
            </span>
          </p>
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
      <Footer/>
    </div>
  );
};
export default ProfilePage;