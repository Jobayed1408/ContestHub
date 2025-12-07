import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../Components/Card/ContestCard";

const AllContest = () => {
  const axiosPublic = useAxios()

  const [activeTab, setActiveTab] = useState("All");

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests?status=confirmed");
      return res.data;
    },
  });

  // Tabs list
  const tabs = ["All", "Image Design", "Article Writing", "Logo Design", "Marketing"];

  // Filter by tab
  const filtered =
    activeTab === "All"
      ? contests
      : contests.filter((item) => item.contestType === activeTab);

  return (
    <div className="max-w-7xl mx-auto p-4">

      <h1 className="text-3xl font-bold text-center mb-6">All Contests</h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <p className="text-center text-lg">Loading contests...</p>
      )}

      {/* Empty State */}
      {!isLoading && filtered.length === 0 && (
        <p className="text-center text-gray-500">No contests found.</p>
      )}

      {/* Grid */}
      <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6
        "
      >
        {filtered.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </div>
  );
};

export default AllContest;
