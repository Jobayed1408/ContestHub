import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../Components/Loader/Loader";

const ContestDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [timeLeft, setTimeLeft] = useState("");

  // Fetch single contest data
  const { data: contest, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/contest/${id}`);
      return res.data;
    }
  });
  console.log(contest)

  // COUNTDOWN TIMER
  useEffect(() => {
    if (!contest?.deadline) return;

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(contest.deadline).getTime() - now;

      if (distance <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(countdown);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [contest]);

  // REGISTER BUTTON — GO TO PAYMENT
  const handleRegister = (contestId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/dashboard/payment/${contestId}`);
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img
        src={contest.image}
        alt={contest.name}
        className="w-full h-[350px] object-cover rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-6">{contest.name}</h1>

      {/* COUNTDOWN */}
      <p
        className={`text-lg font-semibold mt-2 ${
          timeLeft === "Contest Ended" ? "text-red-600" : "text-blue-600"
        }`}
      >
        Deadline: {timeLeft}
      </p>

      {/* PARTICIPANTS */}
      <p className="mt-2 ">
        <strong>Participants:</strong> {contest.participants || 0}
      </p>

      {/* PRIZE */}
      <p className="mt-2 ">
        <strong>Prize Money:</strong> ${contest.prizeMoney}
      </p>

      {/* WINNER SECTION */}
      {contest.winner && (
        <div className="mt-6 p-4 border rounded-lg bg-green-50">
          <h3 className="text-xl font-bold">Winner</h3>
          <div className="flex items-center gap-3 mt-2">
            <img
              src={contest.winner.photo}
              className="w-12 h-12 rounded-full"
              alt="winner"
            />
            <p className="text-lg font-medium">{contest.winner.name}</p>
          </div>
        </div>
      )}

      {/* DESCRIPTION */}
      <h2 className="text-2xl font-semibold mt-6">Description</h2>
      <p className=" mt-2 leading-6">{contest.description}</p>

      {/* TASK INSTRUCTIONS */}
      <h2 className="text-2xl font-semibold mt-6">Task Instructions</h2>
      <p className=" mt-2 whitespace-pre-line">
        {contest.taskInstruction}
      </p>

      {/* REGISTER BUTTON */}
      <button
        onClick={()=> handleRegister(contest._id)}
        disabled={timeLeft === "Contest Ended"}
        className={`w-full mt-8 py-3 text-white text-lg rounded-lg transition ${
          timeLeft === "Contest Ended"
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {timeLeft === "Contest Ended" ? "Contest Ended" : "Register & Pay"}
      </button>
    </div>
  );
};

export default ContestDetails;
