// API endpoint for the backend
const API_URL = 'http://127.0.0.1:8000';

/**
 * @param {Object} patientData - The patient data to send to the model
 * @returns {Promise<Object>} - The prediction result from the backend
 */
export const sendPatientDataToMLModel = async (patientData) => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get prediction');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 