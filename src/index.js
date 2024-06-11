import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
import Order from "./pages/Order/Order";
import LoginForm from "./pages/Auth/Login";
import RegisterForm from "./pages/Auth/Register";
import OtpForm from "./pages/Auth/OTP";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "",
    children: [
      {
        path: "/otp",
        element: <OtpForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/",
        element: <LoginForm />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
