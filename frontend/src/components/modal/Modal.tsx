import React from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
  cancelText: string;
  confirmText: string;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onCancel,
  onSubmit,
  cancelText,
  confirmText,
  isOpen,
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-200">
            {title}
          </h2>
          <hr className="h-1 mb-3 bg-gray-600 border-0 rounded" />
          <div className="mb-4 text-gray-200">{children}</div>
          <hr className="h-1 my-3 bg-gray-600 border-0 rounded" />
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
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
