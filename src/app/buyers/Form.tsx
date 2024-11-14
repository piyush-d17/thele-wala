// src/components/UserForm.tsx
"use client"
import { useState } from 'react';

type UserFormData = {
  name: string;
  email: string;
  password: string;
  aadhar: string;
  state: string;
  district: string;
  galiNumber: string;
  landmark: string;
};

const BuyerForm = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    aadhar: '',
    state: '',
    district: '',
    galiNumber: '',
    landmark: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Add your submission logic here (e.g., send to an API)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-xl font-semibold mb-4">User Registration</h2>

      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Aadhar</label>
        <input
          type="text"
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">District</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Gali Number</label>
        <input
          type="text"
          name="galiNumber"
          value={formData.galiNumber}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Landmark</label>
        <input
          type="text"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default BuyerForm;
