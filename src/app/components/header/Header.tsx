"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import icon from "@/app/assets/icons/Food cart.svg"

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-gradient-to-r from-teal-700 to-teal-600 px-6 py-4 flex items-center justify-between rounded-b-xl shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Image
          src={icon} // Replace with the path to your cart icon
          alt="Cart Icon"
          width={40}
          height={40}
        />
        <div>
          <h1 className="text-2xl font-bold text-orange-400">Thele</h1>
          <p className="text-xs text-white font-light tracking-wide">WALA</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-8">
        <button
          onClick={() => router.push("/home")}
          className="text-white hover:text-orange-300 transition duration-300"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/contact")}
          className="text-white hover:text-orange-300 transition duration-300"
        >
          Contact Us
        </button>
        <button
          onClick={() => router.push("/about")}
          className="text-white hover:text-orange-300 transition duration-300"
        >
          About
        </button>
      </nav>

      {/* Menu Button */}
      <button
        onClick={() => console.log("Menu clicked!")} // Replace with toggle logic
        className="bg-orange-400 rounded-full w-10 h-10 flex items-center justify-center shadow-lg md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
