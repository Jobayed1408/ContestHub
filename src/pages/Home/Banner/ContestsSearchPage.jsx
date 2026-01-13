
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loader from "../../../Components/Loader/Loader";

const ContestsSearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const axiosSecure = useAxios();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contest-search", query],
    enabled: !!query,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/search?query=${query}`);
      return res.data;
    },
  });


  if (isLoading) return <Loader></Loader>;
  if (!contests.length) return <p className="p-4">No contests found.</p>;

  console.log(contests);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <div key={contest._id} className="p-4 border rounded shadow">
            <img src={contest.image} alt={contest.name} className="w-full h-40 object-cover rounded mb-2" />
            <h2 className="font-semibold text-lg">{contest.name}</h2>
            <p className="text-sm ">{contest.description.slice(0, 50)}...</p>
            <p className="mt-1  font-bold">Participants: {contest.participants || 0}</p>
          </div>
        ))} */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <AnimatePresence>
                      {contests.map((contest) => (
                        <motion.div
                          key={contest._id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          <ContestCard contest={contest} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
      {/* </div> */}
    </div>
  );
};

export default ContestsSearchPage;
