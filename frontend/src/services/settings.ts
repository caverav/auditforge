const API_URL = `${import.meta.env.VITE_API_URL}/api/`;

export const getSettings = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}settings`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);

    throw error;
  }
};
