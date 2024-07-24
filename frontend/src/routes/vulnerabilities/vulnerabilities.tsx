import React, { useState } from "react";
import Modal from "../../components/modal/Modal";

export const Vulnerabilities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmModal = () => {
    // Lógica de confirmación
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>

      <Modal
        title="Add Collaborator"
        onCancel={closeModal}
        onConfirm={confirmModal}
        cancelText="Cancel"
        confirmText="Create"
        isOpen={isModalOpen}
      >
        <form>
          <div className="mb-2">
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              placeholder="Username"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              placeholder="Firstname"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              placeholder="Lastname"
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              className="w-full border px-2 py-1 rounded"
              placeholder="Email"
            />
          </div>
          <div className="mb-2">
            <input
              type="tel"
              className="w-full border px-2 py-1 rounded"
              placeholder="Phone"
            />
          </div>
          <div className="mb-2">
            <label className="block">Role</label>
            <select className="w-full border px-2 py-1 rounded">
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="w-full border px-2 py-1 rounded"
              placeholder="Password"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

