import Bookings from "@/features/Bookings";
import Layout from "../container/Layout";
import Home from "../features/Home";
import Login from "../features/Login";
import Register from "../features/Register";
import type { RouteObject } from "react-router";
import Profile from "@/features/Profile";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];
