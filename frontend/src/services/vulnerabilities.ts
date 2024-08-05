const API_URL = 'https://localhost:4242/api/';

export const getLanguages = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}data/languages`, { credentials: "include" }); // Incluir token
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

export const getCategories = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}data/vulnerability-categories`, { credentials: "include" }); // Incluir token
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

export const getTypes = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}data/vulnerability-types`, { credentials: "include" }); // Incluir token
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