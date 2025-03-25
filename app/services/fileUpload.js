const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const { extractMarkdownContent } = require('../utils/extractMarkdownContent');

const uploadTemporaryFileToKnowledgeSource = async (token, content, fileName, targetId, targetType, expiration) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/file-upload/form`,
      {
        file_name: fileName,
        target_id: targetId,
        target_type: targetType,
        expiration,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    await uploadFile(response.data, content)
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error.response?.data || error.message);
    throw error;
  }
};

const uploadFile = async (data, content) => {
  try {
    const form = new FormData();
    Object.entries(data.form).forEach(([key, value]) => {
      form.append(key, value);
    });

    // const file = await updateReadme()
    form.append('file', extractMarkdownContent(content));

    const response = await axios.post(data.url, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log('File uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error.response?.data || error.message);
  }
};

module.exports = { uploadTemporaryFileToKnowledgeSource };