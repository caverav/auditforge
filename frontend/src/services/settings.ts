const API_URL = `${import.meta.env.VITE_API_URL}/api/`;
const checkUpdateUrl = `${import.meta.env.VITE_API_URL}/api/check-cwe-update`;
const updateCWEModelUrl = `${import.meta.env.VITE_API_URL}/api/update-cwe-model`;

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

/**
 * Retorna `true` si no hay actualización del modelo de CWE,
 * `false` de lo contrario.
 */
export const checkUpdateCWE = async (): Promise<boolean> => {
  try {
    const response = await fetch(checkUpdateUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();

    return data.checksum_match;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateCWEModel = async (): Promise<object> => {
  try {
    const response = await fetch(updateCWEModelUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return { status: 'error', error };
  }
};
