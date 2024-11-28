"use client";
import Image from "next/image"; // Import Next.js Image component
import toy from "@/app/assets/images/image1.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handelClick = ()=>{
    router.push('/userType');
  }
  
  return (
    // <UserTypeCard/>
    <div className="relative min-h-screen flex items-center justify-center bg-[#FF8500]">
      {/* Background with a burnt effect */}

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-6">
        {/* Logo Section */}
        <div className="flex items-center justify-center space-x-2">
          <div className="bg-orange-700 text-white font-bold px-4 py-2 rounded-full">
            Thelewala
          </div>
          <div className="text-sm text-white">wala.in</div>
        </div>

        {/* Main Text */}
        <h1 className="text-4xl font-bold text-white">
          Thelewala for everyone
        </h1>

        {/* Toy Image */}
        <div
          className="flex justify-center items-center ml-[89px]"
          style={{
            width: "200px", 
            height: "200px",
            borderRadius: "50%", 
            background: "radial-gradient(circle, #FFA645 45%, #FFFFFF00 70%)", 
          }}
        >
          <Image
            src={toy}
            alt="Toy image"
            className=""
            width={150}
            height={150}
          />
        </div>

        {/* Button Section */}
        <div className="mt-6">
          <button className="bg-white text-orange-500 font-semibold py-2 px-6 rounded-full shadow-md hover:scale-105 transition" onClick={handelClick}>
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
