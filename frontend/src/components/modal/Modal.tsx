import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
  cancelText: string;
  submitText: string;
  isOpen: boolean;
  disablehr?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onCancel,
  onSubmit,
  cancelText,
  submitText,
  isOpen,
  disablehr,
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-stone-900 bg-opacity-50">
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
          <div className="ml-3 mt-3 flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-center text-gray-200">
              {title}
            </h2>
            <button
              className="bg-transparent text-white p-2 rounded mx-3"
              onClick={onCancel}
              type="button"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {!disablehr ? (
            <hr className="h-1 mb-3 bg-gray-600 border-0 rounded" />
          ) : null}
          <div className="mb-4 text-gray-200 py-4">{children}</div>
          {!disablehr ? (
            <hr className="h-1 mb-3 bg-gray-600 border-0 rounded" />
          ) : null}
          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onCancel}
              type="button"
            >
              {cancelText}
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={onSubmit}
              type="button"
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
