/* eslint-disable import/extensions */
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { PasswordStrengthCard } from '@/components/card/PasswordStrengthCard';
import { PasswordInput } from '@/components/input/PasswordInput';

type EncryptionModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  handleSubmitEncrypt: (password: string) => void;
  auditName: string;
};

export const EncryptionModal: React.FC<EncryptionModalProps> = ({
  auditName,
  isOpen,
  onCancel,
  handleSubmitEncrypt,
}) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const generatePassword = () => {
    const charset =
      // eslint-disable-next-line no-secrets/no-secrets
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const passwordLength = 35;
    let newPassword = '';

    const randomValues = new Uint32Array(passwordLength);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < passwordLength; i++) {
      if (randomValues[i] % 7 === 0) {
        newPassword += '!@#$%^&*()'.charAt(randomValues[i] % 10);
      } else if (randomValues[i] % 3 === 0) {
        newPassword += '0123456789'.charAt(randomValues[i] % 10);
      } else {
        newPassword += charset.charAt(randomValues[i] % charset.length);
      }
    }

    return newPassword;
  };

  const handlePasswordGen = () => {
    const generated = generatePassword();
    setPassword(generated);
    setConfirmPassword(generated);
    void navigator.clipboard.writeText(generated);
    toast.info(t('msg.copiedToClipboard'));
  };

  useEffect(() => {
    setPassword('');
    setConfirmPassword('');
  }, [onCancel]);

  return (
    isOpen && (
      <div className="fixed z-50 inset-0 flex items-center justify-center bg-stone-900 bg-opacity-50">
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
          <div className="ml-3 mt-3 flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-center text-gray-200">
              {`${t('encryption')} (${auditName})`}
            </h2>
            <button
              className="bg-transparent text-white p-2 rounded mx-3"
              onClick={onCancel}
              type="button"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <hr className="h-1 mb-3 bg-gray-600 border-0 rounded" />

          <div className="mb-2 text-gray-200 py-4">
            <div className="flex flex-col">
              <PasswordInput
                id="password"
                label={t('password')}
                name="password"
                onChange={setPassword}
                placeholder={t('password')}
                value={password}
              />
              <div className="py-2 pr-9">
                <PasswordStrengthCard password={password} />
              </div>
              <PasswordInput
                id="confirmPassword"
                label={t('confirmPassword')}
                name="confirmPassword"
                onChange={setConfirmPassword}
                placeholder={t('confirmPassword')}
                value={confirmPassword}
              />
            </div>
            <div
              className={
                password === confirmPassword || confirmPassword === ''
                  ? 'flex items-center justify-center text-red-500/75 pt-2 invisible'
                  : 'flex items-center justify-center text-red-500/75 pt-2'
              }
            >
              <p>{t('err.passwordsDontMatch')}</p>
            </div>
          </div>
          <hr className="h-1 mb-3 bg-gray-600 border-0 rounded" />

          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onCancel}
              type="button"
            >
              {t('btn.cancel')}
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={handlePasswordGen}
              type="button"
            >
              {t('btn.generatePassword')}
            </button>
            <button
              className={
                !(password === confirmPassword) ||
                password.length < 1 ||
                confirmPassword.length < 1
                  ? 'bg-blue-500/50 text-white/50 px-4 py-2 rounded'
                  : 'bg-blue-500 text-white px-4 py-2 rounded'
              }
              disabled={
                !(password === confirmPassword) ||
                password.length < 1 ||
                confirmPassword.length < 1
              }
              onClick={() => handleSubmitEncrypt(password)}
              type="button"
            >
              {t('btn.submitEncryption')}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
