// EditContest.jsx
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const EditContest = () => {
    const { id } = useParams();

    const defaultValues = {
        name: "Logo Design Challenge",
        price: 50,
        prizeMoney: 200,
        description: "Old description",
        taskInstruction: "Old instruction",
    };

    const { register, handleSubmit } = useForm({
        defaultValues,
    });

    const onSubmit = (data) => {
        console.log("Updated Contest:", data);
        // PUT/PATCH API here
    };

    return (
        <div className="max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit Contest #{id}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input {...register("name")} className="input" />

                <input {...register("price")} type="number" className="input" />

                <input {...register("prizeMoney")} type="number" className="input" />

                <textarea {...register("description")} className="input" />

                <textarea {...register("taskInstruction")} className="input" />
                <br />

                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                    Update Contest
                </button>

            </form>
        </div>
    );
};

export default EditContest;
