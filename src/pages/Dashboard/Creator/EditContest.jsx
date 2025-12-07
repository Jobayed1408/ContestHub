// EditContest.jsx
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const EditContest = () => {

    const navigate = useNavigate()
    const { contestId } = useParams();
    const axiosPublic = useAxios()
    const { user } = useAuth()

    const { data: contests = [], isLoading, isError } = useQuery({
        queryKey: ["allContests"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contest/${contestId}`);
            return res.data;
        }
    });
    console.log(user);


    const { register, handleSubmit, control, reset } = useForm();

    useEffect(() => {
        if (contests && contests._id) {
            reset({
                creatorName: contests.creatorName,
                creatorEmail: contests.creatorEmail,
                name: contests.name,
                image: contests.image,
                description: contests.description,
                price: contests.price,
                prizeMoney: contests.prizeMoney,
                taskInstruction: contests.taskInstruction,
                contestType: contests.contestType,
                deadline: contests.deadline ? new Date(contests.deadline) : null,
            });
        }
    }, [contests, reset]);



    const onSubmit = (data) => {
        console.log('after saving parcel', data);
        Swal.fire({
            title: "Contest price?",
            text: `You will be charged ${data.price} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue with this requirements?!"
        }).then((result) => {
            if (result.isConfirmed) {


                // save the contests info to the database
                axiosPublic.patch(`/contest/${contestId}`, data)
                    .then(res => {
                        console.log("Updated:", res.data);

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Contest updated!",
                            showConfirmButton: false,
                            timer: 2000
                        });

                        navigate('/dashboard/creator/my-contests');
                    })
                    .catch(err => {
                        console.error(err);
                    });


            }
        });
        // console.log("Contest Created:", contest);
        // API POST HERE
        // reset();
    };
    if (isLoading) return <div>Loading content...</div>

    return (
        <div className="flex flex-col items-center justify-center ">
            <h3 className="text-xl  font-bold mb-4">Correction the Contest</h3>
            <div className="hero  ">

                <div className="card items-center justify-center w-full max-w-lg shrink-0 shadow-xl ">
                    <div className="card-body ">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <fieldset className="fieldset gap-6 flex flex-col md:flex-row items-center justify-center" >
                                <div className="w-1/2">
                                    <label className="label">Creator Name</label>
                                    <input {...register("creatorName", { required: true })} placeholder="Creator Name" 
                                    defaultValue={user?.displayName || 'user'} 
                                    readOnly
                                    className="input" />

                                    <label className="label">Name</label>
                                    <input {...register("name", { required: true })} placeholder="Contest Name" className="input" />

                                    <label className="label">Image</label>
                                    <input {...register("image", { required: true })} placeholder="Image URL" className="input" />

                                    <label className="label">Description</label>
                                    <textarea {...register("description", { required: true })} placeholder="Description" className="input" />

                                    <label className="label">Price</label>
                                    <input {...register("price", { required: true })} placeholder="Entry Price" type="number" className="input" />
                                </div>
                                <div className="w-1/2">

                                <label className="label">Creator Email</label>
                                    <input {...register("creatorEmail", { required: true })}
                                    // defaultValue={user?.email || 'email'}
                                    readOnly 
                                    className="input" />

                                    <label className="label">Prize Money</label>
                                    <input {...register("prizeMoney", { required: true })} placeholder="Prize Money" type="number" className="input" />

                                    <label className="label">Task Instruction</label>
                                    <textarea {...register("taskInstruction", { required: true })} placeholder="Task Instruction" className="input" />

                                    <label className="label">Select Content Type</label>
                                    <select {...register("contestType", { required: true })} className="input">
                                        <option>Select Type</option>
                                        <option>Logo Design</option>
                                        <option>Writing</option>
                                        <option>Photography</option>
                                    </select>

                                    <div>
                                        <label className="block mb-1">Deadline</label>

                                        <Controller
                                            control={control}
                                            name="deadline"
                                            rules={{ required: "Deadline is required" }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    placeholderText="Select date"
                                                    className="input"
                                                />
                                            )}
                                        />

                                    </div>
                                </div>

                            </fieldset>
                            <div className="flex justify-center items-center">
                                <button className="bg-blue-500  text-white px-4 py-2 rounded">
                                    Create Contest
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
