import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/queryClient.ts";
import TasksPage from "./pages/TasksPage.tsx";
import TaskDetailPage from "./pages/TaskDetailPage.tsx";
import WorkersPage from "./pages/WorkersPage.tsx";
import ErrorPage from "./error-page.tsx"; // Assuming this exists or will be created
import "./lib/i18n.ts"; // Assuming i18n setup
import "./index.css";
import LocalTodosPage from "./pages/LocalTodosPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TasksPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/workers",
    element: <WorkersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/local-todos",
    element: <LocalTodosPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
