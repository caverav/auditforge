import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import LoginForm from '../components/login/LoginForm';
import { checktoken } from '../hooks/useAuth';

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  checktoken()
    .then(result => {
      if (result) {
        navigate('/audits', { replace: true });
      }
    })
    .catch(console.error);

  return (
    <>
      <LoginForm>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          id="email"
          placeholder={t('username')}
          type="text"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          id="password"
          placeholder={t('password')}
          type="password"
        />
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-black hover:bg-gray-100 hover:text-black px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            {t('login')}
          </button>
        </div>
      </LoginForm>
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
