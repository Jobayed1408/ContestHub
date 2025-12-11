import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ManageUsers = () => {

  const navigate = useNavigate()
  const axiosSecure = useAxios()



  // Load all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    refetchOnMount: true,       // ✅ always fetch fresh data when component mounts
    refetchOnWindowFocus: false
  });

  const handleChangeRole = async (email, newRole) => {
    try {
      console.log(email, newRole);

      await axiosSecure.patch(`/users/role/${email}`, { role: newRole });
      toast.success("Role updated");
      refetch();
    } catch {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr >
              <th>#</th>
              <th>Name</th>
              <th>Creator Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} className="text-black">
                <td>{index + 1}</td>
                <td>{u.displayName}</td>
                <td>{u.email}</td>
                <td className="font-semibold">{u.role}</td>
                <td>
                  <select
                    className="border rounded p-1"
                    value={u.role}
                    onChange={(e) => handleChangeRole(u.email, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
