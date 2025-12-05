import { NavLink } from "react-router";

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 
         ${isActive ? "text-primary font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary" : "hover:text-primary"}`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
