import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"; // assuming this works
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { FaTrophy, FaUserCircle } from "react-icons/fa"; // Added icons

const Submissions = () => {
    const { contestId } = useParams();
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();
    const { user } = useAuth(); // Creator's info

    // --- Styling Variables for Monochromatic Theme ---
    const primaryButton = "bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md disabled:bg-gray-400";
    const winnerTagStyle = "inline-flex items-center bg-gray-900 text-white font-bold px-3 py-1 rounded-full shadow-lg text-sm tracking-wider";

    // Fetch submissions for this contest
    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ["submissions", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${contestId}/submissions`);
            return res.data || [];
        },
        enabled: !!contestId,
    });

    console.log(submissions)
    // Mutation for declaring winner
    const declareWinnerMutation = useMutation({
        mutationFn: async (submissionId) => {
            const res = await axiosSecure.patch(`/contests/${contestId}/winner`, {
                winnerId: submissionId,
            });
            console.log('contestId',contestId,submissionId)
            return res.data;
        },
        onSuccess: () => {
            toast.success("Winner declared successfully!");
            queryClient.invalidateQueries(["submissions", contestId]);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to declare winner. Check permissions.");
        },
    });

    const declareWinner = (id) => {
        if (window.confirm("WARNING: Are you sure you want to declare this participant as the winner? This action is often irreversible.")) {
            declareWinnerMutation.mutate(id);
        }
    };

    if (isLoading) return <p className="p-8 text-lg text-gray-600">Loading submissions and checking for winners...</p>;

    if (submissions.length === 0)
        return <p className="p-8 text-lg text-gray-600">No submissions yet for this contest. Share the contest link!</p>;

    return (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-8 border-b-4 border-gray-900 pb-2 inline-block">
                Submissions for Contest
            </h3>
            <p className="text-gray-600 mb-6">Contest ID: <span className="font-mono text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded">{contestId}</span></p>

            <div className="space-y-6">
                {submissions.map((s, index) => (
                    <div
                        key={s.contestIdid || index} // Assuming _id is available, otherwise use index
                        // Conditional styling for the winner using strong border
                        className={`p-6 bg-white rounded-xl shadow-lg transition duration-200 border-l-8 ${
                            s.isWinner 
                                ? "border-gray-900 shadow-2xl" 
                                : "border-gray-300"
                        }`}
                    >
                        <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-3">
                            <div className="flex items-center space-x-3">
                                <FaUserCircle className="size-6 text-gray-700" />
                                <h4 className="text-xl font-bold text-gray-800">
                                    {/* FIX: Display participant's name if available, otherwise email */}
                                    {s.participantName || s.participantEmail}
                                </h4>
                            </div>
                            
                            {/* --- Winner Status Tag --- */}
                            {s.isWinner ? (
                                <span className={winnerTagStyle}>
                                    <FaTrophy className="size-4 mr-2" />
                                    WINNER
                                </span>
                            ) : (
                                <span className="text-sm text-gray-500 font-medium">Pending Review</span>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                            <div>
                                <p className="text-xs font-semibold uppercase text-gray-500">Participant Email</p>
                                <p className="font-mono text-sm">{s.participantEmail}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase text-gray-500">Submitted Task</p>
                                <p className="text-base font-medium break-words">{s.taskText}</p>
                            </div>
                            <div className="md:text-right">
                                {/* Action Button */}
                                {!s.isWinner && (
                                    <button
                                        onClick={() => declareWinner(s._id)} // Assuming the submission ID is s._id
                                        className={primaryButton}
                                        disabled={declareWinnerMutation.isLoading}
                                    >
                                        {declareWinnerMutation.isLoading ? "Confirming..." : "Declare Winner"}
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Submissions;