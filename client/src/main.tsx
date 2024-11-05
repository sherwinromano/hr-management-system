import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "@/layout";
import AuthLayout from "@/layouts/Authentication";
import Login from "@/pages/authentication/Login";
import ForgotPassword from "@/pages/authentication/ForgotPassword";
import VerifyOTP from "@/pages/authentication/VerifyOTP";
import Register from "@/pages/authentication/Register";
import ChangePassword from "@/pages/authentication/ChangePassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
