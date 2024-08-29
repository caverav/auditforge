import React, { ReactElement } from 'react';

type CardProps = {
  title: string;
  children: ReactElement;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="border rounded-lg bg-gray-900">
      <div className="py-3 mx-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <hr className="h-1 mx-4 bg-gray-600 border-0 rounded" />
      <div className="py-4 mx-4">{children}</div>
    </div>
  );
};

export default Card;
