"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaUser, FaSearch, FaCompass } from "react-icons/fa";

const Footer = () => {
  const router = useRouter();

  const navItems = [
    { label: "Home", icon: <FaHome />, route: "/home" },
    { label: "Explore", icon: <FaCompass />, route: "/explore" },
    { label: "Search", icon: <FaSearch />, route: "/search" },
    { label: "Profile", icon: <FaUser />, route: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-teal-700 to-teal-600 flex justify-around items-center py-3 shadow-lg rounded-t-xl">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(item.route)}
          className="flex flex-col items-center text-white hover:text-orange-300 transition duration-300"
        >
          <div className="text-2xl">{item.icon}</div>
          <span className="text-sm mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Footer;
