import React from 'react';
export const GeneralDivWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-gray-800 pt-16">
      <div className="bg-gray-800 flex justify-center items-center">
        <div className="w-full max-w-4xl bg-gray-900 shadow-lg rounded-lg p-8 mt-6">
          <div className="flex flex-col space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
