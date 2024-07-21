const API_URL = 'https://localhost:4242/api/';

export const getSettings = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}settings`, { credentials: "include" }); // Incluir token
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
