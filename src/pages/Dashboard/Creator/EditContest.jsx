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
    const axiosSecure = useAxios();
    const { user } = useAuth();
    const queryClient = useQueryClient();


    const { data: contestData = {}, isLoading, isError: fetchError } = useQuery({
        queryKey: ["contest", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/single/${contestId}`);
            return res.data;
        },
        enabled: !!contestId,
    });

    // 2. Form Setup (React Hook Form)
    const { register, handleSubmit, control, reset } = useForm({
       
        defaultValues: {
            creatorName: user?.displayName || '',
            creatorEmail: user?.email || '',
        }
    });

    useEffect(() => {
        if (!isLoading && contestData && contestData._id) {

            const deadlineDate = contestData.deadline ? new Date(contestData.deadline) : null;

            reset({
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
    }, [isLoading, contestData, reset]);


    // 4. Update Mutation (No changes needed here)
    const updateMutation = useMutation({
        mutationFn: (data) => axiosSecure.patch(`/contest/${contestId}`, data),
        onSuccess: () => {
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

    // 5. Submit Handler (No changes needed here)
    const onSubmit = (data) => {
        data.price = Number(data.price);
        data.prizeMoney = Number(data.prizeMoney);

        if (data.deadline instanceof Date) {
            data.deadline = data.deadline.toISOString();
        }

        console.log('Update Data:', data);

        Swal.fire({
            title: "Confirm Changes",
            text: `Are you sure you want to update this contest with an entry price of ${data.price} taka?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#333333",
            cancelButtonColor: "#A3A3A3",
            confirmButtonText: "Confirm Update"
        }).then((result) => {
            if (result.isConfirmed) {
                updateMutation.mutate(data);
            }
        });
    };

    // --- Monochromatic Styles ---
    // Note the added disabled: classes for clear visual feedback on readOnly fields
    const inputStyle = "w-full border border-gray-300 p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition duration-150 shadow-inner disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-400";
    const labelStyle = "block text-sm font-medium text-gray-700 mb-1 mt-3";
    const cardBodyStyle = "bg-white p-6 md:p-10 rounded-xl shadow-2xl border-t-4 border-gray-900";

    if (isLoading) {
        return <div className="p-8 text-center text-gray-600">Loading contest data...</div>;
    }

    if (fetchError) {
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
                                    {/* Creator Name (Read-Only) */}
                                    <label className={labelStyle}>Creator Name</label>
                                    <input
                                        {...register("creatorName", { required: true })}
                                        readOnly
                                        className={inputStyle}
                                    />

                                    {/* Contest Name (Editable) */}
                                    <label className={labelStyle}>Contest Name</label>
                                    <input
                                        {...register("name", { required: true })}
                                        placeholder="Contest Name"
                                        className={inputStyle}
                                    />

                                    {/* Image URL (Editable) */}
                                    <label className={labelStyle}>Image URL</label>
                                    <input
                                        {...register("image", { required: true })}
                                        placeholder="Image URL"
                                        className={inputStyle}
                                    />

                                    {/* Entry Price (Editable) */}
                                    <label className={labelStyle}>Entry Price (Taka)</label>
                                    <input
                                        {...register("price", { required: true, valueAsNumber: true })}
                                        placeholder="Entry Price"
                                        type="number"
                                        min="1"
                                        className={inputStyle}
                                    />

                                    {/* Description (Editable) */}
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
                                    {/* Creator Email (Read-Only) */}
                                    <label className={labelStyle}>Creator Email</label>
                                    <input
                                        {...register("creatorEmail", { required: true })}
                                        readOnly
                                        className={inputStyle}
                                    />

                                    {/* Prize Money (Editable) */}
                                    <label className={labelStyle}>Prize Money (Taka)</label>
                                    <input
                                        {...register("prizeMoney", { required: true, valueAsNumber: true })}
                                        placeholder="Prize Money"
                                        type="number"
                                        min="1"
                                        className={inputStyle}
                                    />

                                    {/* Contest Type (Editable) */}
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
                                        <option value="Programming">Programming</option>
                                        <option value="Programming">Others</option>
                                    </select>

                                    {/* Task Instruction (Editable) */}
                                    <label className={labelStyle}>Task Instruction</label>
                                    <textarea
                                        {...register("taskInstruction", { required: true })}
                                        placeholder="Task Instruction"
                                        rows="4"
                                        className={`${inputStyle} resize-none`}
                                    />

                                    {/* Deadline (Editable - Controlled Component) */}
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
                                    {updateMutation.isLoading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Updating...
                                        </span>
                                    ) : (
                                        'Update Contest'
                                    )}
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