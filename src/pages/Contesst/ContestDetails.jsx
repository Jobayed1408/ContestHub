import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../Components/Loader/Loader";
import { FaDollarSign, FaUsers, FaClock, FaTrophy, FaChevronRight } from "react-icons/fa";

const ContestDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxios();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [distance, setDistance] = useState(0);

    // Fetch single contest data
    const { data: contest, isLoading } = useQuery({
        queryKey: ["contest", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contest/${id}`);
            return res.data;
        }
    });

    // Memoize the deadline value
    const deadlineTime = useMemo(() => {
        if (!contest?.deadline) return null;
        return new Date(contest.deadline).getTime();
    }, [contest]);

    // COUNTDOWN TIMER Logic (unchanged)
    useEffect(() => {
        if (!deadlineTime) return;

        setDistance(deadlineTime - new Date().getTime());

        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const newDistance = deadlineTime - now;
            
            setDistance(newDistance);

            if (newDistance <= 0) {
                clearInterval(countdown);
                setDistance(0);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [deadlineTime]);

    // Calculate time values based on distance state (unchanged)
    const isContestEnded = distance <= 0;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    // REGISTER BUTTON — GO TO PAYMENT (unchanged)
    const handleRegister = (contestId) => {
        if (isContestEnded) return;

        if (!user) {
            navigate("/login");
            return;
        }

        navigate(`/dashboard/payment/${contestId}`);
    };

    if (isLoading) return <Loader />;
    if (!contest) return <p className="text-center p-10 text-xl text-red-600">Contest not found.</p>;

    // Helper for countdown display card (unchanged)
    const TimeCard = ({ value, label }) => (
        <div className="bg-gray-100 p-2 rounded-lg text-center shadow-inner min-w-[70px]">
            <span className="text-xl md:text-2xl font-extrabold text-gray-900 block leading-none">
                {String(Math.max(0, value)).padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-500 uppercase">{label}</span>
        </div>
    );

    return (
        // Added overflow-hidden to the outer container as a safeguard
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen overflow-hidden"> 
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-blue-600">
                
                {/* === MAIN CONTENT GRID === */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-10">
                    
                    {/* LEFT COLUMN: Image & Core Details (Lg: 2/3 width) */}
                    <div className="lg:col-span-2 space-y-6">
                        <img
                            src={contest.image}
                            alt={contest.name}
                            className="w-full max-h-[450px] object-cover rounded-xl shadow-lg"
                        />
                        
                        <h1 className="text-4xl font-extrabold text-gray-900 border-b pb-3">
                            {contest.name}
                        </h1>

                        {/* WINNER SECTION (Highlights if a winner is present) */}
                        {contest.winner && (
                            <div className="p-5 border-2 border-green-600 rounded-xl bg-green-50 shadow-md">
                                <h3 className="text-2xl font-bold text-green-700 flex items-center mb-3">
                                    <FaTrophy className="mr-3 size-6" />
                                    Congratulations! Contest Winner
                                </h3>
                                <div className="flex items-center gap-4 mt-2">
                                    <img
                                        src={contest.winner.photo || 'default-avatar.png'}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                        alt={contest.winner.name}
                                    />
                                    <div>
                                        <p className="text-xl font-semibold text-gray-800">{contest.winner.name}</p>
                                        <p className="text-sm text-gray-500">Winner of the {contest.name} contest.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* DESCRIPTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3 border-b-2 pb-1">Description</h2>
                            {/* 💡 Improvement: Added break-words for long text strings */}
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line break-words"> 
                                {contest.description}
                            </p>
                        </div>

                        {/* TASK INSTRUCTIONS */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3 border-b-2 pb-1">Task Instructions</h2>
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                                {/* 💡 Improvement: Added break-words for long text strings */}
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed break-words">
                                    {contest.taskInstruction}
                                </p>
                            </div>
                        </div>

                    </div>


                    {/* RIGHT COLUMN: Sidebar (Lg: 1/3 width) */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Action Card: Timer and Register Button (unchanged) */}
                        <div className={`p-6 rounded-xl shadow-lg border-t-4 ${isContestEnded ? 'border-red-600 bg-red-50' : 'border-blue-600 bg-white'}`}>
                            
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <FaClock className={`mr-2 ${isContestEnded ? 'text-red-600' : 'text-blue-600'}`} />
                                Deadline Countdown
                            </h3>

                            {/* Timer Display */}
                            {isContestEnded ? (
                                <p className="text-2xl font-extrabold text-center text-red-600 bg-red-100 py-3 rounded-lg">CONTEST ENDED</p>
                            ) : (
                                <div className="flex justify-between gap-1">
                                    <TimeCard value={days} label="Days" />
                                    <TimeCard value={hours} label="Hours" />
                                    <TimeCard value={minutes} label="Mins" />
                                    <TimeCard value={seconds} label="Secs" />
                                </div>
                            )}

                            {/* REGISTER BUTTON */}
                            <button
                                onClick={() => handleRegister(contest._id)}
                                disabled={isContestEnded}
                                className={`w-full mt-6 py-3 font-semibold text-lg rounded-xl shadow-md transition duration-300 flex items-center justify-center ${
                                    isContestEnded
                                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                            >
                                {isContestEnded ? "Registration Closed" : (
                                    <>
                                        Register & Pay
                                        <FaChevronRight className="ml-2 size-4" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Key Info Cards (unchanged) */}
                        <div className="space-y-4">
                            
                            {/* Entry Price */}
                            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-gray-900 flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaDollarSign className="size-5 text-gray-900 mr-3" />
                                    <span className="text-sm font-medium text-gray-600">Entry Price</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">${contest.price}</span>
                            </div>

                            {/* Prize Money */}
                            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-amber-500 flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaTrophy className="size-5 text-amber-500 mr-3" />
                                    <span className="text-sm font-medium text-gray-600">Prize Money</span>
                                </div>
                                <span className="text-xl font-bold text-amber-500">${contest.prizeMoney}</span>
                            </div>
                            
                            {/* Participants */}
                            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-600 flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaUsers className="size-5 text-blue-600 mr-3" />
                                    <span className="text-sm font-medium text-gray-600">Participants Joined</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">{contest.participants || 0}</span>
                            </div>
                            
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ContestDetails;