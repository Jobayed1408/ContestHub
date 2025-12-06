// AddContest.jsx
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddContest = () => {
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState(null);
  const axiosSecure = useAxios()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const contest = { ...data, deadline };
    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${data.cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue Payment!"
  }).then((result) => {
      if (result.isConfirmed) {

          // save the parcel info to the database
          axiosSecure.post('/contest', data)
              .then(res => {
                  console.log('after saving parcel', res.data);
                  if (res.data.insertedId) {
                      navigate('/dashboard/creator/my-contests')
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Parcel has created. Please Pay",
                          showConfirmButton: false,
                          timer: 2500
                      });
                  }
              })


      }
  });
    console.log("Contest Created:", contest);

    // API POST HERE
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h3 className="text-xl  font-bold mb-4">Create New Contest</h3>
      <div className="hero  ">

        <div className="card items-center justify-center w-full max-w-lg shrink-0 shadow-xl ">
          <div className="card-body ">
            <form onSubmit={handleSubmit(onSubmit)} >
              <fieldset className="fieldset flex flex-col md:flex-row items-center justify-center" >
                <div className="w-1/2">
                  <label className="label">Name</label>
                  <input {...register("name", { required: true })} placeholder="Contest Name" className="input" />

                  <label htmlFor="Name">Image</label>
                  <input {...register("image", { required: true })} placeholder="Image URL" className="input" />

                  <label htmlFor="Name">Description</label>
                  <textarea {...register("description", { required: true })} placeholder="Description" className="input" />

                  <label htmlFor="Name">Price</label>
                  <input {...register("price", { required: true })} placeholder="Entry Price" type="number" className="input" />
                </div>
                <div className="w-1/2">
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
                    <DatePicker
                      selected={deadline}
                      required
                      placeholderText="select date"
                      onChange={(date) => setDeadline(date)}
                      className="input"
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


      {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col items-center justify-center">

        

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Contest
        </button>
      </form> */}
    </div>
  );
};

export default AddContest;
