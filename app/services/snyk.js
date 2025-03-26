const axios = require('axios');

const getDependencies = async (orgId) => {
  const apiKey = process.env.SNYK_API_KEY;
  const baseUrl = `https://api.snyk.io/v1/org/${orgId}/dependencies`;
  const filters = {
    "filters": {
      "languages": [
        "cpp",
        "dockerfile",
        "dotnet",
        "elixir",
        "golang",
        "helm",
        "java",
        "javascript",
        "kubernetes",
        "linux",
        "php",
        "python",
        "ruby",
        "scala",
        "swift",
        "terraform"
      ],
      "projects": [process.env.SNYK_PROJECTS],
      "dependencies": [],
      "licenses": [],
      "severity": [
        "critical",
        "high",
        "medium",
        "low"
      ],
      "depStatus": ""
    }
  };

  let allDependencies = [];
  let page = 0;
  const perPage = 150;

  console.log(baseUrl, filters)
  try {
    while (true) {
      const response = await axios.post(`${baseUrl}?page=${page}&perPage=${perPage}`, filters, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${apiKey}`
        }
      });

      const { results } = response.data;

      allDependencies = allDependencies.concat(results);

      if (results.length === 0) {
        break;
      }

      page++;
    }

    return generateMarkdownTable(allDependencies);
  } catch (error) {
    console.error('Erro ao buscar dependências:', error.response?.data || error.message);
    throw error;
  }

};

function generateMarkdownTable(data) {
  let table = `| Pacote | Versão Atual | Última Versão | Data da Última Versão | Depreciado |\n`;
  table += `|--------|--------------|---------------|------------------------|------------|\n`;

  data.forEach(item => {
    table += `| ${item.name} | ${item.version} | ${item.latestVersion} | ${new Date(item.latestVersionPublishedDate).toLocaleDateString()} | ${item.isDeprecated ? 'Sim' : 'Não'} |\n`;
  });

  return table;
}

module.exports = { getDependencies };