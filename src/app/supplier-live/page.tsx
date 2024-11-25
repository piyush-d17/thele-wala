"use client"
import React from "react";

const Page = () => {
    const handelClick = ()=>{
        console.log("live")
    }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center">
      {/* Header Section */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-700">Supplier Live</h1>
        <p className="text-gray-600 text-lg">
          Welcome to the Supplier Live page! Start connecting with suppliers seamlessly.
        </p>
      </header>

      {/* Image Section */}
      <div className="mt-8">
        <img
          src="https://img.freepik.com/premium-vector/template-with-red-banner-live-social-media-sign-icon-play-sign-play-online-vector-illustration_213497-2171.jpg?semt=ais_hybrid"
          alt="Supplier Live"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Button Section */}
      <div className="mt-10">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition-transform transform hover:scale-105"
          onClick={handelClick}
        >
          Go Live
        </button>
      </div>
    </div>
  );
};

export default Page;
