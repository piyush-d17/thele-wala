// components/SellerForm.tsx
"use client"
import { useState } from 'react';


const SellerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
    aadhar: '',
    state: '',
    district: '',
    galiNumber: '',
    landmark: '',
    category: 'water',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send the form data to an API or handle it as needed
    console.log('Form submitted:', formData);

    // Example API request
    try {
      const response = await fetch('/api/seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-3">
  <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Seller Registration</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col">
      <label htmlFor="name" className="text-lg font-medium text-gray-600 mb-2">Name</label>
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
      <label htmlFor="email" className="text-lg font-medium text-gray-600 mb-2">Email</label>
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
      <label htmlFor="password" className="text-lg font-medium text-gray-600 mb-2">Password</label>
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
      <label htmlFor="aadhar" className="text-lg font-medium text-gray-600 mb-2">Aadhar Number</label>
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

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col">
      <label htmlFor="state" className="text-lg font-medium text-gray-600 mb-2">State</label>
      <input
        type="text"
        id="state"
        name="state"
        value={formData.state}
        onChange={handleChange}
        className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="district" className="text-lg font-medium text-gray-600 mb-2">District</label>
      <input
        type="text"
        id="district"
        name="district"
        value={formData.district}
        onChange={handleChange}
        className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col">
      <label htmlFor="galiNumber" className="text-lg font-medium text-gray-600 mb-2">Shop Number</label>
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
      <label htmlFor="landmark" className="text-lg font-medium text-gray-600 mb-2">Landmark</label>
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
  </div>

  <div className="flex flex-col mb-6">
    <label htmlFor="phone" className="text-lg font-medium text-gray-600 mb-2">Phone Number</label>
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

  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
    Submit
  </button>
</form>

  );
};

export default SellerForm;
