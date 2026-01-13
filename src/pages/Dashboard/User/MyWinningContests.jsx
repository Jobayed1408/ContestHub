import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    if (winningContests.length > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [winningContests]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center border border-error/20 rounded-2xl bg-error/5 text-error">
      Error loading winning contests. Please try again later.
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-transparent">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}

      <header className="mb-10 text-center">
        <motion.h3 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-black tracking-tight"
        >
          🏆 My <span className="text-primary italic">Victories</span>
        </motion.h3>
        <p className="text-base-content/60 mt-2">A record of your champion moments</p>
      </header>

      {winningContests.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 border-2 border-dashed border-base-300 rounded-[2rem]"
        >
          <div className="text-5xl mb-4">🎖️</div>
          <p className="text-lg ">You haven't won a contest yet. Your time is coming!</p>
          <button className="btn btn-primary btn-outline rounded-full mt-6">Explore Contests</button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {winningContests.map((contest, index) => (
              <motion.div
                key={contest._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl border border-base-300  p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -top-4 -right-4 w-16 h-16  rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl  flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <span className="badge badge-primary font-bold px-4 py-3 rounded-full text-xs">
                    WINNER
                  </span>
                </div>

                <h4 className="text-xl font-black  mb-4 line-clamp-1">
                  {contest.taskText}
                </h4>

                <div className="space-y-3 text-sm border-t border-base-300 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="opacity-80">Contest ID</span>
                    <span className="font-mono font-medium">{contest.contestId.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Date Won</span>
                    <span className="font-medium">{new Date(contest.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="bg-primary/5 text-primary p-3 rounded-2xl font-bold text-center text-sm border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                  Wait for Claim Reward →
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyWinningContests;