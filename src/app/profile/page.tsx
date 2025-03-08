"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const handleAccept = async(id)=>{
    try {
      const response = await axios.post('http"//localhost:300/api/v1/myprf/accept/request',id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleReject = async()=>{
    try {
      const reponse = await axios.get('http"//localhost:300/api/v1/myprf/reject/request')
    } catch (error) {
      
    }
  }

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
