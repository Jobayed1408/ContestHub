import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import DashboardHome from "./DashboardHome";
import { FaHome } from "react-icons/fa";
import { AiOutlineIdcard, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { ImProfile } from "react-icons/im";


const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const [userInfo, setUserInfo] = useState('user');
  
  // Fetch user role
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
        <Link to={'/dashboard'} className="font-semibold" data-tip="Homepage">
          <FaHome className="size-5" />
          <span>Home</span>
        </Link>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <Link to={'/dashboard/user/my-contests'} data-tip="My Contest">
          <AiOutlineIdcard className="size-5" />
          <span>My Contest</span>
        </Link>
      </li>
      <li>
        <Link to={'/dashboard/user/my-winnings'} data-tip="My Winnind Contests">
          <BsReverseLayoutTextWindowReverse className="size-5" />
          <span>My Winning Contests</span>
        </Link>
      </li>
      <li>
        <Link to={'/dashboard/user/profile'} data-tip="My Profile">
          <ImProfile className="size-5" />
          <span>My Profile</span>
        </Link>
      </li>
    </>
  );

  const creatorLinks = (
    <>
      <li>
        <Link to={'/dashboard/creator/add-contest'} data-tip="Add Contest">
          {/* Custom SVG replaced with a simplified, consistent icon style */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><line x1="12" y1="17" x2="12" y2="11"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
          <span>Add Contest</span>
        </Link>
      </li>
      <li>
        <Link to={'/dashboard/creator/my-contests'} data-tip="My Created Contest">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          <span>My Created Contest</span>
        </Link>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <Link to={'/dashboard/admin/manage-contests'} data-tip="Manage Contest">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>Manage Contest</span>
        </Link>
      </li>
      <li>
        <Link to={'/dashboard/admin/manage-users'} data-tip="Manage Users">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          <span>Manage Users</span>
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
    <div className="bg-gray-50 min-h-screen">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          
          <nav className="navbar w-full bg-white text-gray-900 border-b border-gray-200 shadow-md p-4">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost text-gray-800">
                <AiOutlineMenuUnfold className="size-6" />
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
                <Link to={'/'} className="text-2xl md:text-3xl font-black tracking-tighter">
                    CONTEST HUB
                </Link>
            </div>
          </nav>

          <div className="p-4 md:p-8 flex-grow">
            <h2 className="text-xl font-medium text-gray-600 mb-4 capitalize">Welcome, {user?.displayName || userInfo}</h2>

            <DashboardHome /> 
          </div>
        </div>


        <div className="drawer-side z-20">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

          <div className="flex min-h-full flex-col items-start bg-gray-900 text-white w-64 md:w-72 shadow-2xl">
            

            <div className="p-4 border-b border-gray-700 w-full mb-2">
                <h3 className="text-2xl font-bold tracking-tight">DASHBOARD</h3>
                <p className="text-xs text-gray-400 capitalize">{userInfo} Access</p>
            </div>

            {/* Sidebar Menu */}
            <ul className="menu w-full grow text-base space-y-1">
              {sharedLinks}
              
              {/* Monochromatic separator */}
              <div className="divider h-px bg-gray-700 mx-4 my-2"></div>
              
              {roleLinks()}

              {/* Monochromatic separator */}
              <div className="divider h-px bg-gray-700 mx-4 my-2"></div>

              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;