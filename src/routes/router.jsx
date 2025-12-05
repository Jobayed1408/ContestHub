import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import CoverageArea from "../pages/Map/CoverageArea";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import ErrorPage from "../Components/ErrorPage";


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
          Component: CoverageArea,
          loader: ()=>fetch('/data/warehouses.json').then(res => res.json() )
        }
      ]
    },
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
  ]);