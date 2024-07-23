
import React, { useState } from 'react';
import Modal from '../../components/modal/Modal';

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
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                Open Modal
            </button>

            {isModalOpen && (
                <Modal
                title="Add Collaborator"
                onCancel={closeModal}
                onConfirm={confirmModal}
                cancelText="Cancel"
                confirmText="Create"
                >
                <form>
                    <div className="mb-2">
                    <label className="block text-gray-700">Username</label>
                    <input type="text" className="w-full border px-2 py-1 rounded" />
                    </div>
                    <div className="mb-2">
                    <label className="block text-gray-700">Firstname</label>
                    <input type="text" className="w-full border px-2 py-1 rounded" />
                    </div>
                    <div className="mb-2">
                    <label className="block text-gray-700">Lastname</label>
                    <input type="text" className="w-full border px-2 py-1 rounded" />
                    </div>
                    <div className="mb-2">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="w-full border px-2 py-1 rounded" />
                    </div>
                    <div className="mb-2">
                    <label className="block text-gray-700">Phone</label>
                    <input type="tel" className="w-full border px-2 py-1 rounded" />
                    </div>
                    <div className="mb-2">
                    <label className="block text-gray-700">Role</label>
                    <select className="w-full border px-2 py-1 rounded">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                    </div>
                    <div className="mb-2">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" className="w-full border px-2 py-1 rounded" />
                    </div>
                </form>
                </Modal>
            )}
        </div>
    );
};