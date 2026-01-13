import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const DashboardSummaryCards = () => {
  const axiosPublic = useAxios();

  const { data: summary = {}, isLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await axiosPublic.get("/dashboard/summary");
      return res.data;
    },
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  const cards = [
    {
      title: "Total Users",
      value: summary.totalUsers ?? 0,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Contests",
      value: summary.totalContests ?? 0,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Total Participants",
      value: summary.totalParticipants ?? 0,
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Total Revenue",
      value: `$ ${summary.totalRevenue ?? 0}`,
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-xl text-white shadow-lg bg-gradient-to-r ${card.gradient}`}
        >
          <p className="text-sm opacity-90">{card.title}</p>
          <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
