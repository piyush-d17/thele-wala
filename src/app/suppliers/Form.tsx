"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid } from "react-loader-spinner";

const SellerForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seller",
    aadhar: "",
    state: "",
    district: "",
    locality: "",
    galiNumber: "",
    landmark: "",
    category: "",
    phone: "",
  });

  // Handle change in form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle change for dropdown (state, district, locality)
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    console.log("Form submitted:", formData);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      // Handle success (e.g., show a success message or redirect)
      alert("You have successfully registered as a new user");
      router.push("login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-3"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Seller Registration
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="aadhar"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            Aadhar Number
          </label>
          <input
            type="text"
            id="aadhar"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Add State Dropdown */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="state"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleSelectChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div> */}

        {/* Add District Dropdown */}
        {/* <div className="flex flex-col">
          <label
            htmlFor="district"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            District
          </label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleSelectChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!formData.state}
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      {/* Add Locality Dropdown */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="locality"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            Locality
          </label>
          <select
            id="locality"
            name="locality"
            value={formData.locality}
            onChange={handleSelectChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!formData.district}
          >
            <option value="">Select Locality</option>
            {localities.map((locality, index) => (
              <option key={index} value={locality}>
                {locality}
              </option>
            ))}
          </select>
        </div> */}
        {/* Adding the categories */}
        {/* <div className="flex flex-col">
          <label
            htmlFor="category"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="water">Water</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruit">Fruit</option>
            <option value="iceCream">Ice Cream</option>
            <option value="ragPicker">Rag Picker</option>
            <option value="juice">Juice</option>
            <option value="potter">Potter</option>
            <option value="snacks">Snacks</option>
            <option value="plant">Plant</option>
            <option value="bedsheets">Bedsheets</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="galiNumber"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            Shop Number
          </label>
          <input
            type="text"
            id="galiNumber"
            name="galiNumber"
            value={formData.galiNumber}
            onChange={handleChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="landmark"
            className="text-lg font-medium text-gray-600 mb-2"
          >
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div> */}

      <div className="flex flex-col mb-6">
        <label
          htmlFor="phone"
          className="text-lg font-medium text-gray-600 mb-2"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default SellerForm;
