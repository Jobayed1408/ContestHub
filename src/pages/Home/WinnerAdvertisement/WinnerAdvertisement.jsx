// src/components/Home/WinnerAdvertisement.jsx
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const WinnerAdvertisement = () => {
  const axiosSecure = useAxios();

  // Fetch recent winners from backend
  const { data: winners = [], isLoading } = useQuery({
    queryKey: ["recentWinners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners"); // Make sure you have this API
      return res.data;
    },
  });


  if (isLoading) return <p className="p-4 text-center">Loading recent winners...</p>;

  if (!winners || winners.length === 0)
    return (
      <section className="py-12 bg-gradient-to-r from-emerald-500 to-green-400 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">🎉 Recent Winners</h2>
        <p className="text-lg">No winners yet. Join a contest to become the first winner! 💪</p>
      </section>
    );

  return (
    <section className="py-12 bg-gradient-to-r from-emerald-500 to-green-400 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">🎉 Recent Winners</h2>

        <div
          className={`grid gap-6 ${
            winners.length === 1
              ? "grid-cols-1 justify-items-center"
              : winners.length === 2
              ? "grid-cols-2 justify-items-center"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {winners.map((winner, idx) => (
            <div
              key={idx}
              className=" bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-blur-sm transition transform hover:scale-105 border-2 w-full max-w-xs"
            >
              <img
                src={winner.participantPhoto || "https://via.placeholder.com/150"}
                alt={winner.participantName}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-white"
              />
              <h3 className="text-xl font-semibold text-center">{winner.participantName}</h3>
              <p className="text-center mt-2">Prize: ${winner.contestPrize || 0}</p>
              <p className="text-center mt-1 text-sm">{winner.contestName || "N/A"}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg font-medium">Join the contests and be the next winner! 💪</p>
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisement;
