import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>Dashboard</div>
    // <div className="flex h-screen">
        
    //   {/* Sidebar */}
    //   <aside className="w-64 bg-gray-800 text-white p-4">
    //     <h2 className="text-xl text-center font-bold mb-6">Dashboard</h2>
    //     {user.role === "user" && (
    //       <>
    //         <Link to="user/my-contests">My Contests</Link>
    //         <Link to="user/my-winnings">My Winnings</Link>
    //         <Link to="user/profile">Profile</Link>
    //       </>
    //     )}
    //     {user.role === "creator" && (
    //       <>
    //         <Link to="creator/add-contest">Add Contest</Link>
    //         <Link to="creator/my-contests">My Created Contests</Link>
    //         <Link to="creator/submissions">Submissions</Link>
    //       </>
    //     )}
    //     {user.role === "admin" && (
    //       <>
    //         <Link to="admin/manage-users">Manage Users</Link>
    //         <Link to="admin/manage-contests">Manage Contests</Link>
    //       </>
    //     )}
    //   </aside>

    //   {/* Main Content */}
    //   <main className="flex-1 p-6 overflow-auto">
    //     {/* <Outlet /> */}
    //   </main>
    // </div>
  );
};
export default Dashboard;