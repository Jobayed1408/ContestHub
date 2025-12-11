import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const EditContest = () => {
    const navigate = useNavigate();
    const { contestId } = useParams();
    // FIX 1: Use axiosSecure for authenticated actions (fetch/update)
    const axiosSecure = useAxios(); 
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // 1. Fetch Existing Contest Data
    const { data: contestData = {}, isLoading } = useQuery({
        queryKey: ["contest", contestId],
        // FIX 2: Use axiosSecure and correct endpoint convention
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/single/${contestId}`);
            // Ensure the data structure is just the contest object
            return res.data; 
        },
        enabled: !!contestId, // Only run if contestId exists
    });

    // 2. Form Setup (React Hook Form)
    const { register, handleSubmit, control, isError, reset } = useForm({
        // Set default values only once loading is complete
        defaultValues: {
            creatorName: user?.displayName || '',
            creatorEmail: user?.email || '',
        }
    });

    // 3. Populate Form Fields on Data Load
    useEffect(() => {
        if (!isLoading && contestData && contestData._id) {
            // Convert deadline string to Date object for DatePicker
            const deadlineDate = contestData.deadline ? new Date(contestData.deadline) : null;
            
            reset({
                creatorName: contestData.creatorName,
                creatorEmail: contestData.creatorEmail,
                name: contestData.name,
                image: contestData.image,
                description: contestData.description,
                price: contestData.price,
                prizeMoney: contestData.prizeMoney,
                taskInstruction: contestData.taskInstruction,
                contestType: contestData.contestType,
                deadline: deadlineDate,
            });
        }
    }, [isLoading, contestData, reset, user]);


    // 4. Update Mutation
    const updateMutation = useMutation({
        mutationFn: (data) => axiosSecure.patch(`/contest/${contestId}`, data),
        onSuccess: () => {
            // Invalidate the query cache to fetch the new data
            queryClient.invalidateQueries(["contest", contestId]);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Contest updated!",
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/dashboard/creator/my-contests');
        },
        onError: (error) => {
            console.error("Update failed:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Could not update contest. Check server response.",
            });
        }
    });

    // 5. Submit Handler
    const onSubmit = (data) => {
        // Ensure numeric fields are correctly typed
        data.price = Number(data.price);
        data.prizeMoney = Number(data.prizeMoney);

        // Convert deadline to ISO string before sending
        if (data.deadline instanceof Date) {
            data.deadline = data.deadline.toISOString();
        }

        console.log('Update Data:', data);

        Swal.fire({
            title: "Confirm Changes",
            text: `Are you sure you want to update this contest with an entry price of ${data.price} taka?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#333333", // Black confirmation
            cancelButtonColor: "#A3A3A3", // Gray cancel
            confirmButtonText: "Confirm Update"
        }).then((result) => {
            if (result.isConfirmed) {
                updateMutation.mutate(data);
            }
        });
    };
    
    // --- Monochromatic Styles ---
    const inputStyle = "w-full border border-gray-300 p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition duration-150 shadow-inner disabled:bg-gray-200 disabled:text-gray-500";
    const labelStyle = "block text-sm font-medium text-gray-700 mb-1 mt-3";
    const cardBodyStyle = "bg-white p-6 md:p-10 rounded-xl shadow-2xl border-t-4 border-gray-900";

    if (isLoading) {
        return <div className="p-8 text-center text-gray-600">Loading contest data...</div>;
    }

    if (isError) {
        return <div className="p-8 text-center text-red-600">Error fetching contest data.</div>;
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-full">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-8 text-center border-b-2 border-gray-300 pb-3">
                Edit Contest: {contestData.name}
            </h3>
            <div className="flex justify-center">

                {/* Card Container */}
                <div className="w-full max-w-4xl">
                    <div className={cardBodyStyle}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            
                            {/* === TWO COLUMN LAYOUT (Responsive) === */}
                            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                
                                {/* === COLUMN 1: Basic Info === */}
                                <div>
                                    <label className={labelStyle}>Creator Name</label>
                                    <input 
                                        {...register("creatorName", { required: true })} 
                                        readOnly // Should not be editable
                                        className={inputStyle} 
                                    />

                                    <label className={labelStyle}>Contest Name</label>
                                    <input 
                                        {...register("name", { required: true })} 
                                        placeholder="Contest Name" 
                                        className={inputStyle} 
                                    />

                                    <label className={labelStyle}>Image URL</label>
                                    <input 
                                        {...register("image", { required: true })} 
                                        placeholder="Image URL" 
                                        className={inputStyle} 
                                    />

                                    <label className={labelStyle}>Entry Price (Taka)</label>
                                    <input 
                                        {...register("price", { required: true, valueAsNumber: true })} 
                                        placeholder="Entry Price" 
                                        type="number"
                                        min="1" 
                                        className={inputStyle} 
                                    />
                                    
                                    <label className={labelStyle}>Description</label>
                                    <textarea 
                                        {...register("description", { required: true })} 
                                        placeholder="Description" 
                                        rows="4"
                                        className={`${inputStyle} resize-none`} 
                                    />
                                    
                                </div>

                                {/* === COLUMN 2: Details & Deadline === */}
                                <div>
                                    <label className={labelStyle}>Creator Email</label>
                                    <input 
                                        {...register("creatorEmail", { required: true })}
                                        readOnly // Should not be editable
                                        className={inputStyle} 
                                    />

                                    <label className={labelStyle}>Prize Money (Taka)</label>
                                    <input 
                                        {...register("prizeMoney", { required: true, valueAsNumber: true })} 
                                        placeholder="Prize Money" 
                                        type="number"
                                        min="1"
                                        className={inputStyle} 
                                    />

                                    <label className={labelStyle}>Contest Type</label>
                                    <select 
                                        {...register("contestType", { required: true })} 
                                        className={inputStyle}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Logo Design">Logo Design</option>
                                        <option value="Image Design">Image Design</option>
                                        <option value="Article Writing">Article Writing</option>
                                        <option value="Photography">Photography</option>
                                        <option value="Marketing">Marketing</option>
                                    </select>

                                    <label className={labelStyle}>Task Instruction</label>
                                    <textarea 
                                        {...register("taskInstruction", { required: true })} 
                                        placeholder="Task Instruction" 
                                        rows="4"
                                        className={`${inputStyle} resize-none`} 
                                    />

                                    <div className="mt-3">
                                        <label className={labelStyle}>Deadline</label>
                                        <Controller
                                            control={control}
                                            name="deadline"
                                            rules={{ required: "Deadline is required" }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    placeholderText="Select date"
                                                    dateFormat="MMMM d, yyyy"
                                                    className={inputStyle}
                                                    wrapperClassName="w-full"
                                                />
                                            )}
                                        />
                                    </div>
                                    
                                </div>
                            </fieldset>
                            
                            {/* === SUBMIT BUTTON === */}
                            <div className="mt-10 flex justify-center">
                                <button 
                                    type="submit" 
                                    className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-300 shadow-xl disabled:bg-gray-400"
                                    disabled={updateMutation.isLoading}
                                >
                                    {updateMutation.isLoading ? 'Updating...' : 'Update Contest'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditContest;