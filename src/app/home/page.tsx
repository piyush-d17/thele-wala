"use client";
import React from "react";
import useCategories from "./useCategories";

const OrderPage = () => {
  // Get categories, selectedCategory, and the setter from the custom hook
  const { categories, selectedCategory, setSelectedCategory, loading, error } =
    useCategories();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
        Order Items
      </h1>

      {/* Categories Section */}
      <div className="flex justify-center space-x-6 mb-6">
        {categories.map((category) => (
          <button
            key={category._id}
            className={`px-6 py-2 rounded-full font-semibold text-white ${
              selectedCategory?._id === category._id
                ? "bg-orange-600 shadow-lg"
                : "bg-orange-300 hover:bg-orange-400"
            } transition duration-200`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Items Section */}
      {selectedCategory ? (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">
            {selectedCategory.name} Items
          </h2>
          <ul className="grid grid-cols-2 gap-4">
            {selectedCategory.subcategories.map((item) => (
              <li
                key={item}
                className="p-4 bg-orange-100 text-orange-800 rounded-md shadow-sm hover:bg-orange-200 transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Select a category to see its items.
        </p>
      )}
    </div>
  );
};

export default OrderPage;
