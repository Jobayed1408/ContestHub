import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import Loader from '../../../Components/Loader/Loader'
import { useState } from "react";
import { Pagination } from "../../../Components/Pagination";

const ManageContests = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth()
  const [page, setPage] = useState(1);

  // const { data: contests = [], refetch } = useQuery({
  //   queryKey: ["all-contests"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/contests");
  //     return res.data;
  //   },
  //   enabled: !!user?.email,
  // });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contests", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?page=${page}&limit=${5}`
      );
      return res.data;
    },
    keepPreviousData: true,
    enabled: !!user?.email,
  });

  const contests = data?.data || [];
  const total = data?.total || 0;

  const totalPages = Math.ceil(total / 5);

  if (isLoading) return <Loader></Loader>

  const changeStatus = async (id, status) => {
    // console.log(id, status) 
    await axiosSecure.patch(`/contest/changeStatus/${id}`, { status });
    refetch();
  }

  const handleConfirm = async (contest, status) => {
    changeStatus(contest._id, status);
    toast.success("Contest confirmed");
    refetch();
  };

  const handleReject = async (contest, status) => {
    changeStatus(contest._id, status);
    toast.info("Contest rejected");
    refetch();
  };

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/contest/${id}`);
    toast.error("Contest deleted");
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Contests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="">
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
              <tr key={contest._id} className="text-black">
                <td>{(page - 1) * 5 + index + 1}</td>
                <td>{contest.name}</td>
                <td>{contest.creatorEmail}</td>
                <td className="capitalize font-semibold">{contest.status}</td>

                <td className="space-x-2">
                  {contest.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleConfirm(contest, "confirmed")}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => handleReject(contest, "rejected")}
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

      <div>

        {/* Pagination */}
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>

    </div>
  );
};

export default ManageContests;
