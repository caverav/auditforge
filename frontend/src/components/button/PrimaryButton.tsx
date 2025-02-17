import React from 'react';

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'blue' | 'red' | 'gray';
  type?: 'submit' | 'button';
};

const colorToClassName = {
  blue: 'bg-blue-800 hover:bg-blue-700',
  red: 'bg-rose-800 hover:bg-rose-700',
  gray: 'bg-stone-400 hover:bg-stone-500',
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  color = 'blue',
  type = 'button',
}) => {
  const colorClassName = colorToClassName[color];

  return (
    <button
      className={`${colorClassName} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
