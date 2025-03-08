"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

// Type Definitions
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  profilePicture?: string;
}

interface Order {
  _id: string;
  buyerName: string;
  status: string;
}

interface Category {
  _id: string;
  name: string;
  subcategories: string[];
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [menu, setMenu] = useState<Category[]>([]);

  // Fetch user details and orders
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<{ user: User }>(
          "http://localhost:3000/api/v1/myprf/my",
          { withCredentials: true }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get<{ orders: Order[] }>(
          "http://localhost:3000/api/v1/myprf/myOrders",
          { withCredentials: true }
        );
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchMenu = async () => {
      try {
        const response = await axios.get<{ category: Category[] }>(
          "http://localhost:3000/api/v1/myprf/add/cate/sub-cat",
          { withCredentials: true }
        );
        setMenu(response.data.category);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchUserProfile();
    fetchOrders();
    fetchMenu();
  }, []);

  // Fetch predefined categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<{ categories: Category[] }>(
          "http://localhost:3000/api/v1/cate/view",
          { withCredentials: true }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategories([]); // Clear previous selections
  };

  // Handle subcategory selection
  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((sub) => sub !== subcategory)
        : [...prev, subcategory]
    );
  };

  // Save selected subcategories
  const handleSaveSubcategories = async () => {
    if (!selectedCategory || selectedSubcategories.length === 0) return;

    try {
      const selectedCategoryObj = categories.find((cat) => cat.name === selectedCategory);
      if (!selectedCategoryObj) {
        console.error("Selected category not found");
        return;
      }

      await axios.post(
        "http://localhost:3000/api/v1/myprf/add/cate/sub-cat",
        {
          author: user?._id,
          name: selectedCategory,
          subcategories: selectedSubcategories,
        },
        { withCredentials: true }
      );
      console.log("Subcategories saved successfully!");
    } catch (error) {
      console.error("Error saving subcategories:", error);
    }
  };

  // Clear Menu
  const clearMenu = async () => {
    try {
      const response = await axios.get<{ message: string }>(
        "http://localhost:3000/api/v1/myprf/cate/clear",
        { withCredentials: true }
      );
      if (response.data.message === "Deleted") {
        setMenu([]);
      }
    } catch (error) {
      console.error("Error clearing menu:", error);
    }
  };

  // Handle Order Accept/Reject
  const handleAccept = async (id: string) => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/myprf/accept/request",
        { id },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/myprf/reject/request",
        { id },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-yellow-900 p-6">
      <Header />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-5 p-6">
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

        {/* Manage Categories (For Sellers Only) */}
        {user?.role === "seller" && (
          <>
            <h2 className="text-2xl font-bold mt-6">Manage Categories</h2>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {selectedCategory && (
              <>
                <h3>Select Subcategories</h3>
                {categories
                  .find((cat) => cat.name === selectedCategory)
                  ?.subcategories.map((sub) => (
                    <button key={sub} onClick={() => handleSubcategoryClick(sub)}>
                      {sub}
                    </button>
                  ))}
                <button onClick={handleSaveSubcategories}>Save</button>
              </>
            )}
          </>
        )}

        {/* Order Requests */}
        <h2 className="text-2xl font-bold mt-6">Order Requests</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id}>
              <p>Order ID: {order._id}</p>
              {order.status === "pending" && (
                <>
                  <button onClick={() => handleAccept(order._id)}>Accept</button>
                  <button onClick={() => handleReject(order._id)}>Reject</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
