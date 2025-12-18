

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");
  const contestId = query.get("contestId");

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    const verifyPayment = async () => {
      try {
        const res = await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
        if (res.data.success) {
          setPaymentInfo(res.data.paymentInfo);
        }
      } catch (err) {
        console.error("Payment verification failed:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, axiosSecure]);

  const handleSubmitTask = async () => {
    if (!taskText.trim()) {
      alert("Please write your task text or link!");
      return;
    }

    const payload = {
      contestId,
      participantEmail: user.email,
      taskText,
    };

    try {
      const res = await axiosSecure.post("/submit-task", payload);

      if (res.data.success) {
        toast.success("Task Submitted Successfully!");
        setTaskText("");
        setOpen(false);
      } else {
        alert("Failed to submit task");
      }
    } catch (err) {
      console.error(err);
      alert("Error while submitting task");
    }
  };

  if (loading) return <p className="text-center mt-10">Verifying payment...</p>;

  return (
    <div className="max-w-xl mx-auto text-center mt-16">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-3 text-lg">You are now registered for the contest.</p>

      {paymentInfo && (
        <div className="mt-4">
          <p>Transaction ID: {paymentInfo.sessionId}</p>
          <p>Tracking ID: {paymentInfo.trackingId}</p>
          <p>Contest: {paymentInfo.contestName}</p>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className="btn btn-primary mt-6"
      >
        Submit Your Task
      </button>

      <button
        onClick={() => navigate(`/contest/${contestId}`)}
        className="btn btn-secondary mt-4 ml-3"
      >
        Go Back to Contest Page
      </button>

      {/* Task Submission Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold">Submit Your Task</h2>

            <textarea
              className="textarea textarea-bordered w-full mt-3 h-32"
              placeholder="Paste your project link / GitHub / Google Drive..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmitTask}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;

