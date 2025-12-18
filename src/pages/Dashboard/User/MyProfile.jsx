import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAuth from "../../../hooks/useAuth";

// Updated COLORS for a more modern, eye-catching palette
const COLORS = ["#10B981", "#EF4444"]; // Emerald (Win) / Red (Loss)
const MyProfile = () => {
  const axiosSecure = useAxios()
  const { user, userProfileUpdate } = useAuth();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      displayName: user.displayName,
      photoURL: user.photoURL,
      address: "",
    },
  });

  // 👉 Load profile + autofill using onSuccess (NO infinite loop)
  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data || {};
    },
    enabled: !!user?.email,

    // 🔥 SAFE autofill here
    onSuccess: (data) => {
      reset({
        displayName: data.displayName || user?.displayName || "",
        photoURL: data.photoURL || user?.photoURL || "",
        address: data.address || "",
      });

    },

    
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-all-tasks/${user.email}`);
      return res.data || [];
    },
    enabled: !!user?.email,
  });

  // console.log('tasks', tasks)


  // Update profile mutation
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.patch(`/users/${user.email}`, formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", user?.email]);
    },
  });

  const onSubmit = async (data) => {
    try {
      if (user) {
        await userProfileUpdate(user, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
      }

      mutation.mutate({
        displayName: data.displayName,
        photoURL: data.photoURL,
        address: data.address,
      });

    } catch (err) {
      console.error("Profile update error: ", err);
    }
  };



  const userTasks = tasks;
  const totalParticipated = userTasks.length;
  const totalWins = userTasks.filter(task => task.isWinner).length;
  const totalLost = totalParticipated - totalWins;
  const winRate = totalParticipated > 0
    ? ((totalWins / totalParticipated) * 100).toFixed(1)
    : 0;

  const chartData = [
    { name: "Wins", value: totalWins },
    { name: "Participated", value: totalLost },
  ];

  if (isLoading) return <p className="p-8 text-lg text-gray-600">Loading profile data...</p>;

  return (
    <div className=" md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-emerald-500 pb-2 inline-block">
        My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card & Stats (Col 1/3) */}
        <div className="lg:col-span-1 space-y-8">

          {/* Basic Info Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <img
                src={profile.photoURL || user?.photoURL}
                className="w-28 h-28 rounded-full border-4 border-emerald-500 p-1 object-cover shadow-md mb-4"
                alt="Profile Avatar"
              />

              <h2 className="text-2xl font-bold text-gray-800 break-words">
                {profile.displayName || user?.displayName || "N/A"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
            </div>
          </div>

          {/* Stats Summary Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Statistics</h3>
            <div className="space-y-3">
              <p className="flex justify-between text-gray-600">
                <span className="font-medium">Total Participated:</span>
                <span className="font-bold text-lg text-indigo-600">{totalParticipated}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                <span className="font-medium">Total Wins:</span>
                <span className="font-bold text-lg text-emerald-600">{totalWins}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                <span className="font-medium">Win Rate:</span>
                <span className={`font-bold text-xl ${winRate >= 50 ? 'text-emerald-700' : 'text-amber-600'}`}>
                  {winRate}%
                </span>
              </p>
            </div>
          </div>

        </div>

        {/* Chart & Form (Col 2/3) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Win Percentage Chart Card (Responsive with ResponsiveContainer) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Performance Breakdown</h3>

            <div className="h-64 sm:h-80 md:h-96">
              <ResponsiveContainer width="100%" >
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>

            </div>
          </div>

          {/* Update Profile Form Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-2">Update Profile Data</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  {...register("displayName")}
                  id="name"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                  aria-invalid={false}
                />
              </div>

              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                <input
                  {...register("photoURL")}
                  id="photo"
                  placeholder="Photo URL"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address / Bio</label>
                <textarea
                  {...register("address")}
                  id="address"
                  placeholder="Address / Bio"
                  rows="3"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out shadow-md disabled:bg-gray-400"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;