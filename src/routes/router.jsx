import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import CoverageArea from "../pages/Map/CoverageArea";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import ErrorPage from "../Components/ErrorPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from '../pages/Dashboard/Dashboard'
import User from "../pages/Dashboard/User/USer";
import Creator from "../pages/Dashboard/Creator/Creator";
import Admin from "../pages/Dashboard/Admin/Admin";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyContests from "../pages/Dashboard/User/MyContests";
import MyWinningContests from "../pages/Dashboard/User/MyWinningContests";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import AddContest from "../pages/Dashboard/Creator/AddContest";
import MyCreatedContests from "../pages/Dashboard/Creator/MyCreatedContests";
import Submissions from "../pages/Dashboard/Creator/Submissions";
import EditContest from "../pages/Dashboard/Creator/EditContest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import ConfirmContest from "../pages/Dashboard/Admin/ConfirmContest";


export const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      Component: RootLayout,
      children: [
        {
            index: true,
            Component: Home, 
        },
        {
          path: 'coverage',
          element: <PrivateRoute><CoverageArea></CoverageArea></PrivateRoute>,
          loader: ()=>fetch('/data/warehouses.json').then(res => res.json() )
        }
      ]
    },

    // Authentication 
    {
      path: '/',
      Component: AuthLayout,
      children: [
        {
          path: 'register',
          Component: Register,
        },
        {
          path: 'login',
          Component: Login,
        },
      ]
    },

    // DashBoard

    // {
    //   path: "/dashboard",
    //   element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    //   children: [
    //     { path: "user/my-contests", element: <RoleRoute role="user"><MyContests /></RoleRoute> },
    //     { path: "user/my-winnings", element: <RoleRoute role="user"><MyWinningContests /></RoleRoute> },
    //     { path: "user/profile", element: <RoleRoute role="user"><MyProfile /></RoleRoute> },
        
    //     { path: "creator/add-contest", element: <RoleRoute role="creator"><AddContest /></RoleRoute> },
    //     { path: "creator/my-contests", element: <RoleRoute role="creator"><MyCreatedContests /></RoleRoute> },
    //     { path: "creator/submissions/:contestId", element: <RoleRoute role="creator"><Submissions /></RoleRoute> },
    //     { path: "creator/edit/:contestId", element: <RoleRoute role="creator"><EditContest /></RoleRoute> },
        
    //     { path: "admin/manage-users", element: <RoleRoute role="admin"><ManageUsers /></RoleRoute> },
    //     { path: "admin/manage-contests", element: <RoleRoute role="admin"><ManageContests /></RoleRoute> },
    //   ]
    // },
    
    {
      path: 'dashboard',
      element: <DashboardLayout></DashboardLayout> ,
      children: [
        {
          index: true,
          Component: DashboardHome,
        },

        // User dashboard functionality 
        {
          path: 'user',
          Component: User,
          children: [
            { path: "my-contests", element: <MyContests /> },
            { path: "my-winnings", element: <MyWinningContests /> },
            { path: "profile", element: < MyProfile/> },
          ]
        },
        {
          path: 'creator',
          Component: User,
          children: [
            { path: "add-contest", element: <AddContest /> },
            { path: "my-contests", element: <MyCreatedContests /> },
            { path: "submissions/:contestId", element: <Submissions /> },
            { path: "edit/:contestId", element: <EditContest /> }, 
          ]
        },
        {
          path: 'admin',
          Component: Admin,
          children: [
            { path: "manage-users", element: <ManageUsers /> },
            { path: "manage-contests", element: <ManageContests /> },
            { path: "confirm-contests", element: <ConfirmContest /> },
          ]
        },

      ]
    }
  ]);