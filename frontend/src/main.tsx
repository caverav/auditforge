import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import { Root, Audits, Vulnerabilities, Data, Settings, Login } from './routes';
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
        element: <Settings/>,
      },
    ],

  },
  {
    path:"/login",
    element: <Login/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
