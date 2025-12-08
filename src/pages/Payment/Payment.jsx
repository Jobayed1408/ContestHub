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

    const { isLoading, data: contest = {} } = useQuery({
        queryKey: ["contest", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/${contestId}`);
            return res.data;
        },
    });

    const handlePayment = async () => {
        // Stripe Session Example (You will add stripe later)
        const paymentInfo = {
            price: contest.price,
            contestId: contest._id,
            contestCreatorEmail: contest.creatorEmail, // or logged in user email
            contestName: contest.name,
            participantEmail: user.email,
            trackingId: contest.trackingId || 'Id not found'
        };

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
