import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import ErrorPage from "../Components/ErrorPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
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
// import ConfirmContest from "../pages/Dashboard/Admin/ConfirmContest";
import AllContest from "../pages/Contesst/AllContest";
import ContestDetails from "../pages/Contesst/ContestDetails";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Payment/PaymentCancelled";
import ContestsSearchPage from "../pages/Home/Banner/ContestsSearchPage";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";
import HowItWorks from "../Components/HowItWorks";
import Profile from "../Components/Profile";
import AllWinners from "../pages/Dashboard/Admin/AllWinners";
import About from "../pages/Extra/About";
import Contact from "../pages/Extra/Contact";
import PrivacyPolicy from "../pages/Extra/PrivacyPolicy";
import DashHomeLayout from "../pages/Dashboard/dashHomeLayout";
// import AllContest from "../pages/Contesst/AllContest";


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
        path: 'all-contests',
        element: <AllContest />
      },
      {
        path: 'contest/:id',
        element: <ContestDetails /> 
        // element: <PrivateRoute><ContestDetails></ContestDetails></PrivateRoute>
      },
      {
        path: "/contests/search",
        element: <ContestsSearchPage />
      },
      {
        path: "/how-it-works",
        element: <HowItWorks />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy />
      },
     



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
  {
    path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    // Component: <DashboardLayout></DashboardLayout>,
    
    children: [
      {
        index: true,
        Component: DashHomeLayout,
      },

      {
        path: 'home',
        Component: DashHomeLayout,
      },

      {
        path: 'payment/:contestId',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },
      {
        path: 'payment-success',
        element: <PrivateRoute><PaymentSuccess /></PrivateRoute>
      },
      {
        path: 'payment-canceled',
        element: <PrivateRoute><PaymentCancelled /></PrivateRoute>
      },

      // User dashboard functionality 
      {
        path: 'user',
        element: <PrivateRoute> <User></User> </PrivateRoute>,
        children: [
          // { path: 'payment-success', element: },
          { path: "my-contests", element: <MyContests /> },
          { path: "my-winnings", element: <MyWinningContests /> },
          { path: "profile", element: < MyProfile /> },
        ]
      },
      {
        path: 'creator',
        element: <CreatorRoute>  <PrivateRoute> <Creator /> </PrivateRoute> </CreatorRoute>,
        children: [
          { path: "add-contest", element: <AddContest /> },
          { path: "my-contests", element: <MyCreatedContests /> },
          { path: "submissions/:contestId", element: <Submissions /> },
          { path: "edit/:contestId", element: <EditContest /> },
        ]
      },
      {
        path: 'admin',
        element: <AdminRoute> <PrivateRoute> <Admin /> </PrivateRoute> </AdminRoute>,
        children: [
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-contests", element: <ManageContests /> },
          { path: "all-winners", element: <AllWinners /> },
          // { path: "confirm-contests", element: <ConfirmContest /> },
        ]
      },

    ]
  }
]);