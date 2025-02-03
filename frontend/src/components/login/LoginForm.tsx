import { t } from 'i18next';
import { useState } from 'react';
import { toast } from 'sonner';

import useAuth from '../../hooks/useAuth';

const getValue = (id: string): string => {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element.value : '';
};

const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const { login } = useAuth();
  const [shake, setShake] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = getValue('username');
    const password = getValue('password');

    login(username, password, '')
      .then(result => {
        if (!result) {
          setShake(true);
          setTimeout(() => setShake(false), 200);
          toast.error(t('err.invalidCredentials'));
        }
      })
      .catch(console.error);
  };
  return (
    <section
      className={`bg-gray-900 h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 ${shake ? 'animate-shake' : ''}`}
    >
      <div className="md:w-1/3 max-w-sm">
        <img alt="Logo" src="/logo.svg" />
      </div>
      <div className="md:w-1/3 max-w-sm text-white">
        <form onSubmit={handleSubmit}>{children}</form>
      </div>
    </section>
  );
};

export default LoginForm;
