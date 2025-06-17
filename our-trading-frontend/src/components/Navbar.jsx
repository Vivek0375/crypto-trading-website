// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="w-1/3 px-3 py-1 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Center Title */}
        <div className="text-2xl font-bold">Our Trading</div>

        {/* Avatar */}
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="C"
            className="w-10 h-10 rounded-full border-2 border-yellow-500"
          />
        </div>
      </div>
    </header>
  );
}
