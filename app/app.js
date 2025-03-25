const { getAuthToken } = require('./services/auth');
const { createQuickCommandExecution, getExecutionStatus } = require('./services/quickCommands');
const { readPackageJson } = require('./utils/dependencies');

const main = async () => {
  try {
    // Step 1: Get Auth Token
    const token = await getAuthToken();
    console.log('Auth Token:', token);

    const packageJson = await readPackageJson();
    // https://genai-code-buddy-api.stackspot.com/v1/quick-commands/create-execution/inventario-de-dependencias
    const quickCommand = await createQuickCommandExecution(token, 'inventario-de-dependencias', packageJson)
    console.log(quickCommand)
    const quickCommandStatus = await getExecutionStatus(token, quickCommand)
    // getExecutionStatus
    console.log(quickCommandStatus)
  } catch (error) {
    console.error('Error in main process:', error.message);
  }
};

main();
