import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";

const MyCreatedContests = () => {
  const { user } = useAuth(); 
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["my-contests", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/contests/creator/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const handleDelete = async (id) => {

    Swal.fire({
      title: "Delete Contest?",
      text: `Are you sure?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue to delete..!"
    }).then((result) => {
      if (result.isConfirmed) {


        axiosPublic.delete(`/contest/${id}`)
          .then(res => {
            queryClient.invalidateQueries(["allContests"]);
            console.log("Updated:", res.data);

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Contest deleted!",
              showConfirmButton: false,
              timer: 2000
            });


          })
          .catch(err => {
            console.error(err);
          });
      }
    })

  };

  

  return (
    
    <div className="p-6 ">
      { isLoading && <Loader/> }
      { !isLoading && contests.length === 0 && <p className="text-black">No contests found.</p> }
      <h2 className="text-2xl text-gray-600 font-semibold mb-4">My Created Contests</h2>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-500">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Tracking Contest</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(contests) && contests.map((contest) => (
            <tr key={contest._id} className="border-b hover:bg-gray-50 text-black">
              <td className="p-3">{contest.name}</td>
              <td className="p-3 capitalize">{contest.status}</td>
              <td className="p-3 capitalize">{contest.trackingId}</td>

              <td className="p-3 space-x-3">
                {/* Edit button → only if pending */}
                {contest.status === "pending" && (
                  <>
                    <Link to={`/dashboard/creator/edit/${contest._id}`} className="px-3 py-1 bg-blue-500 text-white rounded">
                      Edit
                    </Link>

                    <Link
                      onClick={() => handleDelete(contest._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </Link>
                  </>
                )}

                {/* Always show submissions button */}
                <Link to={`/dashboard/creator/submissions/${contest._id}`} className="px-3 py-1 bg-green-600 text-white rounded">
                  See Submissions
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCreatedContests;
