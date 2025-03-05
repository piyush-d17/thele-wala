"use client";
import axios from "axios";
import { useState } from "react";

type CategoryData = {
  Beverages: string[];
  Healthy: string[];
  Desserts: string[];
  Miscellaneous: string[];
  Snacks: string[];
};

const categoriesData: CategoryData = {
  Beverages: [
    "Water",
    "Juice",
    "Tea",
    "Coffee",
    "Milkshakes",
    "Smoothies",
    "Soda",
    "Energy Drinks",
  ],
  Healthy: [
    "Vegetables",
    "Fruit",
    "Plant",
    "Salads",
    "Herbs",
    "Whole Grains",
    "Nuts",
    "Legumes",
  ],
  Desserts: [
    "Ice Cream",
    "Cake",
    "Brownies",
    "Cookies",
    "Pastries",
    "Pudding",
    "Muffins",
    "Donuts",
  ],
  Miscellaneous: [
    "Rag Picker",
    "Potter",
    "Bedsheets",
    "Others",
    "Toys",
    "Utensils",
    "Decor",
    "Stationery",
  ],
  Snacks: [
    "Snacks",
    "Chips",
    "Popcorn",
    "Biscuits",
    "Crackers",
    "Trail Mix",
    "Pretzels",
    "Granola Bars",
  ],
};

const OrderPage = () => {
  const categories = Object.keys(categoriesData) as (keyof CategoryData)[];
  const [selectedCategory, setSelectedCategory] = useState<keyof CategoryData>(
    categories[0]
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const order = async () => {
    if (!selectedSubCategory) {
      alert("Please select an item before placing an order.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/order`,
        {
          name: selectedCategory,
          subcategories: selectedSubCategory,
        },
        {
          withCredentials: true, // Ensures HTTP-only cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order Response:", response.data);
    } catch (error: any) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
        Order Items
      </h1>

      {/* Categories Section */}
      <div className="flex justify-center space-x-6 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full font-semibold text-white ${
              selectedCategory === category
                ? "bg-orange-600 shadow-lg"
                : "bg-orange-300 hover:bg-orange-400"
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

      {/* Items Section */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">
          {selectedCategory} Items
        </h2>
        <ul className="grid grid-cols-2 gap-4">
          {categoriesData[selectedCategory].map((item) => (
            <li
              key={item}
              className={`p-4 bg-orange-100 text-orange-800 rounded-md shadow-sm cursor-pointer ${
                selectedSubCategory === item
                  ? "bg-orange-300 font-bold"
                  : "hover:bg-orange-200"
              } transition`}
              onClick={() => setSelectedSubCategory(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Order Button */}
      <div className="max-w-xl mx-auto p-6 mt-6 text-center">
        <button
          className="text-2xl font-semibold text-white bg-orange-600 px-6 py-3 rounded-lg shadow-lg hover:bg-orange-700 transition"
          onClick={order}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
