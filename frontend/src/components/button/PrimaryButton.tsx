import React from 'react';

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-800 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
