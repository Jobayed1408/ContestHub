import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AddContest = () => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      deadline: null,
    },
  });
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = (data) => {
    // Ensure numeric fields are correctly typed
    data.price = Number(data.price);
    data.prizeMoney = Number(data.prizeMoney);

    const creatorName = user.displayName;
    const creatorEmail = user.email;
    data.creatorName = creatorName;
    data.creatorEmail = creatorEmail;

    // Check if deadline is a Date object and convert to ISO string if needed
    if (data.deadline instanceof Date) {
      data.deadline = data.deadline.toISOString();
    }
    

    Swal.fire({
      title: "Confirm Contest Creation",
      text: `You will be charged the entry price of $${data.price} . Proceed to payment?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#333333", // Black confirmation button
      cancelButtonColor: "#A3A3A3", // Gray cancel button
      confirmButtonText: "Confirm and Continue Payment!"
    }).then((result) => {
      if (result.isConfirmed) {
        // save the contest info to the database
        axiosSecure.post('/contest', data)
          .then(res => {
            console.log('After saving contest', res.data);
            if (res.data.insertedId) {
              // Note: You might want to navigate to a payment page here, 
              // but following your original code, we navigate to the contest list.
              navigate('/dashboard/creator/my-contests'); 
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Contest created! Please proceed to pay.",
                showConfirmButton: false,
                timer: 2500
              });
              reset(); // Clear form after successful submission/navigation
            } else if (res.data.message) {
                 // Handle specific server errors if applicable
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: res.data.message,
                });
            }
          })
          .catch(error => {
              console.error("Contest creation failed:", error);
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Failed to create contest. Please try again.",
              });
          });
      }
    });
  };

  // Common input styles for consistency
  const inputStyle = "w-full border border-gray-300 p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition duration-150 shadow-inner";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1 mt-3";
  const cardBodyStyle = "bg-white p-6 md:p-10 rounded-xl shadow-2xl border-t-4 border-gray-900";


  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-full">
      <h3 className="text-3xl font-extrabold text-gray-900 mb-8 text-center border-b-2 border-gray-300 pb-3">
        Create New Contest
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
                  <label className={labelStyle}>Contest Name</label>
                  <input 
                    {...register("name", { required: true })} 
                    placeholder="e.g., Summer Logo Challenge" 
                    className={inputStyle} 
                  />

                  <label className={labelStyle}>Image URL</label>
                  <input 
                    {...register("image", { required: true })} 
                    placeholder="Contest Image Link" 
                    className={inputStyle} 
                  />

                  <label className={labelStyle}>Entry Price (Taka)</label>
                  <input 
                    {...register("price", { required: true, valueAsNumber: true })} 
                    placeholder="e.g., 100" 
                    type="number" 
                    min="1"
                    className={inputStyle} 
                  />
                  
                  <label className={labelStyle}>Description</label>
                  <textarea 
                    {...register("description", { required: true })} 
                    placeholder="Brief description of the contest..." 
                    rows="4"
                    className={`${inputStyle} resize-none`} 
                  />
                  
                </div>

                {/* === COLUMN 2: Details & Deadline === */}
                <div>
                  <label className={labelStyle}>Prize Money (Taka)</label>
                  <input 
                    {...register("prizeMoney", { required: true, valueAsNumber: true })} 
                    placeholder="e.g., 5000" 
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
                    <option value="Programming">Programming</option>
                    <option value="Programming">Others</option>
                  </select>

                  <label className={labelStyle}>Task Instruction</label>
                  <textarea 
                    {...register("taskInstruction", { required: true })} 
                    placeholder="Detailed instructions for participants..." 
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
                          placeholderText="Select Date"
                          dateFormat="MMMM d, yyyy"
                          // Apply consistent styling to the DatePicker input
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
                  // High contrast black button for primary action
                  className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-300 shadow-xl disabled:bg-gray-400"
                >
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

export default AddContest;