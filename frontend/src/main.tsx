import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './components/AuthProvider';
import { checktoken } from './hooks/useAuth';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import { Root, Audits, Vulnerabilities, Data, Settings, Login } from './routes';
import { ErrorPage } from './error-page.tsx';
import './i18n';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/audits",
        element:
          <Audits/>,
      },
      {
        path: "/vulnerabilities",
        element:
          <Vulnerabilities/>,
      },
      {
        path: "/data",
        element:
          <Data/>,
      },
      {
        path: "/settings",
        element:
          <Settings/>,
      },
    ],

  },
  {
    path:"/login",
    element: <Login/>
  }
]);

checktoken().then((result) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider isSignedIn={result}>
          <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
  )
}
);
