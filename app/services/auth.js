const axios = require('axios');

const getAuthToken = async () => {
  try {
    console.log(`${process.env.AUTH_URL}/${process.env.REALM}/oidc/oauth/token`)
    const response = await axios.post(
      `${process.env.AUTH_URL}/${process.env.REALM}/oidc/oauth/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching auth token:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { getAuthToken };