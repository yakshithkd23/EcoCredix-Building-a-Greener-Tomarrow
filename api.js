import axios from 'axios';

export const fetchEnvironmentalData = async (latitude, longitude) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const apiUrl = 'https://gemini-api-url/environment-data'; // Replace with actual API URL

  try {
    const response = await axios.post(apiUrl, { latitude, longitude }, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching environmental data:', error);
    return null;
  }
};
