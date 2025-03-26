const { getAuthToken } = require('./services/auth');
const { createQuickCommandExecution, getExecutionStatus } = require('./services/quickCommands');
const { uploadTemporaryFileToKnowledgeSource } = require('./services/fileUpload');
const { getDependencies } = require('./services/snyk');
const { readPackageJson } = require('./utils/dependencies');

const main = async () => {

  const allDependencies = await getDependencies(process.env.SNYK_ORDER_ID);
  console.log(allDependencies)

  const token = await getAuthToken();
  console.log('Auth Token:', token);

  const fileUploadResponse = await uploadTemporaryFileToKnowledgeSource(
    token,
    allDependencies,
    process.env.KNOWLEDGE_SOURCE_NAME,
    process.env.KNOWLEDGE_SOURCE_ID,
    'KNOWLEDGE_SOURCE',
    600
  );

  console.log('File Upload Response:', fileUploadResponse);
};

main();
