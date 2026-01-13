import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../../hooks/useAxios";
import Loader from "../../../Components/Loader/Loader";

const COLORS = ["#4f46e5", "#16a34a", "#f59e0b"]; // Colors for users, contests, participants

const DashboardSummaryPie = () => {
  const axiosPublic = useAxios();

  // Fetch summary data
  const { data: summary = {}, isLoading, isError } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await axiosPublic.get("/dashboard/summary");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="p-4 flex justify-center items-center">Error loading summary</p>;

  // Prepare data for the PieChart
  const chartData = [
    { name: "Users", value: summary.totalUsers ?? 0 },
    { name: "Contests", value: summary.totalContests ?? 0 },
    { name: "Participants", value: summary.totalParticipants ?? 0 },
  ];

  return (
    <div className=" px-4 py-10 rounded-lg shadow-md max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard Summary</h1>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardSummaryPie;
