import { t } from 'i18next';

import useAuth from '../hooks/useAuth';

const getValue = (id: string): string => {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element.value : '';
};
export const Register = () => {
  const { register } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(
      getValue('username'),
      getValue('firstname'),
      getValue('lastname'),
      getValue('password'),
    ).catch(console.error);
  };
  return (
    <section className="bg-gray-800 h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img alt="Logo" src="/auditforgelogo.png" />
      </div>
      <div className="md:w-1/3 max-w-sm text-black">
        <h1 className="text-center text-2xl font-bold">
          {t('registerFirstUser')}
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="username"
            placeholder="username"
            type="text"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="firstname"
            placeholder="First Name"
            type="text"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="lastname"
            placeholder="Last Name"
            type="text"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="password"
            placeholder="Password"
            type="password"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            id="password"
            placeholder="Confirm Password"
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
    </section>
  );
};
