const extractMarkdownContent = (text) => {
  const regex = /```markdown([\s\S]*?)```/g;
  let result = '';
  let match;
  while ((match = regex.exec(text)) !== null) {
    result += match[1].trim() + '\n';
  }
  return result.trim();
};

module.exports = { extractMarkdownContent };