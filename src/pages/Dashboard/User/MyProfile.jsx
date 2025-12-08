// src/pages/Dashboard/User/MyProfile.jsx
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const [form, setForm] = useState({
    name: "",
    photo: "",
    address: "",
  });

  const {user} = useAuth()
  console.log(user);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Profile updated:", form);
  };

  return (
    <div>
        {user.displayName}
        <br />
        {user.email} <br />
        <img src={user.photoURL} className="w-1/3" alt="" />
        
      <h3 className="text-xl font-bold mb-4">My Profile</h3>



      <form onSubmit={handleUpdate} className="space-y-4 max-w-md">
        
        <input
          name="name"
          onChange={handleChange}
          placeholder="Your Name"
          defaultValue={user.displayName}
          className="w-full border p-2 rounded"
        />

        <input
          name="photo"
          onChange={handleChange}
          placeholder="Photo URL"
          defaultValue={user.photoURL}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="address"
          onChange={handleChange}
          placeholder="Address / Bio"
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Update Profile
        </button>

      </form>
    </div>
  );
};

export default MyProfile;
