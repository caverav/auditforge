import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import { Root, Audits, Vulnerabilities, Data } from './routes';
import { ErrorPage } from './error-page.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/audits",
        element: <Audits/>,
      },
      {
        path: "/vulnerabilities",
        element: <Vulnerabilities/>,
      },
      {
        path: "/data",
        element: <Data/>,
      },
      {
        path: "/settings",
        element: <Data/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
