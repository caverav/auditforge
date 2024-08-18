import React from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';


interface ModalProps {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
  cancelText: string;
  submitText: string;
  isOpen: boolean;
  hr?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onCancel,
  onSubmit,
  cancelText,
  submitText,
  isOpen,
  hr
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
          <div className="ml-3 mt-3 flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-center text-gray-200">
              {title}
            </h2>
            <button
              onClick={onCancel}
              className="bg-transparent text-white p-2 rounded mx-3"
            ><XMarkIcon className="h-6 w-6" />
          </button>
          </div>
          
          {hr && <hr className="h-1 mb-3 bg-gray-600 border-0 rounded" />}
          <div className="mb-4 text-gray-200 py-4">{children}</div>
          {hr && <hr className="h-1 mb-3 bg-gray-600 border-0 rounded" />}
          <div className="flex justify-end">
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              {cancelText}
            </button>
            <button
              onClick={onSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
