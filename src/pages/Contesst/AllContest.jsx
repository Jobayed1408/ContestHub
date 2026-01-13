import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../Components/Card/ContestCard";
import Loader from "../../Components/Loader/Loader";

const AllContest = () => {
  const axiosPublic = useAxios();

  // --- States ---
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "" | "low" | "high"
  const [priceRange, setPriceRange] = useState(10000); // Max price
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // --- Data Fetching ---
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests?status=confirmed");
      return res.data;
    },
  });

  const tabs = ["All", "Image Design", "Article Writing", "Photography", "Logo Design", "Programming", "Marketing", "Others"];

  // --- Filtering & Sorting Logic ---
  const processedContests = contests
    .filter((item) => {
      const matchesTab = activeTab === "All" || item.contestType === activeTab;

      // FIX: Add optional chaining and fallback to empty string
      const contestName = item?.name || "";
      const matchesSearch = contestName.toLowerCase().includes(search.toLowerCase());

      // FIX: Ensure prizeMoney exists, default to 0 if missing
      const prize = item?.price || 0;
      const matchesPrice = prize <= priceRange;

      return matchesTab && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      // FIX: Handle potential undefined prizeMoney in sorting
      const prizeA = a?.price || 0;
      const prizeB = b?.price || 0;
      if (sortOrder === "low") return prizeA - prizeB;
      if (sortOrder === "high") return prizeB - prizeA;
      return 0;
    });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(processedContests.length / itemsPerPage);
  const paginatedContests = processedContests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen ">
      {/* Header & Search */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-black mb-6 tracking-tight">
          Explore <span className="text-primary italic">All Contests</span>
        </h1>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered w-full rounded-full text-gray-300 pl-12 h-14 shadow-sm focus:border-primary"
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
          <span className="absolute  left-5 top-1/2 -translate-y-1/2 opacity-50">🔍</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="p-6 border border-base-300 rounded-[2rem] sticky top-24">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">⚙️ Refine</h3>

            {/* Price Filter */}
            <div className="mb-6">
              <label className="label text-xs font-black opacity-50 uppercase">Max Prize: ${priceRange}</label>
              <input
                type="range" min="0" max="1000" step="50"
                value={priceRange}
                className="range range-primary range-sm"
                onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
              />
            </div>

            {/* Sort Filter */}
            <div className="mb-6">
              <label className="label text-xs font-black  uppercase">Sort by Prize</label>
              <select
                className="select select-bordered w-full rounded-xl bg-base-100 text-base-content"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="" className="bg-base-100 text-base-content">Default</option>
                <option value="low" className="bg-base-100 text-base-content">Low to High</option>
                <option value="high" className="bg-base-100 text-base-content">High to Low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-5 py-2 rounded-full border transition-all text-sm font-bold ${activeTab === tab
                    ? "bg-primary cursor-pointer border-primary text-primary-content shadow-lg shadow-primary/20"
                    : "border-base-300 cursor-pointer hover:border-primary opacity-70"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <AnimatePresence>
              {paginatedContests.map((contest) => (
                <motion.div
                  key={contest._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ContestCard contest={contest} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {paginatedContests.length === 0 && (
            <div className="text-center py-20 opacity-50 italic border-2 border-dashed border-base-300 rounded-[2rem]">
              No contests match your current filters.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="join border border-base-300 p-1 rounded-full ">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`btn btn-circle px-10 join-item border-none ${currentPage === i + 1 ? "btn-primary shadow-lg" : "btn-ghost"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllContest;