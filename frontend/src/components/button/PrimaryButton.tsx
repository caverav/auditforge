import React from 'react';

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
<<<<<<< HEAD
  color?: "blue" | "red" | "gray";
}
=======
};
>>>>>>> main

const colorToClassName = {
  blue: "bg-blue-800 hover:bg-blue-700",
  red: "bg-rose-800 hover:bg-rose-700",
  gray: "bg-stone-400 hover:bg-stone-500",
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  color = "blue",
}) => {
  const colorClassName = colorToClassName[color];

  return (
    <button
      className={`${colorClassName} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
