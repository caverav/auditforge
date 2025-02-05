import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import PrimaryButton from '@/components/button/PrimaryButton';
import SimpleInput from '@/components/input/SimpleInput';

import LoginForm from '../components/login/LoginForm';
import { checktoken } from '../hooks/useAuth';

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    checktoken()
      .then(result => {
        if (result) {
          navigate('/audits', { replace: true });
        }
      })
      .catch(console.error);
  }, [navigate]);

  return (
    <>
      <LoginForm>
        <SimpleInput
          id="username"
          label={t('username')}
          name="username"
          onChange={setUsername}
          placeholder={t('username')}
          requiredField
          type="text"
          value={username}
        />
        <SimpleInput
          id="password"
          label={t('password')}
          name="password"
          onChange={setPassword}
          placeholder={t('password')}
          requiredField
          type="password"
          value={password}
        />
        <div className="text-center md:text-left mt-4">
          <PrimaryButton color="blue" type="submit">
            {t('login')}
          </PrimaryButton>
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
