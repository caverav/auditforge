import { t } from 'i18next';
import { useCallback } from 'react';
import { toast, Toaster } from 'sonner';

import useAuth from '../hooks/useAuth';

const getValue = (id: string): string => {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element.value : '';
};
export const Register = () => {
  const { register } = useAuth();
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const password = getValue('password');
      const confirmPassword = getValue('confirmPassword');
      if (password !== confirmPassword) {
        toast.error(t('err.confirmPasswordDifferents'));
        console.error('Passwords do not match');
        return;
      }
      register(
        getValue('username'),
        getValue('firstname'),
        getValue('lastname'),
        password,
      )
        .then(result => {
          if (!result) {
            toast.error(t('err.createUser'));
          }
        })
        .catch(console.error);
    },
    [register],
  );
  return (
    <section className="bg-gray-800 h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img alt="Logo" src="/logo.svg" />
      </div>
      <div className="md:w-1/3 max-w-sm text-black">
        <h1 className="text-center text-2xl font-bold text-white">
          {t('registerFirstUser')}
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="username"
            placeholder={t('username')}
            type="text"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="firstname"
            placeholder={t('firstname')}
            type="text"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="lastname"
            placeholder={t('lastname')}
            type="text"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="password"
            placeholder={t('password')}
            type="password"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="confirmPassword"
            placeholder={t('confirmPassword')}
            type="password"
          />

          <button
            className="mt-4 bg-black hover:bg-gray-100 hover:text-black px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            {t('btn.create')}
          </button>
        </form>
      </div>
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
    </section>
  );
};
