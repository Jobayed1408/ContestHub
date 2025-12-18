// src/components/Banner.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed) {
      // Navigate to your search page with query param
      navigate(`/contests/search?type=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative bg-gradient-to-r from-emerald-500 to-indigo-600 text-white py-32 px-6 md:px-20 rounded-b-3xl"
    >
      {/* Banner Text */}
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Discover Amazing Contests & Unleash Your Creativity
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Join, participate, and compete to become a winner. Explore contests by type below!
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center gap-2 md:gap-4"> 
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by contest type..."
            className="w-full border-2 max-w-lg p-3 rounded-l-lg focus:outline-none focus:ring-2 text-gray-800"
          />
          <button
            type="submit"
            className="bg-white text-emerald-600 font-semibold px-6 py-3 rounded-r-lg hover:bg-gray-100 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Optional Banner Image / Decoration */}
      <motion.img
        src="https://images.unsplash.com/photo-1605902711622-cfb43c4431f4?auto=format&fit=crop&w=800&q=80"
        alt="Banner"
        className="absolute right-0 bottom-0 w-1/3 opacity-10 md:opacity-20 hidden md:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 0.4 }}
        transition={{ duration: 1.2 }}
      />
    </motion.div>
  );
};

export default Banner;
