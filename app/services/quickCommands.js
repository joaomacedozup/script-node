const axios = require('axios');

const createQuickCommandExecution = async (token, quick_command, input_data) => {
  try {
    const response = await axios.post(
      `https://genai-code-buddy-api.stackspot.com/v1/quick-commands/create-execution/${quick_command}`,
      {
        input_data
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching quick command:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { createQuickCommandExecution };