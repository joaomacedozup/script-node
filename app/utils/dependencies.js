const fs = require('fs').promises;;
const path = require('path');

const readPackageJson = async () => {
  try {
    // Caminho para o arquivo package.json no diretório atual
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    // Lê o conteúdo do arquivo de forma assíncrona
    const data = await fs.readFile(packageJsonPath, 'utf8');
    
    // Converte o conteúdo para um objeto JSON
    const packageJson = JSON.parse(data);
    
    // Exibe as dependências encontradas
    console.log('Dependências encontradas:', packageJson.dependencies);
    return data;
  } catch (error) {
    // Lança o erro para ser tratado pelo chamador
    throw new Error(`Erro ao ler o arquivo package.json: ${error.message}`);
  }
};

module.exports = { readPackageJson };