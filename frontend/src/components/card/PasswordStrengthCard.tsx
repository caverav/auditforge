// eslint-disable-next-line import/no-extraneous-dependencies
import { passwordStrength } from 'check-password-strength';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type PasswordStrengthCardProps = {
  password: string;
};

export const PasswordStrengthCard: React.FC<PasswordStrengthCardProps> = ({
  password,
}) => {
  const { t } = useTranslation();
  const [strength, setStrength] = useState(passwordStrength(password));

  useEffect(() => {
    setStrength(passwordStrength(password));
  }, [password]);

  let cardText = {
    title: t('noPasswordTitle'),
    text: t('noPasswordText'),
  };

  if (password) {
    switch (strength.value) {
      case 'Strong':
        cardText = {
          title: t('strongPasswordTitle'),
          text: t('strongPasswordText'),
        };
        break;

      case 'Weak':
        cardText = {
          title: t('weakPasswordTitle'),
          text: t('weakPasswordText'),
        };
        break;

      case 'Too weak':
        cardText = {
          title: t('tooWeakPasswordTitle'),
          text: t('tooWeakPasswordText'),
        };
        break;

      default:
        cardText = {
          title: t('noPasswordTitle'),
          text: t('noPasswordText'),
        };
        break;
    }
  }

  return (
    <div
      className={clsx('p-4 relative rounded-lg', {
        'bg-red-400': strength.value === 'Too weak' && password !== '',
        'bg-yellow-400': strength.value === 'Weak',
        'bg-green-400': strength.value === 'Strong',
        'bg-stone-400': password === '',
      })}
    >
      <div
        className={clsx('absolute top-0 left-0 bottom-0 w-2 rounded-l-lg', {
          'bg-red-600': strength.value === 'Too weak' && password !== '',
          'bg-yellow-600': strength.value === 'Weak',
          'bg-green-600': strength.value === 'Strong',
          'bg-stone-600': password === '',
        })}
      />
      <h1
        className={clsx('font-bold underline', {
          'text-black': strength.value === 'Strong',
        })}
      >
        {cardText.title}
      </h1>
      <p
        className={clsx('text-bold ', {
          'text-black': strength.value === 'Strong',
        })}
      >
        {cardText.text}
      </p>
    </div>
  );
};