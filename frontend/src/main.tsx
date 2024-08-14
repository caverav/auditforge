import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./components/AuthProvider";
import { checktoken } from "./hooks/useAuth";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import { Root, Audits, Vulnerabilities, Data, Settings, Login } from "./routes";
import { ErrorPage } from "./error-page.tsx";
import "./i18n";
import { General, Network, Add, Edit } from "./routes/audits";
import {
  Collaborators,
  Companies,
  Clients,
  Templates,
  CustomData,
  ImportExport,
} from "./routes/data";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/audits" />,
      },
      {
        path: "/audits",
        element: <Audits />,
        children: [
          {
            path: ":id/general",
            element: <General />,
          },
          {
            path: ":id/network",
            element: <Network />,
          },
          {
            path: ":id/findings/add",
            element: <Add />,
          },
          {
            path: ":auditId/findings/:findingId",
            element: <Edit />,
          },
        ],
      },
      {
        path: "/vulnerabilities",
        element: <Vulnerabilities />,
      },
      {
        path: "/data",
        element: <Data />,
        children: [
          {
            index: true,
            element: <Navigate to="/data/collaborators" />,
          },
          {
            path: "/data/collaborators",
            element: <Collaborators />,
          },
          {
            path: "/data/companies",
            element: <Companies />,
          },
          {
            path: "/data/clients",
            element: <Clients />,
          },
          {
            path: "/data/templates",
            element: <Templates />,
          },
          {
            path: "/data/customData",
            element: <CustomData />,
          },
          {
            path: "/data/importExport",
            element: <ImportExport />,
          },
        ],
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

checktoken().then((result) => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AuthProvider isSignedIn={result}>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
});
