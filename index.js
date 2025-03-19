const fs = require('fs');
const path = require('path');

// Caminho para o arquivo package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// Função para ler o arquivo package.json e listar dependências
function listDependencies() {
  try {
    // Lê o conteúdo do arquivo
    const data = fs.readFileSync(packageJsonPath, 'utf8');
    
    // Converte o conteúdo para um objeto JSON
    const packageJson = JSON.parse(data);
    
    // Verifica e lista as dependências
    if (packageJson.dependencies) {
      console.log('Dependências:');
      for (const [name, version] of Object.entries(packageJson.dependencies)) {
        console.log(`- ${name}: ${version}`);
      }
    } else {
      console.log('Nenhuma dependência encontrada.');
    }

    // Verifica e lista as devDependencies
    if (packageJson.devDependencies) {
      console.log('\nDependências de Desenvolvimento:');
      for (const [name, version] of Object.entries(packageJson.devDependencies)) {
        console.log(`- ${name}: ${version}`);
      }
    } else {
      console.log('\nNenhuma dependência de desenvolvimento encontrada.');
    }
  } catch (error) {
    console.error('Erro ao ler o arquivo package.json:', error.message);
  }
}

// Executa a função
listDependencies();