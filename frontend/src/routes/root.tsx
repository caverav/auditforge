import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import Navbar from '../components/navbar/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { ModelUpdateContainer } from './settings/ModelUpdateContainer';

export const Root = () => {
  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <Outlet />
        <ModelUpdateContainer />
      </ProtectedRoute>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400 text-white',
            success: 'bg-green-400 text-white',
            warning: 'bg-yellow-400 text-white',
            info: 'bg-blue-400 text-white',
          },
        }}
      />
    </>
  );
};
