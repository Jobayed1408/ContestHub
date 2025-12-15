import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Confetti from "react-confetti";

const MyWinningContests = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);

  const { data: winningContests = [], isLoading, error } = useQuery({
    queryKey: ["winningContests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    refetchInterval: 30000,
  });

  // Show confetti if user has winning contests
  useEffect(() => {
    if (winningContests.length > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // show for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [winningContests]);

  if (isLoading) return <p className="p-8 text-center text-lg text-gray-600">Loading your winning contests...</p>;
  if (error) return <p className="p-8 text-center text-lg text-red-500">Error loading data.</p>;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <h3 className="text-3xl font-extrabold mb-6 text-center text-emerald-600">
        🎉 Winning Contests 🎉
      </h3>

      {winningContests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You haven't won any contests yet. Keep participating!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winningContests.map((contest) => (
            <div
              key={contest._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-800">{contest.taskText}</h4>
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                  WINNER
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                Contest ID: <span className="font-medium">{contest.contestId}</span>
              </p>
              <p className="text-gray-600 mb-4">
                Submitted At: <span className="font-medium">{new Date(contest.submittedAt).toLocaleString()}</span>
              </p>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg font-semibold text-center">
                Congratulations! 🏆
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWinningContests;
