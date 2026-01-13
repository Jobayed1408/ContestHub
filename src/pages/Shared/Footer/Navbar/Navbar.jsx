import { Link } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { LuContact, LuLayoutDashboard } from "react-icons/lu";
import { use } from "react";
import { MdDetails, MdOutlineDensitySmall, MdPrivacyTip } from "react-icons/md";
import { BookA } from "lucide-react";
import NavItem from "./NavItem";
import { AuthContext } from "../../../../context/AuthContext";
import ThemeToggle from "../../../../toggle/ThemeToggle";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";

const NavBar = () => {
    const { user, logout } = use(AuthContext);

    const logOut = () => {
        logout();
    };

    return (
        // Changed bg-base-200 to bg-base-100 for a cleaner look, 
        // added border-b for visibility in dark mode
        <div className="bg-base-100/80 backdrop-blur-md z-50 sticky top-0 border-b border-base-300">
            <div className="navbar min-h-0 py-3 max-w-7xl mx-auto px-4 md:px-0">

                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        {/* Mobile Menu: Use bg-base-100 and text-base-content for theme support */}
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-base-300">
                            <li><NavItem to="/"><GoHomeFill /> Home</NavItem></li>
                            <li><NavItem to="/all-contests"><MdOutlineDensitySmall /> All Contests</NavItem></li>
                            <li><NavItem to="/dashboard"><LuLayoutDashboard /> Dashboard</NavItem></li>
                            <li><NavItem to="/how-it-works"><VscWorkspaceUnknown /> Rules</NavItem></li>
                            <li><NavItem to="/about"><CgProfile /> About</NavItem></li>
                            <li><NavItem to="/contact"><LuContact /> Contact</NavItem></li>
                            <li><NavItem to="/privacyPolicy"><MdPrivacyTip /> Privacy Policy</NavItem></li>

                            {
                                user && (
                                    <li><NavItem to="/profile"><CgProfile /> Profile</NavItem></li>
                                )
                            }
                            {!user && (
                                <li className="mt-2 pt-2 border-t border-base-300 flex items-center justify-between px-4">
                                    <span className="text-xs uppercase opacity-50">Theme</span>
                                    <ThemeToggle />
                                </li>
                            )}
                        </ul>
                    </div>
                    <Link to="/" className="flex text-primary items-center gap-2 text-xl md:text-2xl font-black italic">
                        <BookA size={28} />
                        <span className="hidden md:block">ContestHub</span>
                    </Link>
                </div>

                {/* Navbar Center (Desktop) */}
                <div className="navbar-center hidden md:flex">
                    {/* Changed text color to base-content so it flips between black/white */}
                    <ul className="menu menu-horizontal px-1 gap-2 text-base font-medium text-base-content">
                        <li><NavItem to="/">Home</NavItem></li>
                        <li><NavItem to="/all-contests">All Contests</NavItem></li>
                        <li><NavItem to="/dashboard">Dashboard</NavItem></li>
                        <li><NavItem to="/how-it-works">Rules</NavItem></li>
                        <li><NavItem to="/about"><MdDetails /> About</NavItem></li>
                        <li><NavItem to="/contact"><LuContact /> Contact</NavItem></li>
                        <li><NavItem to="/privacyPolicy"><MdPrivacyTip /> Privacy Policy</NavItem></li>
                        {
                            user && (
                                <li>
                                    <NavItem to={'/profile'} className="btn btn-error btn-sm btn-outline w-full">Profile</NavItem>
                                </li>
                            )
                        }
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end z-50">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img alt="User Avatar" referrerPolicy="no-referrer" src={user.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu bg-base-100 text-base-content dropdown-content rounded-box z-50 mt-3 w-60 p-4 shadow-xl border border-base-300">
                                <div className="pb-3 mb-2 border-b border-base-300">
                                    <li className="font-bold text-primary truncate">{user.displayName}</li>
                                    <li className="text-xs opacity-60 truncate">{user.email}</li>
                                </div>
                                <div className="flex items-center justify-between px-2 py-2 hover:bg-base-200 rounded-lg">
                                    <span className="text-sm">Appearance</span>
                                    <ThemeToggle />
                                </div>
                                <li>
                                    <button onClick={logOut} className="btn btn-error btn-sm btn-outline mt-4 w-full">
                                        <IoLogOut /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-center">
                                <ThemeToggle />
                            </div>
                            <Link to="/login" className="btn btn-primary btn-outline btn-sm md:btn-md rounded-full px-6">
                                <IoLogIn /> Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;