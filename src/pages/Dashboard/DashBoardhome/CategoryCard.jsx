import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const CategoryCard = () => {
  const axiosPublic = useAxios();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["contest-summary"],
    queryFn: async () => {
      const res = await axiosPublic.get("/dashboard/contest-summary");
      return res.data;
    },
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  // Prepare data for the chart
  const chartData = categories.map((cat) => ({
    name: cat._id,
    totalContests: cat.totalContests,
    totalParticipants: cat.totalParticipants,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Contest Summary by Category</h1>
      {chartData.length ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalContests" fill="#4f46e5" name="Total Contests" />
            <Bar dataKey="totalParticipants" fill="#16a34a" name="Total Participants" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default CategoryCard;
