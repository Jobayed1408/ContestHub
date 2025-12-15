// src/pages/ContestsSearchPage.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const ContestsSearchPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const axiosSecure = useAxios();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests", type],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?type=${type}`);
      return res.data;
    },
    enabled: !!type, // only fetch if type exists
  });

  if (isLoading) return <p className="p-4">Loading contests...</p>;
  if (!contests.length) return <p className="p-4">No contests found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{type}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <div key={contest._id} className="p-4 border rounded shadow">
            <img src={contest.image} alt={contest.name} className="w-full h-40 object-cover rounded mb-2" />
            <h2 className="font-semibold text-lg">{contest.name}</h2>
            <p className="text-sm ">{contest.description.slice(0, 50)}...</p>
            <p className="mt-1  font-bold">Participants: {contest.participants || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestsSearchPage;
