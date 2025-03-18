const fs = require('fs');
const path = require('path');

// Caminho para o arquivo package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// Função para ler o arquivo package.json
function readPackageJson() {
  try {
    // Lê o conteúdo do arquivo
    const data = fs.readFileSync(packageJsonPath, 'utf8');
    
    // Converte o conteúdo para um objeto JSON
    const packageJson = JSON.parse(data);
    
    // Exibe o conteúdo do package.json
    console.log('Conteúdo do package.json:', packageJson);
  } catch (error) {
    console.error('Erro ao ler o arquivo package.json:', error.message);
  }
}

// Executa a função
readPackageJson();