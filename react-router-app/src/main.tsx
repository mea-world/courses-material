import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './lib/queryClient';
import TasksPage from './pages/TasksPage';
import TaskDetailPage from './pages/TaskDetailPage';
import WorkersPage from './pages/WorkersPage';
import ErrorPage from "./error-page.tsx"; // Assuming this exists or will be created
import "../i18n"; // Assuming i18n setup
import './index.css';

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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
