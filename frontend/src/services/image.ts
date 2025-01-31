const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api/';

const getImage = async (imageId: string) => {
  const response = await fetch(`${API_BASE_URL}images/${imageId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok (getImage)');
  }
  return response.json();
};

const createImage = async (image: {
  value: string;
  name: string;
  auditId: string | null;
}) => {
  const response = await fetch(`${API_BASE_URL}images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(image),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok (createImage)');
  }
  return response.json();
};

const deleteImage = async (imageId: string) => {
  const response = await fetch(`${API_BASE_URL}images/${imageId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok (deleteImage)');
  }
  return response.json();
};

export default {
  getImage,
  createImage,
  deleteImage,
};
