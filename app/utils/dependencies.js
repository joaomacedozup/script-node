const fs = require('fs').promises;;
const path = require('path');

const readPackageJson = async () => {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    const data = await fs.readFile(packageJsonPath, 'utf8');
        
    return data;
  } catch (error) {
    console.error(`Erro ao ler o arquivo package.json: ${error.message}`);
    throw new Error(`Erro ao ler o arquivo package.json: ${error.message}`);
  }
};

module.exports = { readPackageJson };