const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#CEF0F5] text-black">
      <h1 className="text-2xl md:text-4xl text-center mb-6">
        Finding <span className="text-black font-bold">Thele Wala</span> by direct searching
      </h1>
      <div className="relative w-3/4 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="absolute inset-y-0 right-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17a6 6 0 100-12 6 6 0 000 12zM21 21l-4.35-4.35"
            />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-56 font-mono font-bold">
        Easy & Simple Way to find your need
      </p>
    </div>
  )
}

export default Page