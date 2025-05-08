import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.jsx";
import AuthProvider from "./authprovider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="max-w-7xl mx-auto">
          <RouterProvider router={routes}></RouterProvider>
        </div>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
