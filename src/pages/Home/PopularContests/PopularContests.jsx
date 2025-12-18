// src/components/PopularContests.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";
import ContestCard from "../../../Components/Card/ContestCard";

const PopularContests = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["popularContests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/popular-contests");
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

    if (isLoading) return <Loader />

    return (
        <section className="py-16 px-6 md:px-20">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl md:text-3xl font-bold ">Popular Contests</h2>
                <button
                    onClick={() => navigate("/all-contests")}
                    className="text-emerald-600 font-semibold hover:underline"
                >
                    Show All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {contests.slice(0, 5).map((contest) => (
                   
                    <motion.div key={contest._id}>
                        <ContestCard  contest={contest} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PopularContests;
