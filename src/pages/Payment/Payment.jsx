import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../Components/Loader/Loader";

const Payment = () => {
    const { contestId } = useParams();
    const axiosSecure = useAxios()
    const { user } = useAuth()
    // console.log('timeLeft', timeLeft)

    const { isLoading, data: contest = {} } = useQuery({
        queryKey: ["contest", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/${contestId}`);
            return res.data;
        },
    });
    // console.log('contest',contest)

    const handlePayment = async () => {

        if (!user?.email) {
            alert("User email not loaded yet. Please wait a moment and try again.");
            return;
        }

        const check = await axiosSecure.get(`/payment-status`, {
            params: {
                contestId: contest._id,
                email: user.email
            }
        });
    
        if (check.data.alreadyPaid) {
            alert("You already registered for this contest!");
            return;
        }

        const paymentInfo = {
            price: contest.price,
            contestId: contest._id,
            contestCreatorEmail: contest.creatorEmail,
            contestName: contest.name,
            participantEmail: user.email,
            trackingId: contest.trackingId || 'Id not found',
            deadline: contest.deadline,
            participants: contest.participants
        };
        // console.log('paymentInfo',paymentInfo) 
        const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
        window.location.href = res.data.url;
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">
                Please Pay ${contest.price} for: {contest.name}
            </h2>

            <button
                onClick={handlePayment}
                className="btn btn-primary mt-4 text-black"
            >
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
