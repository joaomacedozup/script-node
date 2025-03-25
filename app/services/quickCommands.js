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

const getExecutionStatus = async (token, execution_id) => {
  const maxRetries = 5; // Número máximo de tentativas
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await axios.get(
        `https://genai-code-buddy-api.stackspot.com/v1/quick-commands/callback/${execution_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      
      const data = response.data;

      // Verifica o status da execução
      const status = data.progress.status;

      if (status === 'COMPLETED') {
        console.log('Execution completed successfully:', data);
        return data.result; // Retorna os dados se a execução foi concluída com sucesso
      } else if (status === 'FAILURE') {
        console.error('Execution failed:', data);
        throw new Error('Execution failed');
      }
      console.log(`Execution still running. Attempt ${attempt + 1}`);
    } catch (error) {
      attempt++;
      console.error(
        `Attempt ${attempt} failed:`,
        error.response?.data || error.message
      );

      if (attempt >= maxRetries) {
        console.error('Max retries reached. Throwing error.');
        throw error; // Lança o erro após atingir o número máximo de tentativas
      }

      // Aguarda um tempo antes de tentar novamente (opcional)
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Aguarda 1 segundo
    }
  }
};

module.exports = { createQuickCommandExecution, getExecutionStatus };