import React from 'react'
import ReactDOM from 'react-dom/client'
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './components/AuthProvider';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import { Root, Audits, Vulnerabilities, Data, Settings, Login } from './routes';
import { ErrorPage } from './error-page.tsx';
import './i18n';


// get isSignedIn from localStorage (isAuthenticated)
const isSignedIn = localStorage.getItem('isAuthenticated') === 'true';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/audits",
        element: 
        <ProtectedRoute>
          <Audits/>
        </ProtectedRoute>,
      },
      {
        path: "/vulnerabilities",
        element:
        <ProtectedRoute>
          <Vulnerabilities/>
        </ProtectedRoute>,
      },
      {
        path: "/data",
        element:
        <ProtectedRoute>
          <Data/>
        </ProtectedRoute>,
      },
      {
        path: "/settings",
        element:
        <ProtectedRoute>
          <Settings/>
        </ProtectedRoute>,
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
      <AuthProvider isSignedIn={isSignedIn}>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)
