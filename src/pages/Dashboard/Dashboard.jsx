import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import DashboardHome from "./DashboardHome";
import { FaHome } from "react-icons/fa";
import { AiOutlineIdcard, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import DashHomeLayout from "./dashHomeLayout";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const [userInfo, setUserInfo] = useState('user');

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/${user.email}`)
        .then((res) => {
          setUserInfo(res.data.role || 'user');
        })
        .catch(error => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [user, axiosPublic]);

  const sharedLinks = (
    <>
      
      <li>
        <Link to={'/dashboard/home'} className="font-semibold border-b-2 border-gray-400" data-tip="Homepage">
          <FaHome className="size-5" />
          <span>Home</span>
        </Link>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <Link to={'/dashboard/user/my-contests'}>
          <AiOutlineIdcard className="size-5" />
          <span>My Contest</span>
        </Link>
      </li>
      <li>
        <Link to={'/dashboard/user/my-winnings'}>
          <BsReverseLayoutTextWindowReverse className="size-5" />
          <span>My Winning Contests</span>
        </Link>
      </li>
      <li>
        <Link to={'/dashboard/user/profile'}>
          <ImProfile className="size-5" />
          <span>My Profile</span>
        </Link>
      </li>
    </>
  );

  const creatorLinks = (
    <>
      <li>
        <Link to={'/dashboard/creator/add-contest'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><line x1="12" y1="17" x2="12" y2="11"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
          <span>Add Contest</span>
        </Link>
      </li>
      <li>
        <Link to={'/dashboard/creator/my-contests'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          <span>My Created Contest</span>
        </Link>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <Link to={'/dashboard/admin/manage-contests'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>Manage Contest</span>
        </Link>
      </li>
      <li>
        <Link to={'/dashboard/admin/manage-users'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          <span>Manage Users</span>
        </Link>
      </li>
      <li>
        <Link to={'/dashboard/admin/all-winners'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          <span>All Winners</span>
        </Link>
      </li>
    </>
  );

  const roleLinks = () => {
    if (userInfo === 'user') return userLinks;
    if (userInfo === 'creator') return creatorLinks;
    if (userInfo === 'admin') return adminLinks;
    return null;
  };

  return (
    <div className="min-h-screen ">
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Header/Navbar */}
          <nav className="navbar w-full border-b border-gray-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                <AiOutlineMenuUnfold className="size-6" />
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <Link to={'/'} className="text-2xl font-black tracking-tighter text-primary">
                CONTEST HUB
              </Link>
            </div>
          </nav>

          {/* Main Viewport */}
          <main className="p-4 md:p-8 grow">
            <header className="mb-6">
              <h2 className="text-2xl font-bold capitalize">
                Welcome, {user?.displayName || 'Back'}
              </h2>
              <p className="text-sm opacity-70">Manage your activities and status</p>
            </header>
            
            <DashboardHome /> 
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-20">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          {/* <aside className="flex min-h-full bg-gray-500 opacity-90 md:bg-none  flex-col w-64 md:w-72 border-r border-base-300"*/}
          <aside
            className={`
                flex flex-col min-h-full w-64 md:w-72 border-r border-base-300
                bg-gray-500            /* Mobile: solid black bg, white text */
                md:bg-transparent /* Medium+: transparent bg, default text color */
                opacity-100 md:opacity-100      /* Optional: remove opacity for medium+ */
              `}
          >

            <div className="p-6 border-b border-gray-400">
              <h3 className="text-xl font-black tracking-tight uppercase">Dashboard</h3>
              <span className="badge badge-primary badge-sm mt-1 uppercase text-[10px] font-bold">
                {userInfo} Access
              </span>
            </div>

            <ul className="menu w-full grow p-4 space-y-2 font-bold md:text-lg">
              {sharedLinks}

              <div className="divider my-2 opacity-90"></div>

              {roleLinks()}

              <div className="divider my-2 opacity-90"></div>
            </ul>

            {/* Optional Sidebar Footer */}
            <div className="p-4 opacity-100 text-[10px] text-center italic">
              © 2026 ContestHub Platform
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;