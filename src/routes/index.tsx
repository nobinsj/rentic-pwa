import Bookings from "@/features/Bookings";
import Layout from "../container/Layout";
import Home from "../features/Home";
import Login from "../features/Login";
import Register from "../features/Register";
import type { RouteObject } from "react-router";
import Profile from "@/features/Profile";
import LoginRoute from "./LoginRoute";
import ProtectedRoute from "./ProtectedRoute";
import { Suspense } from "react";
import VerifyEmail from "@/features/VerifyEmail";
import VerifyEmailRoute from "./VerifyEmailRoute";
import BookACar from "@/features/BookACar";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <LoginRoute>
        <Login />
      </LoginRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <LoginRoute>
        <Register />
      </LoginRoute>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <VerifyEmailRoute>
        <VerifyEmail />
      </VerifyEmailRoute>
    ),
  },
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading</div>}>
              <Home />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/bookings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading</div>}>
              <Bookings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading</div>}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking/:carId",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading</div>}>
              <BookACar />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
];
