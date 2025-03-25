const { getAuthToken } = require('./services/auth');
const { createQuickCommandExecution, getExecutionStatus } = require('./services/quickCommands');
const { uploadTemporaryFileToKnowledgeSource  } = require('./services/fileUpload');
const { readPackageJson } = require('./utils/dependencies');

const main = async () => {
  try {
    // Step 1: Get Auth Token
    const token = await getAuthToken();
    console.log('Auth Token:', token);

    const packageJson = await readPackageJson();

    const quickCommand = await createQuickCommandExecution(token, 'inventario-de-dependencias', packageJson)
    console.log(quickCommand)

    const quickCommandStatus = await getExecutionStatus(token, quickCommand)
    console.log(quickCommandStatus)

    const fileUploadResponse = await uploadTemporaryFileToKnowledgeSource(
      token,
      quickCommandStatus,
      'inventario-front.md',
      '5efa9c-inventario-do-front',
      'KNOWLEDGE_SOURCE',
      600
    );

    console.log('File Upload Response:', fileUploadResponse);

  } catch (error) {
    console.error('Error in main process:', error.message);
  }
};

main();
