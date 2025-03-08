"use client";

import { useState, useCallback } from "react";
import useLocations from "./useLocation";
import { useRouter } from "next/navigation";
import { Grid } from "react-loader-spinner";

const SellerForm = () => {
  const router = useRouter();
  const { locations, loading, error } = useLocations();

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
    subcategories: [] as string[],
    phone: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        subcategories: checked
          ? [...prev.subcategories, value]
          : prev.subcategories.filter((sub) => sub !== value),
      }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      alert("You have successfully registered as a new user");
      router.push("login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Grid visible height="80" width="80" color="#FF8500" />
      </div>
    );

  if (error) return <div>{error}</div>;

  const states = locations.map((location) => location.state);
  const selectedState = locations.find((location) => location.state === formData.state);
  const districts = selectedState ? selectedState.districts.map((d) => d.district) : [];
  const selectedDistrict = selectedState?.districts.find((d) => d.district === formData.district);
  const localities = selectedDistrict ? selectedDistrict.localities : [];

  const categorySubcategories: Record<string, string[]> = {
    Beverages: ["Juices", "Tea", "Coffee", "Energy Drinks", "Water", "Milkshakes", "Smoothies", "Soda"],
    Healthy: ["Vegetables", "Fruit", "Plant", "Salads", "Herbs", "Whole Grains", "Nuts", "Legumes"],
    Desserts: ["Ice Cream", "Cake", "Brownies", "Cookies", "Pastries", "Pudding", "Muffins", "Donuts"],
    Miscellaneous: ["Rag Picker", "Potter", "Bedsheets", "Others", "Toys", "Utensils", "Decor", "Stationery"],
    Snacks: ["Snacks", "Chips", "Popcorn", "Biscuits", "Crackers", "Trail Mix", "Pretzels", "Granola Bars"],
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-3">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Seller Registration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Aadhaar", name: "aadhar", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Gali Number", name: "galiNumber", type: "text" },
          { label: "Landmark", name: "landmark", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="text-lg font-medium text-gray-600 mb-2">{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        {[
          { label: "State", name: "state", options: states },
          { label: "District", name: "district", options: districts },
          { label: "Locality", name: "locality", options: localities },
          { label: "Category", name: "category", options: Object.keys(categorySubcategories) },
        ].map(({ label, name, options }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="text-lg font-medium text-gray-600 mb-2">{label}</label>
            <select
              id={name}
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}

        {formData.category && (
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-600 mb-2">Subcategories</label>
            <div className="grid grid-cols-2 gap-2">
              {categorySubcategories[formData.category]?.map((sub) => (
                <label key={sub} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={sub}
                    checked={formData.subcategories.includes(sub)}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">{sub}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Register
      </button>
    </form>
  );
};

export default SellerForm;
