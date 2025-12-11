// src/components/PopularContests.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const PopularContests = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["popularContests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data || [];
        },
    });


    const handleDetails = (id) => {
        if (!user) {
            navigate("/login");
        } else {
            navigate(`/contest/${id}`);
        }
    };

    if (isLoading) return <p className="text-center p-8">Loading popular contests...</p>;

    return (
        <section className="py-16 px-6 md:px-20">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold ">Popular Contests</h2>
                <button
                    onClick={() => navigate("/all-contests")}
                    className="text-emerald-600 font-semibold hover:underline"
                >
                    Show All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {contests.slice(0, 5).map((contest) => (
                    <motion.div
                        key={contest._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition"
                        whileHover={{ scale: 1.03 }}
                    >
                        <img
                            src={contest.image }
                            alt={contest.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-1 text-gray-800">{contest.name}</h3>
                            <p className="text-gray-500 mb-2">
                                {contest.description?.slice(0, 20) || "No description"}...
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                Participants: <span className="font-semibold">{contest.participants || 0}</span>
                            </p>
                            <button
                                onClick={() => handleDetails(contest._id)}
                                className="bg-emerald-600 text-white py-2 px-4 rounded w-full hover:bg-emerald-700 transition"
                            >
                                Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PopularContests;
