"use client"
import { useState } from 'react';


type CategoryData = {
    Beverages: string[];
    'Junk Food': string[];
    Healthy: string[];
    Desserts: string[];
    Snacks: string[];
    'Main Course': string[];
  };
  


const categoriesData: CategoryData = {
    Beverages: ['Cold Drinks', 'Coffee', 'Tea', 'Juices', 'Milkshakes', 'Mocktails'],
    'Junk Food': ['Pizza', 'Burgers', 'French Fries', 'Nachos', 'Hot Dogs', 'Tacos'],
    Healthy: ['Salads', 'Smoothies', 'Fruits', 'Grilled Veggies', 'Quinoa Bowls', 'Oatmeal'],
    Desserts: ['Ice Cream', 'Cake', 'Brownies', 'Cookies', 'Donuts', 'Pudding'],
    Snacks: ['Chips', 'Popcorn', 'Pretzels', 'Nuts', 'Trail Mix', 'Crackers'],
    'Main Course': [
      'Pasta',
      'Steak',
      'Roasted Chicken',
      'Grilled Fish',
      'Vegetable Curry',
      'Rice & Beans',
    ],
  };
  

const OrderPage = () => {
  // Initialize selectedCategory with the first category key
  const categories = Object.keys(categoriesData) as (keyof CategoryData)[];
  const [selectedCategory, setSelectedCategory] = useState<keyof CategoryData>(categories[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Order Items</h1>

      {/* Categories Section */}
      <div className="flex justify-center space-x-6 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full font-semibold text-white ${
              selectedCategory === category
                ? 'bg-orange-600 shadow-lg'
                : 'bg-orange-300 hover:bg-orange-400'
            } transition duration-200`}
            onClick={() => setSelectedCategory(category)}
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
              className="p-4 bg-orange-100 text-orange-800 rounded-md shadow-sm hover:bg-orange-200 transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderPage;
