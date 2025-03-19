const fs = require('fs');
const path = require('path');

// Função para ler o arquivo package.json


const secretKey = process.env.MY_SECRET_KEY;

console.log(`Your secret key is: ${secretKey}: ${process.env}`);

function readPackageJson() {
  try {
    // Caminho para o arquivo package.json no diretório atual
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    // Lê o conteúdo do arquivo
    const data = fs.readFileSync(packageJsonPath, 'utf8');
    
    // Converte o conteúdo para um objeto JSON
    const packageJson = JSON.parse(data);
    
    // Exibe as dependências encontradas
    console.log('Dependências encontradas:', packageJson.dependencies);
  } catch (error) {
    console.error('Erro ao ler o arquivo package.json:', error.message);
  }
}

// Executa a função
readPackageJson();