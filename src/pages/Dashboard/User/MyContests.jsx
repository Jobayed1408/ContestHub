import React from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaEye, FaSpinner, FaClock } from "react-icons/fa";

// 🚀 FIX: Convert the custom hook into a regular PURE FUNCTION
const calculateRemainingTime = (deadline) => {
    if (!deadline) return "N/A";

    const end = new Date(deadline);
    if (isNaN(end)) return "Invalid date";

    const now = new Date();
    const diff = end - now;
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Simplified display
    if (days > 0) {
        return `${days}d ${hours}h`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
};

const MyContests = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();

    // 1. Fetch contests using TanStack Query
    const {
        data: myContests = [],
        isLoading,
        isError,
        // refetch // Kept for reference, not used here
    } = useQuery({
        queryKey: ["myContests", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/user-contests?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    console.log(myContests)

    // Placeholder function for handling delete 
    const handleDelete = (id) => {
        // This should be a useMutation hook in a real app
        alert(`Delete action for contest ID: ${id}`);
    };

    // --- Styling Variables ---
    const tableHeaderClass = "text-sm font-semibold text-gray-900 uppercase tracking-wider bg-gray-200 border-b border-gray-300";
    const tableRowClass = "hover:bg-gray-100 transition duration-150 border-b border-gray-200";

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40 text-gray-700">
                <FaSpinner className="animate-spin size-6 mr-3" />
                Loading your created contests...
            </div>
        );
    }

    if (isError) {
        return <p className="p-8 text-red-600">Error fetching contests. Please try again.</p>;
    }

    if (myContests.length === 0) {
        return (
            <div className="p-8 text-center bg-white rounded-xl shadow-lg mt-6">
                <h3 className="text-xl font-semibold text-gray-700">No Contests Created</h3>
                <p className="text-gray-500 mt-2">Start your journey by adding a new contest!</p>
                <Link to="/dashboard/creator/add-contest" className="mt-4 inline-block text-gray-900 underline hover:no-underline">
                    Go to Add Contest Page
                </Link>
            </div>
        );
    }

    return (
        <div className="p-2 md:p-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Created Contests ({myContests.length})</h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className={`${tableHeaderClass} w-12 text-left p-4`}>#</th>
                            <th className={`${tableHeaderClass} text-left p-4`}>Contest Details</th>
                            <th className={`${tableHeaderClass} text-center p-4`}>Participants</th>
                            <th className={`${tableHeaderClass} text-center p-4`}>Time Left</th>
                            <th className={`${tableHeaderClass} text-center p-4`}>Status</th>
                            {/* <th className={`${tableHeaderClass} text-center p-4`}>Actions</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {myContests.map((contest, index) => {

                            const remainingTime = calculateRemainingTime(contest.deadline);
                            return (
                                <tr key={contest._id} className={tableRowClass}>
                                    {/* # */}
                                    <td className="p-4 text-gray-600 font-medium">{index + 1}</td>

                                    {/* Contest Name + Creator */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="text-sm font-bold text-gray-600">
                                                    {contest.contestName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Participants Count */}
                                    <td className="text-center p-4">
                                        <span className="font-bold text-lg text-gray-700">{contest.participants || 0}</span>

                                    </td>

                                    {/* Remaining Time */}
                                    <td className="text-center p-4 font-semibold text-gray-700">
                                        <FaClock className="inline size-4 mr-1 text-gray-700" />
                                        {remainingTime}
                                    </td>

                                    {/* Payment Status (Adjusted to be monochromatic) */}
                                    <td className="text-center p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${contest.status === 'Paid'
                                                ? 'bg-gray-800 text-white'
                                                : 'bg-yellow-200 text-gray-800'
                                            }`}>
                                            {contest.status || 'Pending'}
                                        </span>
                                    </td>

                                    {/* Action Buttons */}
                                    {/* <td className="text-center p-4 space-x-2">
                                        <Link to={`/dashboard/creator/edit/${contest._id}`}>
                                            <button 
                                                title="Edit Contest" 
                                                className="text-gray-700 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition"
                                            >
                                                <FaEdit className="size-4" />
                                            </button>
                                        </Link>
                                        <Link to={`/dashboard/creator/submissions/${contest._id}`}>
                                            <button 
                                                title="View Submissions" 
                                                className="text-gray-700 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition"
                                            >
                                                <FaEye className="size-4" />
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(contest._id)} 
                                            title="Delete Contest"
                                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                                        >
                                            <FaTrashAlt className="size-4" />
                                        </button>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyContests;