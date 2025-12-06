// src/pages/Contest/ContestDetails.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useContest } from "../../hooks/useContest";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const NeonButton = ({ children, onClick, disabled, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={
      `px-5 py-2 rounded-full font-semibold transform transition-all 
       disabled:opacity-40 disabled:cursor-not-allowed 
       hover:scale-105 focus:outline-none shadow-neon ${className}`
    }
  >
    {children}
  </button>
);

const ContestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { contestQuery, registerMutation, submitMutation } = useContest(id);

  const [registered, setRegistered] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submissionText, setSubmissionText] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  const contest = contestQuery.data;

  // Determine if the logged-in user is registered (server should provide registrations array or flag)
  useEffect(() => {
    if (!contest || !user) return;
    const isRegistered = contest.registrations?.some(r => r.userId === user.uid) ?? false;
    setRegistered(isRegistered);
  }, [contest, user]);

  // Countdown calculation
  useEffect(() => {
    if (!contest?.deadline) return;

    const target = new Date(contest.deadline).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };

    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [contest?.deadline]);

  const formattedCountdown = useMemo(() => {
    if (timeLeft === null) return "";
    if (timeLeft === 0) return "Contest Ended";

    const total = Math.floor(timeLeft / 1000);
    const days = Math.floor(total / (3600 * 24));
    const hours = Math.floor((total % (3600 * 24)) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, [timeLeft]);

  if (contestQuery.isLoading) return <div className="p-8">Loading contest...</div>;
  if (contestQuery.isError) return <div className="p-8">Failed to load contest</div>;
  if (!contest) return null;

  const isEnded = timeLeft === 0;

  // handle register (simulate payment flow)
  const handleRegister = async () => {
    try {
      // If you have a real payment flow, do it before calling registerMutation
      // Here we simulate a successful payment and then register
      toast.info("Processing payment...");
      // simulate payment delay
      await new Promise(res => setTimeout(res, 1000));

      await registerMutation.mutateAsync({ contestId: id, userId: user.uid });
      toast.success("Payment successful. You are registered!");
      setRegistered(true);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed.");
    }
  };

  const openSubmitModal = () => {
    setSubmissionText("");
    setSubmitOpen(true);
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    if (!submissionText.trim()) {
      toast.error("Please provide submission details/links.");
      return;
    }

    try {
      await submitMutation.mutateAsync({
        contestId: id,
        userId: user.uid,
        submission: submissionText.trim(),
      });
      toast.success("Task submitted!");
      setSubmitOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit task.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#080814] text-white p-6">
      {/* Banner */}
      <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl" >
        <div
          className="relative h-64 md:h-80 flex items-center justify-center"
          style={{
            backgroundImage: `url(${contest.banner || contest.image || "/default-contest.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "contrast(1.05) saturate(1.1)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg">
              {contest.name}
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-300">{contest.shortTagline || contest.type}</p>
          </div>

          {/* Glow ellipse */}
          <div className="absolute -bottom-8 right-8 w-56 h-56 rounded-full blur-3xl opacity-40" style={{ background: "linear-gradient(135deg,#ff6b6b,#8b5cf6)" }} />
        </div>

        {/* Main content */}
        <div className="p-6 grid md:grid-cols-3 gap-6 bg-gradient-to-b from-[#071024]/60 to-transparent">
          {/* Left: contest details */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden shadow-lg border-2 border-indigo-600">
                <img src={contest.image || contest.banner || "/default-thumb.jpg"} alt={contest.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <p className="text-sm text-gray-300">Prize Money</p>
                <p className="text-2xl font-bold">${contest.prizeMoney ?? contest.prize ?? "0"}</p>
                <p className="mt-2 text-xs text-gray-400">Winner announced by creator</p>
              </div>

              <div className="ml-auto text-right">
                <p className="text-sm text-gray-300">Participants</p>
                <p className="text-xl font-semibold">{contest.participantsCount ?? contest.registrations?.length ?? 0}</p>
              </div>
            </div>

            <div className="bg-[#071122] p-4 rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-2">Full Description</h3>
              <p className="text-gray-300 whitespace-pre-line">{contest.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#081226] p-4 rounded-lg border border-gray-800">
                <h4 className="text-sm text-gray-300">Task Instruction</h4>
                <p className="mt-2 text-gray-300 whitespace-pre-line">{contest.taskInstruction}</p>
              </div>

              <div className="bg-[#081226] p-4 rounded-lg border border-gray-800">
                <h4 className="text-sm text-gray-300">Details</h4>
                <ul className="mt-2 text-gray-300 space-y-1 text-sm">
                  <li><strong>Type:</strong> {contest.type}</li>
                  <li><strong>Entry Price:</strong> ${contest.price ?? 0}</li>
                  <li><strong>Deadline:</strong> {new Date(contest.deadline).toLocaleString()}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: actions & winner card */}
          <aside className="space-y-4">
            <div className="p-4 rounded-xl border border-purple-800 bg-gradient-to-br from-[#061020]/50 to-[#071026]/30">
              <h4 className="text-sm text-gray-300">Live Deadline</h4>
              <p className="text-2xl font-bold mt-2">
                <span className="text-teal-300">{formattedCountdown}</span>
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <NeonButton
                  onClick={handleRegister}
                  disabled={isEnded || registered || registerMutation.isLoading}
                  className="bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-black shadow-[0_0_30px_rgba(255,111,97,0.35)]"
                >
                  {registered ? "Registered" : `Register & Pay $${contest.price ?? 0}`}
                </NeonButton>

                <NeonButton
                  onClick={openSubmitModal}
                  disabled={!registered || isEnded}
                  className="bg-gradient-to-r from-[#7f5af0] to-[#4ade80] shadow-[0_0_30px_rgba(127,90,240,0.25)]"
                >
                  Submit Task
                </NeonButton>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-800 bg-[#061021]">
              <h4 className="text-sm text-gray-300">Winner</h4>

              {contest.winner ? (
                <div className="mt-3 flex items-center gap-3">
                  <img src={contest.winner.photo} alt={contest.winner.name} className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400" />
                  <div>
                    <p className="font-semibold">{contest.winner.name}</p>
                    <p className="text-xs text-gray-400">Prize: ${contest.prizeMoney ?? contest.prize ?? "0"}</p>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-gray-500 text-sm">Winner not declared yet</p>
              )}
            </div>

            <div className="p-4 rounded-xl border border-gray-800 bg-[#041018]">
              <h4 className="text-sm text-gray-300">Other Info</h4>
              <p className="mt-2 text-xs text-gray-400">{contest.additionalNotes ?? "—"}</p>
            </div>
          </aside>
        </div>
      </div>

      {/* Submit Modal */}
      {submitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSubmitOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl p-6 bg-[#061021] rounded-2xl border border-purple-800 shadow-2xl">
            <h3 className="text-xl font-bold mb-3">Submit Your Task</h3>
            <p className="text-sm text-gray-400 mb-4">Provide required links and notes. Use new lines to separate multiple URLs.</p>

            <form onSubmit={handleSubmitTask} className="space-y-4">
              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows={6}
                placeholder="Paste your links or write details..."
                className="w-full p-3 rounded-lg bg-[#02101b] border border-gray-800 text-gray-200"
              />

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">You can edit submission until winner declared.</div>

                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setSubmitOpen(false)} className="px-4 py-2 rounded-md bg-gray-700">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-md bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] text-black font-semibold">Submit Task</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
