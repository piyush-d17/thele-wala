"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const BuyerForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    aadhar: "",
    phone: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role: "buyer" }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      alert("You have successfully registered as a buyer");
      router.push("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-3"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Buyer Registration
      </h2>

      {[
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Password", name: "password", type: "password" },
        { label: "Aadhar", name: "aadhar", type: "text" },
        { label: "Phone", name: "phone", type: "text" },
      ].map(({ label, name, type }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className="text-lg font-medium text-gray-600 mb-2">
            {label}
          </label>
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

      <button
        type="submit"
        className="w-full bg-blue-500 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Register
      </button>
    </form>
  );
};

export default BuyerForm;
