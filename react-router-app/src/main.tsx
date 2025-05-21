import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root";
import "../i18n";
import { Screen } from "./components/Screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Screen>
        <Root />
      </Screen>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
