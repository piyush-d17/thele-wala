"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UserType = 'buyer' | 'supplier';

const UserTypeCard: React.FC = () => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const router = useRouter();

  const handleSelect = (type: UserType) => {
    setSelectedType(type);
    // Navigate to the selected page
    // localStorage.setItem("userType",type);
    if (type === 'buyer') {
      router.push('/buyers');
    } else if (type === 'supplier') {
      router.push('/suppliers');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#CEF0F5] uiohi">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Choose Your Role</h2>
        
        <button
          onClick={() => handleSelect('buyer')}
          className={`w-full mb-4 p-4 text-lg font-medium rounded-md border ${
            selectedType === 'buyer' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'
          } hover:bg-blue-600 hover:text-white transition`}
        >
          I am a Buyer
        </button>
        
        <button
          onClick={() => handleSelect('supplier')}
          className={`w-full p-4 text-lg font-medium rounded-md border ${
            selectedType === 'supplier' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border-green-600'
          } hover:bg-green-600 hover:text-white transition`}
        >
          I am a Supplier
        </button>
      </div>
    </div>
  );
};

export default UserTypeCard;
