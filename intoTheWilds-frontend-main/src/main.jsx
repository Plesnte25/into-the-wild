// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

// import { BrowserRouter, Routes, Route } from "react-router-dom"; // simple router wrapper

import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppProvider } from "./context/AppContext";
// import App from "./App.jsx";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AppProvider>
          
          {/* <BrowserRouter>
            <App />
          </BrowserRouter> */}

          <RouterProvider router={router} />

        </AppProvider>
      </GoogleOAuthProvider>

      {/* Dev-tools (remove in production) */}
      <ReactQueryDevtools initialIsOpen={false} />

      {/* Global toast portal */}
      <ToastContainer position="top-right" autoClose={3000} />
    </QueryClientProvider>
  </React.StrictMode>
);
