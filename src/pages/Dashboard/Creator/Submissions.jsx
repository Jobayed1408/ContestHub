import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { FaTrophy, FaUserCircle } from "react-icons/fa"; // Added icons
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Submissions = () => {
    const { contestId } = useParams();
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();
    

    const primaryButton = "bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md disabled:bg-gray-400";
    const winnerTagStyle = "inline-flex items-center bg-gray-900 text-white font-bold px-3 py-1 rounded-full shadow-lg text-sm tracking-wider";

    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ["submissions", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${contestId}/submissions`);
            return res.data || [];
        },
        enabled: !!contestId,
    });

    const declareWinnerMutation = useMutation({
        mutationFn: async (submissionId) => {
            const res = await axiosSecure.patch(`/contests/${contestId}/winner`, {
                winnerId: submissionId,
            });
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
        Swal.fire({
            title: "Declare Winner?",
            text: "Are you sure you want to declare this participant winner?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6", 
            cancelButtonColor: "#d33",    
            confirmButtonText: "Yes, declare winner!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {

                declareWinnerMutation.mutate(id, {
                    onSuccess: () => {

                        Swal.fire({
                            title: "Success!",
                            text: "The winner has been officially declared.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    },
                    onError: (error) => {
                        Swal.fire({
                            title: "Error",
                            text: error?.response?.data?.message || "Something went wrong.",
                            icon: "error"
                        });
                    }
                });
            }
        });
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
                        key={s.contestIdid || index} 
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
                                        onClick={() => declareWinner(s._id)} 
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