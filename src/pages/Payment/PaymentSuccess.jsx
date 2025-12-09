import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get("session_id");
    const [processed, setProcessed] = useState(false);

    const axiosSecure = useAxios();
    const location = useLocation();
    const timeLeft = location.state?.timeLeft || "Time not available";
    

    useEffect(() => {
        if (!sessionId) return;

        if (sessionId && !processed) {
            setProcessed(true);
            axiosSecure
                .patch(`/payment-success?session_id=${sessionId}`)
                .then((res) => {
                    console.log("Payment Response:", res.data);

                    setPaymentInfo({
                        transactionId: res.data.paymentInfo?.contestId,
                        cratorEmail: res.data.paymentInfo?.contestCreatorEmail,
                        trackingId: res.data.paymentInfo?.trackingId,
                        name: res.data.paymentInfo?.contestName,
                        email: res.data.paymentInfo?.participantEmail,

                    });
                })
        }

    }, [sessionId, processed, axiosSecure]);

    return (
        <div className="p-10">
            <h2 className="text-4xl font-bold mb-4">Payment Successful </h2>

            <p className="text-xl">
                <strong>Contest Name:</strong> {paymentInfo.name || "Loading..."}
            </p>

            <p className="text-xl">
                <strong>Creator Name:</strong> {paymentInfo.cratorEmail || "Loading..."}
            </p>

            <p className="text-xl">
                <strong>Participants Name:</strong> {paymentInfo.email || "Loading..."}
            </p>

            <p className="text-xl">
                <strong>Contest ID:</strong> {paymentInfo.transactionId || "Loading..."}
            </p>

            <p className="text-xl">
                <strong>Tracking ID:</strong> {paymentInfo.trackingId || "Loading..."}
            </p>
        </div>
    );
};

export default PaymentSuccess;
