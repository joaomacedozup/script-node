const { getAuthToken } = require('./services/auth');

const main = async () => {
  try {
    // Step 1: Get Auth Token
    const token = await getAuthToken();
    console.log('Auth Token:', token);

    // // Step 2: Upload a file
    // const fileUploadResponse = await uploadTemporaryFileToKnowledgeSource(
    //   token,
    //   'base_de_conhecimento.md',
    //   '89cc49-sni-sustentacao-e-monitoria',
    //   'KNOWLEDGE_SOURCE',
    //   600
    // );
    // console.log('File Upload Response:', fileUploadResponse);
  } catch (error) {
    console.error('Error in main process:', error.message);
  }
};

main();
