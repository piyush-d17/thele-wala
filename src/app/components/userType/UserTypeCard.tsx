"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserType = "buyer" | "supplier";

const UserTypeCard: React.FC = () => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const router = useRouter();

  const handleSelect = (type: UserType) => {
    setSelectedType(type);
    if (type === "buyer") {
      router.push("/buyers");
    } else if (type === "supplier") {
      router.push("/suppliers");
    }
  };
  const handelLogout = async()=>{
    const logoutResponse = await fetch('http://localhost:3000/api/v1/auth/logout',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",

    })
    if(!logoutResponse.ok){
      const errorData = await logoutResponse.json();
      throw new Error(errorData.message || "logout failed");
    }
    console.log("logout success");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFAF0]">
      <div className="max-w-md w-full px-8 py-10 bg-white shadow-lg rounded-lg">
        {/* Logo and Help Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold text-gray-800">Thele</div>
            <div className="text-sm text-gray-500">wala.in</div>
          </div>
          <div className="text-sm">
            <a href="#" className="text-gray-600 hover:underline">
              Need help?
            </a>{" "}
            <a href="#" className="text-orange-500 font-medium hover:underline">
              Contact Us
            </a>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Choose your role in the app
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Filling your invoice details and getting started is just a few
            steps away.
          </p>
        </div>

        {/* User Type Options */}
        <div className="space-y-4">
          <button
            onClick={() => handleSelect("buyer")}
            className={`flex items-center justify-between w-full p-4 text-lg font-medium rounded-lg border transition ${
              selectedType === "buyer"
                ? "border-orange-500 bg-orange-100"
                : "border-gray-300 bg-white"
            } hover:border-orange-500 hover:bg-orange-50`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                🛍️
              </div>
              <div>
                <div className="font-bold text-gray-800">BUYER</div>
                <div className="text-sm text-gray-500">
                  I want to buy products
                </div>
              </div>
            </div>
            <div>➔</div>
          </button>

          <button
            onClick={() => handleSelect("supplier")}
            className={`flex items-center justify-between w-full p-4 text-lg font-medium rounded-lg border transition ${
              selectedType === "supplier"
                ? "border-green-500 bg-green-100"
                : "border-gray-300 bg-white"
            } hover:border-green-500 hover:bg-green-50`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                🏷️
              </div>
              <div>
                <div className="font-bold text-gray-800">SELLER</div>
                <div className="text-sm text-gray-500">
                  I want to sell my products
                </div>
              </div>
            </div>
            <div>➔</div>
          </button>
        </div>
        <div className="flex justify-between mt-3 w-[90%] ml-3">
      <a href="/login" className="text-orange-500 font-medium hover:underline">
              Login
        </a>
        <a href="/login" className="text-orange-500 font-medium hover:underline" onClick={handelLogout}>
              Logout
        </a>
        </div>
      </div>
    </div>
  );
};

export default UserTypeCard;
