"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

// Type definition for category data
type CategoryData = {
  Beverages: string[];
  Healthy: string[];
  Desserts: string[];
  Miscellaneous: string[];
  Snacks: string[];
};

// Sample category data
const categoriesData: CategoryData = {
  Beverages: ["Water", "Juice", "Tea", "Coffee", "Milkshakes", "Smoothies"],
  Healthy: ["Vegetables", "Fruit", "Salads", "Herbs", "Whole Grains", "Nuts"],
  Desserts: ["Ice Cream", "Cake", "Brownies", "Cookies", "Pastries", "Muffins"],
  Miscellaneous: ["Rag Picker", "Potter", "Bedsheets", "Toys", "Utensils"],
  Snacks: ["Snacks", "Chips", "Popcorn", "Biscuits", "Crackers", "Granola Bars"],
};

const OrderPage = () => {
  const categories = Object.keys(categoriesData) as (keyof CategoryData)[];
  const [selectedCategory, setSelectedCategory] = useState<keyof CategoryData>(categories[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [allSellers, setAllSellers] = useState<any[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<any | null>(null); // ✅ Selected seller
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all sellers from API
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/fromDB/v/allseller", {
          withCredentials: true,
        });

        console.log("Fetched Sellers:", response.data);
        setAllSellers(response.data.all_sellers_with_locations || []);
      } catch (error: any) {
        console.error("Error fetching sellers:", error.response?.data || error.message);
        setError("Error fetching sellers.");
      }
    };

    fetchSellers();
  }, []);

  const placeOrder = async () => {
    if (!selectedSubCategory) {
      alert("Please select an item before placing an order.");
      return;
    }

    if (!selectedSeller) {
      alert("Please select a seller before placing an order.");
      return;
    }

    const orderPayload = {
      name: selectedCategory,
      subcategories: selectedSubCategory,
      seller: selectedSeller._id, // ✅ Send only selected seller
      items: [
        {
          category: selectedCategory,
          subcategory: selectedSubCategory,
          quantity: 1,
        },
      ],
      totalAmount: 100,
      status: "pending",
      paymentStatus: "pending",
    };

    try {
      setLoading(true);
      console.log("Order Payload:", orderPayload);
      const response = await axios.post(
        "http://localhost:3000/api/v1/order",
        orderPayload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Order Response:", response.data);
      alert("Order placed successfully!");
      setSelectedSubCategory(null);
      setSelectedSeller(null);
    } catch (error: any) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Order Items</h1>

        {error && <div className="text-red-500 text-center">{error}</div>}

        {/* Category Selection */}
        <div className="flex justify-center space-x-6 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-semibold text-white ${
                selectedCategory === category ? "bg-orange-600 shadow-lg" : "bg-orange-300 hover:bg-orange-400"
              } transition duration-200`}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubCategory(null);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Items Selection */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">{selectedCategory} Items</h2>
          <ul className="grid grid-cols-2 gap-4">
            {categoriesData[selectedCategory].map((item) => (
              <li
                key={item}
                className={`p-4 bg-orange-100 text-orange-800 rounded-md shadow-sm cursor-pointer ${
                  selectedSubCategory === item ? "bg-orange-300 font-bold" : "hover:bg-orange-200"
                } transition`}
                onClick={() => setSelectedSubCategory(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Seller Selection */}
        <div className="max-w-3xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">Select a Seller</h2>
          <ul className="grid grid-cols-2 gap-4">
            {allSellers.map((seller) => (
              <li
                key={seller._id}
                className={`p-4 bg-gray-100 rounded-md shadow-sm cursor-pointer ${
                  selectedSeller?._id === seller._id ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
                } transition`}
                onClick={() => setSelectedSeller(seller)}
              >
                {seller.name} ({seller.category})
              </li>
            ))}
          </ul>
        </div>

        {/* Order Button */}
        <div className="max-w-xl mx-auto p-6 mt-6 text-center">
          <button
            className="text-2xl font-semibold text-white bg-orange-600 px-6 py-3 rounded-lg shadow-lg hover:bg-orange-700 transition"
            onClick={placeOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default OrderPage;
