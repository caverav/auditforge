import { useState } from 'react';
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
  const [email, setEmail] = useState('');

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
        <SimpleInput
          id="email"
          label={t('email')}
          name="email"
          onChange={setEmail}
          placeholder={t('email')}
          requiredField
          type="text"
          value={email}
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
          <PrimaryButton color="blue" onClick={() => {}} type="submit">
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
