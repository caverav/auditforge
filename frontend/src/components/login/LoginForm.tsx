import { t } from 'i18next';
import { toast } from 'sonner';

import useAuth from '../../hooks/useAuth';

const getValue = (id: string): string => {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element.value : '';
};

const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const { login } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(getValue('email'), getValue('password'), '')
      .then(result => {
        if (!result) {
          toast.error(t('err.invalidCredentials'));
        }
      })
      .catch(console.error);
  };
  return (
    <section className="bg-gray-800 h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img alt="Logo" src="/logo.svg" />
      </div>
      <div className="md:w-1/3 max-w-sm text-black">
        <form onSubmit={handleSubmit}>{children}</form>
      </div>
    </section>
  );
};

export default LoginForm;
