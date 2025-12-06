import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";

const ManageContests = () => {
  const axiosSecure = useAxios();

  const { data: contests = [], refetch } = useQuery({
    queryKey: ["all-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  const handleConfirm = async (id) => {
    await axiosSecure.patch(`/contests/confirm/${id}`);
    toast.success("Contest confirmed");
    refetch();
  };

  const handleReject = async (id) => {
    await axiosSecure.patch(`/contests/reject/${id}`);
    toast.info("Contest rejected");
    refetch();
  };

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/contests/${id}`);
    toast.error("Contest deleted");
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Contests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Contest Name</th>
              <th>Creator</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <td>{index + 1}</td>
                <td>{contest.name}</td>
                <td>{contest.creatorEmail}</td>
                <td className="capitalize font-semibold">{contest.status}</td>

                <td className="space-x-2">
                  {contest.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleConfirm(contest._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => handleReject(contest._id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDelete(contest._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContests;
